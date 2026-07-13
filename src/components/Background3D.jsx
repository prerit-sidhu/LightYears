import { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

// Custom high-quality static starfield
function CustomStars({ count = 10000 }) {
  const pointsRefDust = useRef();
  const pointsRefSmall = useRef();
  const pointsRefLarge = useRef();

  const { positionsDust, colorsDust, positionsSmall, colorsSmall, positionsLarge, colorsLarge } = useMemo(() => {
    const dustCount = 15000; // Optimized dense deep background
    const smallCount = Math.floor(count * 0.95); // 95% tiny stars
    const largeCount = count - smallCount; // 5% bright stars

    const posDust = new Float32Array(dustCount * 3);
    const colDust = new Float32Array(dustCount * 3);
    const posSmall = new Float32Array(smallCount * 3);
    const colSmall = new Float32Array(smallCount * 3);
    const posLarge = new Float32Array(largeCount * 3);
    const colLarge = new Float32Array(largeCount * 3);

    // Realistic star color palette based on temperature
    const palette = [
      new THREE.Color('#9db4ff'), // Hot Blue
      new THREE.Color('#ffffff'), // Pure White
      new THREE.Color('#ffe4ce'), // Warm Yellow
      new THREE.Color('#ffb56c')  // Orange/Red
    ];

    const generateStar = (posArray, colArray, index, rMin, rMax) => {
      const r = rMin + Math.random() * (rMax - rMin);
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[index * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[index * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[index * 3 + 2] = r * Math.cos(phi);

      // Distribute colors realistically
      const rand = Math.random();
      let color;
      if (rand < 0.70) color = palette[1]; // 70% White
      else if (rand < 0.85) color = palette[0]; // 15% Blue
      else if (rand < 0.95) color = palette[2]; // 10% Yellow
      else color = palette[3]; // 5% Orange

      colArray[index * 3] = color.r;
      colArray[index * 3 + 1] = color.g;
      colArray[index * 3 + 2] = color.b;
    };

    for (let i = 0; i < dustCount; i++) generateStar(posDust, colDust, i, 100, 300); // Deep background
    for (let i = 0; i < smallCount; i++) generateStar(posSmall, colSmall, i, 20, 100); // Mid-ground
    for (let i = 0; i < largeCount; i++) generateStar(posLarge, colLarge, i, 15, 80); // Foreground

    return {
      positionsDust: posDust,
      colorsDust: colDust,
      positionsSmall: posSmall,
      colorsSmall: colSmall,
      positionsLarge: posLarge,
      colorsLarge: colLarge
    };
  }, [count]);

  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Smoothly interpolate mouse position for buttery smooth parallax
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.03);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.03);

    const rotY = state.clock.elapsedTime * 0.005;
    const rotX = state.clock.elapsedTime * 0.002;
    
    if (pointsRefDust.current) {
      // Very slow shift for extremely distant deep space dust
      pointsRefDust.current.rotation.y = rotY * 0.5 + mouse.current.x * 0.01;
      pointsRefDust.current.rotation.x = rotX * 0.5 - mouse.current.y * 0.01;
      
      // Update shader uniforms
      if (pointsRefDust.current.material.userData.shader) {
        pointsRefDust.current.material.userData.shader.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
      }
    }
    
    if (pointsRefSmall.current) {
      // Subtle shift for distant stars
      pointsRefSmall.current.rotation.y = rotY + mouse.current.x * 0.05;
      pointsRefSmall.current.rotation.x = rotX - mouse.current.y * 0.05;
      
      // Update shader uniforms
      if (pointsRefSmall.current.material.userData.shader) {
        pointsRefSmall.current.material.userData.shader.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
      }
    }
    if (pointsRefLarge.current) {
      // Exaggerated shift for closer stars to create parallax depth
      pointsRefLarge.current.rotation.y = rotY + mouse.current.x * 0.15;
      pointsRefLarge.current.rotation.x = rotX - mouse.current.y * 0.15;
      
      // Update shader uniforms
      if (pointsRefLarge.current.material.userData.shader) {
        pointsRefLarge.current.material.userData.shader.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
      }
    }
  });

  const customShaderInject = (shader) => {
    shader.uniforms.uMouse = { value: new THREE.Vector2(0, 0) };
    
    shader.vertexShader = `
      uniform vec2 uMouse;
      varying float vGlow;
      ${shader.vertexShader}
    `;
    
    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `
      #include <begin_vertex>
      
      // Project to Screen Coordinates (NDC)
      vec4 ndcPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vec2 ndc = ndcPos.xy / ndcPos.w;
      
      // Calculate distance to mouse
      float dist = distance(ndc, uMouse);
      
      // Create a smooth glow falloff (0.3 NDC radius)
      vGlow = 1.0 - smoothstep(0.0, 0.3, dist);
      `
    );
    
    // Increase size based on glow (reduced from 3.0 to 1.0 for subtlety)
    shader.vertexShader = shader.vertexShader.replace(
      `gl_PointSize = size;`,
      `gl_PointSize = size * (1.0 + vGlow * 1.0);` // Grow up to 2x size instead of 4x
    );
    
    shader.fragmentShader = `
      varying float vGlow;
      ${shader.fragmentShader}
    `;
    
    // Increase opacity based on glow
    shader.fragmentShader = shader.fragmentShader.replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `vec4 diffuseColor = vec4( diffuse, min(1.0, opacity + vGlow) );`
    );
    
    // Save reference so useFrame can update uniforms
    shader.userData = shader; // Hack to make it accessible
  };

  return (
    <group>
      {/* Ultra-deep, dense microscopic stardust */}
      <points ref={pointsRefDust}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positionsDust.length / 3}
            array={positionsDust}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colorsDust.length / 3}
            array={colorsDust}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors={true}
          transparent
          opacity={0.4}
          sizeAttenuation={true}
          depthWrite={false}
          onBeforeCompile={(shader) => {
            customShaderInject(shader);
            if(pointsRefDust.current) {
               pointsRefDust.current.material.userData.shader = shader;
            }
          }}
        />
      </points>

      {/* Deep, tiny background stars */}
      <points ref={pointsRefSmall}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positionsSmall.length / 3}
            array={positionsSmall}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colorsSmall.length / 3}
            array={colorsSmall}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors={true}
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          onBeforeCompile={(shader) => {
            customShaderInject(shader);
            if(pointsRefSmall.current) {
               pointsRefSmall.current.material.userData.shader = shader;
            }
          }}
        />
      </points>

      {/* Bright, larger foreground stars */}
      <points ref={pointsRefLarge}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positionsLarge.length / 3}
            array={positionsLarge}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colorsLarge.length / 3}
            array={colorsLarge}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.20}
          vertexColors={true}
          transparent
          opacity={1.0}
          sizeAttenuation={true}
          depthWrite={false}
          onBeforeCompile={(shader) => {
            customShaderInject(shader);
            if(pointsRefLarge.current) {
               pointsRefLarge.current.material.userData.shader = shader;
            }
          }}
        />
      </points>
    </group>
  );
}

function Moon() {
  const moonRef = useRef();
  const { scrollYProgress } = useScroll();

  // Load standard Three.js moon texture
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg' // Using color as bump for subtle relief if normal isn't available
  ]);

  useFrame((state) => {
    const scroll = scrollYProgress.get(); // 0 to 1

    // 1. Slow intrinsic rotation
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scroll * Math.PI;
      moonRef.current.rotation.x = 0.2; // Slight tilt
    }

    // 2. Camera Orbit: Start looking at the bright side, orbit to the dark side
    state.camera.position.z = THREE.MathUtils.lerp(12, 6, scroll);
    state.camera.position.x = THREE.MathUtils.lerp(0, 8, scroll);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={moonRef} scale={3.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap} 
        bumpMap={bumpMap}
        bumpScale={0.02}
        roughness={0.8}
        metalness={0.1}
        color="#e0e0e0"
      />
    </mesh>
  );
}

// New Moon using local GLTF model
function GLTFMoon() {
  const moonRef = useRef();
  const { scrollYProgress } = useScroll();
  const { scene } = useGLTF('/Moon/scene.gltf');

  useFrame((state) => {
    const scroll = scrollYProgress.get(); // 0 to 1

    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scroll * Math.PI;
      moonRef.current.rotation.x = 0.2; 
    }

    state.camera.position.z = THREE.MathUtils.lerp(12, 6, scroll);
    state.camera.position.x = THREE.MathUtils.lerp(0, 8, scroll);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <primitive ref={moonRef} object={scene} scale={3.5} />
  );
}

function Scene() {
  return (
    <>
      {/* Stark, Cinematic Sun Light */}
      <directionalLight position={[-10, 5, 10]} intensity={2.5} color="#ffffff" castShadow />
      
      {/* Very subtle ambient light for the dark side */}
      <ambientLight intensity={0.02} color="#D4AF37" />

      {/* Pristine Starfield */}
      <CustomStars count={10000} />
      
      {/* Original Three.js Moon */}
      {/* <Moon /> */}
      
      {/* New GLTF Moon */}
      <GLTFMoon />
    </>
  );
}

useGLTF.preload('/Moon/scene.gltf');

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      
      {/* Sketchfab Embed Test */}
      {/*
      <iframe 
        title="moon" 
        frameBorder="0" 
        allowFullScreen 
        src="https://sketchfab.com/models/26cc0b7878bb4d919b68e2be399db466/embed?autostart=1&ui_theme=dark&dnt=1&ui_infos=0&ui_inspector=0&ui_watermark=0&ui_help=0&scrollwheel=0"
        className="w-full h-full absolute inset-0 border-none scale-[1.2]"
      />
      */}

      {/* Original ThreeJS Canvas - Restored to show the GLTF model */}
      <Canvas
        alpha={true}
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} 
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
