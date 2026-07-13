import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Link } from 'react-router-dom';

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.03,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -60, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { ease: [0.22, 1, 0.36, 1], duration: 1 },
  },
};

const SplitWords = ({ text, className }) => {
  return (
    <span className="inline-flex flex-wrap">
      {text.split(' ').map((word, wordIndex) => (
        <span key={word + wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
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

export default function WeatherGuarantee() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-150px" });

  const countValue = useMotionValue(0);
  const springCount = useSpring(countValue, { damping: 30, stiffness: 100 });
  const roundedCount = useTransform(springCount, Math.round);
  
  // Ref for the DOM node holding the text counter
  const counterRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      countValue.set(70);
    }
  }, [isInView, countValue]);

  useEffect(() => {
    return roundedCount.on("change", (latest) => {
      if (counterRef.current) {
        counterRef.current.textContent = latest;
      }
    });
  }, [roundedCount]);

  const radius = 120;
  const circumference = radius * Math.PI; // Half circle

  return (
    <section className="w-full bg-transparent relative border-t-2 border-[var(--color-pulsar)]/30 pb-32 pt-24 overflow-hidden">
      
      {/* Decorative Icon */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-void)] rounded-full p-4 border border-[var(--color-aurora)] z-10"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: "-50%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-pulsar)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-4.71c.24-.08.5-.12.79-.12a5.5 5.5 0 0 1 1 10.91v0Z" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 mt-8" ref={containerRef}>
        
        {/* Left: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h2 
            className="font-[var(--font-headline)] font-normal text-[clamp(40px,5vw,72px)] text-[var(--color-starlight)] leading-[1] mb-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sentenceVariants}
          >
            <SplitWords text="Clouds don't cancel the sky." />
          </motion.h2>
          
          <motion.p 
            className="font-[var(--font-ui)] text-[18px] text-[var(--color-dust)] leading-relaxed max-w-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Mountain weather is unpredictable. If severe weather or 100% cloud cover prevents viewing, you may reschedule your booking at no additional cost, or cancel up to 4 hours prior for a 70% refund.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link
              to="/terms"
              className="font-[var(--font-ui)] uppercase text-[11px] tracking-[0.12em] text-[var(--color-pulsar)] border-b border-[var(--color-pulsar)]/30 pb-1 hover:border-[var(--color-pulsar)] transition-colors duration-300"
            >
              Read the full policy &rarr;
            </Link>
          </motion.div>
        </div>

        {/* Right: Gauge */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="relative w-[300px] h-[150px] overflow-hidden flex justify-center">
            <svg width="300" height="150" viewBox="0 0 300 150" className="absolute bottom-0">
              {/* Background Track */}
              <path 
                d="M 30 150 A 120 120 0 0 1 270 150" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.1)" 
                strokeWidth="12" 
                strokeLinecap="square"
              />
              {/* Animated Fill */}
              <motion.path 
                d="M 30 150 A 120 120 0 0 1 270 150" 
                fill="none" 
                stroke="var(--color-gold)" 
                strokeWidth="12" 
                strokeLinecap="square"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 0.7 } : { pathLength: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 100 }}
              />
              {/* Tick marks */}
              <line x1="150" y1="30" x2="150" y2="45" stroke="var(--color-void)" strokeWidth="4" />
              <line x1="60" y1="65" x2="70" y2="75" stroke="var(--color-void)" strokeWidth="4" />
              <line x1="240" y1="65" x2="230" y2="75" stroke="var(--color-void)" strokeWidth="4" />
            </svg>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="font-[var(--font-headline)] font-normal text-6xl text-[var(--color-starlight)] leading-none flex items-baseline">
                <span ref={counterRef}>0</span>
                <span className="text-4xl text-[var(--color-gold)] ml-1">%</span>
              </span>
            </div>
          </div>
          
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          >
             <span className="font-[var(--font-kinetic)] text-[12px] uppercase tracking-[0.15em] text-[var(--color-dust)]">
               Coverage Threshold: 70%
             </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
