import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MoveDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { ease: [0.22, 1, 0.36, 1], duration: 1.2 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { ease: "easeOut", duration: 1, delay: 1.5 }
  }
};

const SplitWords = ({ text, className }) => {
  return (
    <span className="inline-flex flex-wrap justify-center">
      {text.split(' ').map((word, wordIndex) => (
        <span key={word + wordIndex} className="inline-block overflow-hidden mr-[0.25em] mb-[-0.1em] pb-[0.1em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={char + charIndex}
              className={`inline-block ${className} origin-bottom`}
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

// Circular Text Component
const CircularText = ({ text }) => {
  const characters = text.split('');
  const degree = 360 / characters.length;

  return (
    <motion.div 
      className="relative w-40 h-40 flex items-center justify-center font-[var(--font-kinetic)] text-[10px] tracking-widest text-[var(--color-starlight)]/50 uppercase"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
    >
      {characters.map((char, i) => (
        <span
          key={`char-${i}`}
          className="absolute origin-[0_80px]"
          style={{ transform: `rotate(${i * degree}deg) translateY(-80px)` }}
        >
          {char}
        </span>
      ))}
      {/* Center dot/star */}
      <span className="absolute text-[var(--color-pulsar)]">✦</span>
    </motion.div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-transparent pointer-events-none">
      





      {/* Main Content Stack */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 mt-16 max-w-6xl mx-auto pointer-events-auto"
        initial="hidden"
        animate="visible"
        variants={sentenceVariants}
      >
        <motion.div 
          variants={fadeUpVariants}
          className="flex flex-col items-center mb-12"
        >
          <span className="font-[var(--font-ui)] text-[10px] text-[var(--color-starlight)]/80 uppercase tracking-[0.4em] mb-2">
            CURATED ASTRONOMY EXPERIENCES
          </span>
        </motion.div>

        <motion.h1 
          className="font-[var(--font-headline)] font-normal text-[clamp(40px,7vw,100px)] leading-[1] tracking-[-0.01em] mb-8 flex flex-col items-center"
          variants={sentenceVariants}
        >
          <SplitWords text="Awe is not" className="text-[var(--color-starlight)]" />
          <span className="mt-2">
            <SplitWords text="digital." className="text-[var(--color-gold)] italic" />
          </span>
        </motion.h1>

        <motion.p 
          variants={fadeUpVariants}
          className="font-[var(--font-ui)] font-light text-[15px] text-[var(--color-starlight)]/90 max-w-[500px] leading-[2] mb-16 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          We bring the cosmos to luxury mountain residencies. Professional astronomers, high-powered Dobsonian telescopes, and guided deep-sky experiences delivered directly to your location.
        </motion.p>

        <motion.div 
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center gap-10"
        >
          <Link to="/reserve" className="luxury-glass luxury-glass-hover group font-[var(--font-ui)] uppercase text-[11px] tracking-[0.3em] text-[var(--color-starlight)] px-[40px] py-[20px] rounded-none transition-all duration-500 flex items-center gap-4 border border-[var(--color-border)] hover:border-[var(--color-gold)]">
            Partner With Us <ArrowRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity text-[var(--color-gold)]" />
          </Link>
          
          <Link
            to="/reserve"
            className="font-[var(--font-ui)] uppercase text-[10px] tracking-[0.3em] text-[var(--color-starlight)]/80 hover:text-[var(--color-gold)] transition-colors duration-500 pb-1 border-b border-transparent hover:border-[var(--color-gold)]"
          >
            Book Private Session
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <MoveDown className="text-[var(--color-dust)]" size={24} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Optical HUD Overlay - Technical Data */}
      <div className="absolute bottom-12 left-12 hidden lg:flex flex-col space-y-2 pointer-events-none opacity-40">
        <span className="font-[var(--font-ui)] text-[9px] text-[var(--color-starlight)] uppercase tracking-widest">FOV: 1.2° WIDE</span>
        <span className="font-[var(--font-ui)] text-[9px] text-[var(--color-starlight)] uppercase tracking-widest">FL: 1200MM</span>
        <span className="font-[var(--font-ui)] text-[9px] text-[var(--color-starlight)] uppercase tracking-widest">APERTURE: 200MM (8")</span>
      </div>
      
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end space-y-2 pointer-events-none opacity-40">
        <span className="font-[var(--font-ui)] text-[9px] text-[var(--color-starlight)] uppercase tracking-widest">SYS: ONLINE</span>
        <span className="font-[var(--font-ui)] text-[9px] text-[var(--color-starlight)] uppercase tracking-widest">SEEING: 4/5 (GOOD)</span>
      </div>

    </section>
  );
}
