import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function CTASection() {
  return (
    <section className="w-full min-h-screen py-32 flex flex-col justify-center items-center relative z-10 overflow-hidden bg-transparent">
      
      {/* Decorative Top Line */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 128, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-[1px] bg-gradient-to-b from-transparent to-[var(--color-gold)] mb-12" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-4xl text-center px-6 flex flex-col items-center"
      >
        <motion.h2 variants={itemVariants} className="font-[var(--font-headline)] text-4xl md:text-6xl text-[var(--color-starlight)] leading-tight mb-8">
          The Universe Is Waiting.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gold)] to-[#ffe4ce] italic">
            Claim Your Night.
          </span>
        </motion.h2>
        
        <motion.p variants={itemVariants} className="font-[var(--font-ui)] text-lg text-[var(--color-dust)] max-w-2xl mx-auto mb-16 leading-relaxed">
          Step away from the ordinary and immerse yourself in the cosmos. Our telescopes are primed, the sky is clear, and the infinite awaits. 
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              to="/reserve"
              className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden"
            >
              {/* Glass Background */}
              <div className="absolute inset-0 bg-[var(--color-void)]/40 backdrop-blur-md border border-[var(--color-gold)]/50 transition-all duration-500 group-hover:bg-[var(--color-gold)]/10 group-hover:border-[var(--color-gold)]" />
              
              {/* Glowing Aura on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[var(--color-gold)]/20 blur-xl transition-opacity duration-700 pointer-events-none" />

              <span className="relative z-10 font-[var(--font-ui)] uppercase tracking-[0.3em] text-sm text-[var(--color-starlight)] group-hover:text-[var(--color-gold)] transition-colors duration-500">
                Reserve Your Window
              </span>
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>

    </section>
  );
}
