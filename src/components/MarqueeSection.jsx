import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activeId, setActiveId] = useState(1);

  return (
    <section id="catalog" className="w-full py-24 flex flex-col items-center justify-center bg-transparent relative z-10">
      
      {/* Title Section */}
      <div className="w-full max-w-7xl px-6 mb-12 flex flex-col items-center text-center">
        <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold)] mb-3 flex items-center gap-4">
          <span className="w-6 h-[1px] bg-gradient-to-l from-[var(--color-gold)] to-transparent"></span>
          Observation Targets
          <span className="w-6 h-[1px] bg-gradient-to-r from-[var(--color-gold)] to-transparent"></span>
        </span>
        <h2 className="font-[var(--font-headline)] text-4xl sm:text-6xl text-[var(--color-starlight)] tracking-wide mb-4">
          The First Light Index
        </h2>
        <p className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-dust)] opacity-70">
          Hover to expand optical telemetry
        </p>
      </div>

      {/* Accordion Container */}
      <div className="w-[95%] max-w-7xl h-[80vh] md:h-[65vh] flex flex-col md:flex-row gap-2 overflow-hidden px-2 md:px-0">
        {catalogItems.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <motion.div
              key={item.id}
              layout
              onHoverStart={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={`relative h-full rounded-[2px] overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive ? 'flex-[10] md:flex-[8] opacity-100' : 'flex-[1] opacity-60 hover:opacity-80'
              }`}
            >
              {/* Background Image */}
              <img 
                src={item.img} 
                alt={item.name}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ease-out ${
                  isActive ? 'scale-105 grayscale-0' : 'scale-100 grayscale-[80%]'
                }`}
              />
              
              {/* Overlay Gradient for readability */}
              <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${
                isActive ? 'from-black/90 via-black/40 to-black/10' : 'from-black/80 via-black/60 to-black/40'
              }`} />

              {/* Inactive State: Vertical Text on Desktop, Horizontal on Mobile */}
              <div className={`absolute inset-0 flex flex-row md:flex-col justify-start md:justify-end items-center pl-6 md:pl-0 md:pb-8 transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="hidden md:block w-[1px] h-12 bg-[var(--color-gold)]/40 mb-6"></div>
                <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-gold)] opacity-70 md:-rotate-90 whitespace-nowrap transform md:origin-bottom tracking-[0.2em]">
                  TGT-{String(item.id).padStart(2, '0')}
                </span>
                <div className="md:hidden w-12 h-[1px] bg-[var(--color-gold)]/40 ml-4"></div>
              </div>

              {/* Active State: Full Telemetry HUD */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between"
                  >
                    {/* Top Stats */}
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col gap-2">
                        <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] bg-black/80 px-3 py-1 border border-[var(--color-gold)]/30 w-max">
                          TGT-{String(item.id).padStart(2, '0')}
                        </span>
                        <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--color-starlight)]/50">
                          DIST: {item.distance}
                        </span>
                      </div>
                    </div>
                    
                    {/* Bottom Info */}
                    <div className="flex flex-col gap-2 md:gap-4 max-w-xl">
                      <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-gold)]/80">
                        CLASS: {item.class.toUpperCase()}
                      </span>
                      <h3 className="font-[var(--font-headline)] text-4xl md:text-6xl text-[var(--color-starlight)] leading-none">
                        {item.name}
                      </h3>
                      <p className="font-[var(--font-ui)] text-sm md:text-base text-[var(--color-dust)] opacity-80 leading-relaxed mt-2 line-clamp-3 md:line-clamp-none">
                        {item.desc}
                      </p>
                      
                      <div className="mt-4 flex gap-4 border-t border-white/10 pt-4">
                         <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-widest text-[var(--color-dust)] opacity-60">
                           * Reference image only. Not captured by First Light optics.
                         </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
