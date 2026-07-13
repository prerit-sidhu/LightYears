import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const catalogItems = [
  { id: 1, name: "Andromeda Galaxy", class: "Spiral Galaxy", distance: "2.5M ly", desc: "Our closest galactic neighbor, containing a trillion stars. It is on a collision course with the Milky Way.", img: "/Andromeda_2.jpg" },
  { id: 2, name: "Orion Nebula", class: "Diffuse Nebula", distance: "1,344 ly", desc: "A chaotic, glowing stellar nursery visible to the naked eye. Witness the violent birth of massive young stars.", img: "/Orion Nebula_2.jpg" },
  { id: 3, name: "Pleiades", class: "Open Cluster", distance: "444 ly", desc: "The Seven Sisters. A brilliant, jewel-like cluster of extremely hot, luminous blue stars forged from the same cosmic cloud.", img: "/Pleiades.jpg" },
  { id: 4, name: "Ring Nebula", class: "Planetary Nebula", distance: "2,574 ly", desc: "The glowing, expanding remains of a dying sun-like star. A haunting glimpse into the distant future of our own solar system.", img: "/Ring Nebula.avif" },
  { id: 5, name: "Helix Nebula", class: "Planetary Nebula", distance: "655 ly", desc: "Often referred to as the 'Eye of God'. A massive, expanding shell of glowing gas surrounding a dying white dwarf star.", img: "/Helix-Nebula.avif" },
  { id: 6, name: "Saturn", class: "Gas Giant", distance: "1.2B km", desc: "The jewel of the solar system. Observe its magnificent icy ring system and its largest moon, Titan, floating in the dark.", img: "/saturn.avif" },
  { id: 7, name: "Mars", class: "Terrestrial Planet", distance: "225M km", desc: "The Red Planet. Observe its striking rust-colored surface, polar ice caps, and dark volcanic plains across the void.", img: "/mars.jpg" },
  { id: 8, name: "Jupiter", class: "Gas Giant", distance: "740M km", desc: "The largest planet in our solar system. View its raging atmospheric bands, the Great Red Spot, and the four Galilean moons.", img: "/Jupiter.avif" },
];

export default function DarkSkyCatalog() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const viewportHeight = useTransform(scrollYProgress, [0, 0.15, 0.85, 1.0], ["25vh", "85vh", "85vh", "25vh"]);
  
  const titleTop = useTransform(scrollYProgress, [0, 0.15, 0.85, 1.0], ["50%", "10%", "10%", "50%"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1.0], [1, 0.6, 0.6, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1.0], [1, 0.8, 0.8, 1]);

  const galleryOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const galleryX = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-85%"]);

  return (
    <section ref={containerRef} className="w-full relative h-[400vh]">
      
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* The Expanding Viewport - Upgraded Styling */}
        <motion.div 
          style={{ height: viewportHeight }}
          className="w-[95%] max-w-7xl relative rounded-[2px] border-t border-b border-[var(--color-aurora)] bg-gradient-to-br from-[var(--color-void)]/95 via-[var(--color-void)]/80 to-[var(--color-void)]/95 backdrop-blur-2xl overflow-hidden flex flex-col shadow-[0_0_150px_rgba(4,6,15,1)] ring-1 ring-white/5 ring-inset"
        >
          
          {/* Scientific / Telemetry Accents */}
          <div className="absolute top-0 left-0 w-full flex justify-between px-6 py-3 border-b border-white/5 z-30">
            <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-dust)]">Optics Engaged</span>
            <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-dust)] animate-pulse">Tracking...</span>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full flex justify-between px-6 py-3 border-t border-white/5 z-30">
            <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-dust)]">RA: 05h 35m 17s</span>
            <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-dust)]">DEC: -05° 23' 28"</span>
          </div>

          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--color-gold)]/60 m-12 z-30 pointer-events-none hidden md:block" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--color-gold)]/60 m-12 z-30 pointer-events-none hidden md:block" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--color-gold)]/60 m-12 z-30 pointer-events-none hidden md:block" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--color-gold)]/60 m-12 z-30 pointer-events-none hidden md:block" />

          {/* The Initial Slit Title */}
          <motion.div 
            style={{ top: titleTop, scale: titleScale, opacity: titleOpacity }}
            className="absolute z-20 left-0 right-0 flex flex-col items-center -translate-y-1/2 pointer-events-none mt-4 md:mt-0"
          >
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold)] mb-3 flex items-center gap-4">
              <span className="w-6 h-[1px] bg-gradient-to-l from-[var(--color-gold)] to-transparent"></span>
              Observation Targets
              <span className="w-6 h-[1px] bg-gradient-to-r from-[var(--color-gold)] to-transparent"></span>
            </span>
            <h2 className="font-[var(--font-headline)] text-4xl sm:text-6xl text-[var(--color-starlight)] tracking-wide mb-4">
              The First Light Index
            </h2>
            <p className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-dust)] opacity-70">
              *Visuals are high-exposure reference images. Live optical viewing will vary.
            </p>
          </motion.div>

          {/* The Horizontal Gallery */}
          <motion.div 
            style={{ opacity: galleryOpacity, x: galleryX }}
            className="absolute inset-y-0 left-0 flex items-center px-12 pt-[140px] pb-12 gap-8 z-10 w-max"
          >
            {catalogItems.map((item, index) => (
              <div 
                key={item.id} 
                className="h-full aspect-[4/5] md:aspect-[3/4] relative rounded-[2px] overflow-hidden border border-[var(--color-border)] group bg-black"
              >
                {/* Image */}
                <img 
                  src={item.img} 
                  alt={item.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Vignette & Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />

                {/* Card Data HUD */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] bg-black/60 px-3 py-1 border border-[var(--color-gold)]/30 backdrop-blur-md">
                      TGT-{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-starlight)]/50">
                      {item.distance}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-gold)]">
                      {item.class.toUpperCase()}
                    </span>
                    <h3 className="font-[var(--font-headline)] text-3xl sm:text-4xl text-[var(--color-starlight)]">
                      {item.name}
                    </h3>
                    <p className="font-[var(--font-ui)] text-[13px] text-[var(--color-dust)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed mt-2 max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
