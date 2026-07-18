import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Check if we are at the very top of the page
    if (latest <= 50) {
      setIsTop(true);
      setHidden(false);
    } else {
      setIsTop(false);
      // Hide the navbar when scrolling down, reveal when scrolling up
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 ease-out ${
        isTop ? 'bg-transparent' : 'bg-[var(--color-void)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Dynamic padding: taller at the top, shorter when floating */}
        <div className={`flex items-center justify-between transition-all duration-700 ease-out ${isTop ? 'py-8' : 'py-4'}`}>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-2 sm:gap-4">
              <img src="/Logo.png" alt="LightYears" className="h-6 sm:h-8 md:h-10 w-auto object-contain" />
              <span className="font-[var(--font-headline)] font-normal text-base sm:text-xl md:text-2xl tracking-[0.1em] sm:tracking-[0.2em] text-[var(--color-starlight)] mt-1">
                LIGHTYEARS<span className="text-[var(--color-gold)]">.</span>
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-12">
            {[
              { name: 'Optics', href: '/#optics' }, 
              { name: 'Telescopes', href: '/#how-it-works' }, 
              { name: 'Intel', href: '/#faqs' }
            ].map((item, i) => (
              <motion.a 
                key={item.name}
                href={item.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.9 + (i * 0.1), ease: "easeOut" }}
                className="relative font-[var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-500 group"
              >
                {item.name}
                {/* Expand-from-center animated underline */}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[var(--color-gold)] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
            className="flex items-center"
          >
            <Link to="/reserve" className="luxury-border px-4 sm:px-8 py-2 sm:py-3 rounded-none font-[var(--font-ui)] uppercase tracking-[0.2em] text-[9px] sm:text-[10px] text-[var(--color-starlight)] hover:bg-[var(--color-starlight)] hover:text-[var(--color-void)] transition-all duration-500 relative overflow-hidden group">
              <span className="relative z-10">Reserve</span>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </motion.nav>
  );
}
