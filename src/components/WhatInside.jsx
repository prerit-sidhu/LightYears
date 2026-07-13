import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const MANIFEST_ITEMS = [
  {
    title: 'PRE-COLLIMATED TABLETOP DOBSONIAN',
    spec: 'APERTURE: 130MM · F/5 · WEIGHT: 5.8KG',
    description: 'A masterpiece of optical engineering, perfectly tuned before it reaches you. Designed to gather maximum light for breathtaking views of lunar craters, Saturn\'s rings, and deep-space nebulas without any complex setup.'
  },
  {
    title: '3-AXIS SMARTPHONE MOUNT',
    spec: 'PRECISION METAL LOCKING MECHANISM',
    description: 'Turn your smartphone into an astrophotography rig. Align your lens with the telescope\'s eyepiece in seconds to capture and share high-resolution images of the cosmos directly to your camera roll.'
  },
  {
    title: 'RED-LIGHT HEADLAMP + DEW HOOD',
    spec: 'NIGHT-VISION PRESERVATION',
    description: 'Navigate your equipment in total darkness without destroying your night vision. The included dew hood ensures the optics remain crystal clear and free of condensation, no matter the mountain humidity.'
  },
  {
    title: 'LAMINATED 3-STEP FIELD MANUAL',
    spec: 'FOOLPROOF VISUAL GUIDE',
    description: 'Forget dense astronomy textbooks. Our custom-designed, weatherproof field manual boils down the entire observation process into three simple, visually stunning steps. You will be star-hopping within five minutes.'
  }
];

// Desktop Rotary Dial Component
const DesktopDial = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dial rotation: Snaps to perfect angles during the text plateaus (+/- 0.08)
  const rawDialRotation = useTransform(
    scrollYProgress, 
    [0, 0.08, 0.2533, 0.4133, 0.5866, 0.7466, 0.92, 1], 
    [45, 45, 15, 15, -15, -15, -45, -45]
  );

  // Apply spring physics to the rotation to smooth out the hard corners of the snap
  const dialRotation = useSpring(rawDialRotation, {
    stiffness: 80,
    damping: 25,
    mass: 1
  });
  
  return (
    <div className="hidden md:block h-[350vh] relative w-full border-t border-[var(--color-aurora)]/30 mt-16" ref={containerRef}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Left Side Content - Crossfading */}
        <div className="w-1/2 pl-16 xl:pl-32 pr-8 relative h-[400px] flex items-center z-10">
          {MANIFEST_ITEMS.map((item, index) => {
            const center = index * (1 / 3);
            
            // Dwell time configuration
            const plateau = 0.08; // Stay 100% visible for +/- 8% of the scroll track
            const fade = 0.12;    // Take 12% of the scroll track to fade in/out
            
            const opacity = useTransform(scrollYProgress, (p) => {
              const dist = Math.abs(p - center);
              if (dist <= plateau) return 1;
              if (dist <= plateau + fade) return 1 - ((dist - plateau) / fade);
              return 0;
            });
            
            const y = useTransform(scrollYProgress, (p) => {
              const diff = p - center;
              if (Math.abs(diff) <= plateau) return 0; // Lock perfectly in place during plateau
              
              if (diff < -plateau) {
                // Coming from below
                const ratio = Math.min(1, (Math.abs(diff) - plateau) / fade);
                return ratio * 40;
              } else {
                // Exiting upwards
                const ratio = Math.min(1, (diff - plateau) / fade);
                return -(ratio * 40);
              }
            });
            
            const scale = useTransform(scrollYProgress, (p) => {
              const dist = Math.abs(p - center);
              if (dist <= plateau) return 1;
              if (dist <= plateau + fade) {
                const ratio = (dist - plateau) / fade;
                return 1 - (ratio * 0.05); // Scale down gracefully to 0.95
              }
              return 0.95;
            });
            
            return (
              <motion.div 
                key={index}
                className="absolute left-16 xl:left-32 right-8 flex flex-col justify-center"
                style={{ opacity, y, scale }}
              >
                <span className="font-[var(--font-mono)] text-[12px] text-[var(--color-gold)] mb-4 tracking-[0.3em] uppercase">
                  System {index + 1}
                </span>
                <h4 className="font-[var(--font-headline)] font-normal text-[36px] lg:text-[44px] text-[var(--color-starlight)] mb-4 leading-[1.1] tracking-wide">
                  {item.title}
                </h4>
                <p className="font-[var(--font-mono)] text-[11px] text-[var(--color-gold)] tracking-[0.2em] mb-6 uppercase">
                  {item.spec}
                </p>
                <p className="font-[var(--font-ui)] text-[15px] font-light text-[var(--color-dust)] tracking-wide max-w-md leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side - Massive Hollow Circle Dial */}
        <div className="absolute right-[-40vw] xl:right-[-30vw] top-1/2 -translate-y-1/2 w-[90vw] h-[90vw] xl:w-[70vw] xl:h-[70vw]">
          <motion.div 
            className="w-full h-full rounded-full relative"
            style={{ 
              rotate: dialRotation,
            }}
          >
            {/* The circumference rings have been completely removed to create a floating HUD effect. */}
            
            {/* Extremely subtle tick marks so the rotation is actually visible, without any numbers or clutter */}
            {MANIFEST_ITEMS.map((_, index) => {
              const itemAngle = -45 + (index * 30);
              
              // Calculate distance to the target progress to avoid WAAPI [0,1] offset errors
              const targetProgress = index / (MANIFEST_ITEMS.length - 1);
              const distance = useTransform(scrollYProgress, p => Math.abs(p - targetProgress));
              
              // Glow intensity stays perfectly peaked during the 0.08 plateau, then dims
              const glowIntensity = useTransform(distance, [0, 0.08, 0.15], [1, 1, 0.2]);
              const glowBlur = useTransform(distance, [0, 0.08, 0.15], ["20px", "20px", "0px"]);

              return (
                <div 
                  key={index}
                  className="absolute inset-0 flex items-center justify-start pointer-events-none"
                  style={{ transform: `rotate(${itemAngle}deg)` }}
                >
                  {/* Glowing LED indicator line */}
                  <motion.div 
                    className="w-[60px] xl:w-[90px] h-[6px] xl:h-[8px] rounded-full"
                    style={{
                      backgroundColor: 'var(--color-gold)',
                      opacity: glowIntensity,
                      boxShadow: useTransform(glowBlur, blur => `0 0 ${blur} var(--color-gold)`)
                    }}
                  />
                </div>
              );
            })}



          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default function WhatInside() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [carouselConstraints, setCarouselConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (carouselRef.current) {
      // Calculate how far we can drag the carousel
      const totalWidth = carouselRef.current.scrollWidth;
      const viewportWidth = carouselRef.current.offsetWidth;
      setCarouselConstraints({ left: -(totalWidth - viewportWidth), right: 0 });
    }
  }, []);

  return (
    <section id="how-it-works" className="w-full pt-32 pb-24 border-t border-[var(--color-aurora)]" ref={containerRef}>
      <motion.div 
        className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-[var(--font-ui)] text-[10px] uppercase tracking-[0.4em] text-[var(--color-dust)] mb-4">
          The Manifest
        </h2>
        <h3 className="font-[var(--font-headline)] font-normal text-5xl text-[var(--color-starlight)]">
          Everything you need. Nothing you don't.
        </h3>
      </motion.div>

      {/* Desktop: Rotary Dial */}
      <DesktopDial />

      {/* Mobile: Framer Motion Drag Carousel */}
      <div className="md:hidden w-full overflow-hidden pb-8 pt-4" ref={carouselRef}>
        <motion.div 
          className="flex space-x-6 px-6 cursor-grab active:cursor-grabbing w-max"
          drag="x"
          dragConstraints={carouselConstraints}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
          {MANIFEST_ITEMS.map((item, index) => {
            const numStr = `0${index + 1}`;
            return (
              <motion.div 
                key={index} 
                className="w-[80vw] h-[60vw] luxury-glass relative flex flex-col justify-end p-8 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <span className="absolute bottom-4 right-4 font-[var(--font-headline)] font-normal text-[140px] text-[var(--color-starlight)] pointer-events-none select-none opacity-[0.15] leading-none">
                  {numStr}
                </span>
                <div className="relative z-10">
                  <h4 className="font-[var(--font-ui)] font-bold text-[16px] uppercase tracking-[0.1em] text-[var(--color-starlight)] mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-[var(--font-mono)] text-[9px] text-[var(--color-gold)] mb-3 uppercase tracking-wider">
                    {item.spec}
                  </p>
                  <p className="font-[var(--font-ui)] text-[11px] font-light text-[var(--color-dust)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
