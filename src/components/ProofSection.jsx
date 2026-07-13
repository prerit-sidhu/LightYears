import { motion } from 'framer-motion';

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.03,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ease: [0.22, 1, 0.36, 1], duration: 1 },
  },
};

const SplitWords = ({ text, className }) => {
  return (
    <span className="inline-flex flex-wrap justify-center">
      {text.split(' ').map((word, wordIndex) => (
        <span key={word + wordIndex} className="inline-block overflow-hidden py-[0.2em] -my-[0.2em] pr-[0.15em] mr-[0.1em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={char + charIndex}
              className={`inline-block ${className}`}
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

export default function ProofSection() {
  return (
    <section id="optics" className="w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 overflow-hidden bg-transparent">
      
      {/* Immersive Typographic Overlay */}
      <motion.div 
        className="px-6 max-w-6xl mx-auto text-center relative z-10 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={sentenceVariants}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 inline-block px-8 py-3 luxury-border backdrop-blur-md bg-white/5"
        >
          <span className="font-[var(--font-ui)] text-[10px] uppercase tracking-[0.4em] text-[var(--color-starlight)]">
            A Turnkey Service
          </span>
        </motion.div>

        <h2 className="font-[var(--font-headline)] font-normal text-[clamp(32px,4vw,50px)] text-[var(--color-starlight)] mb-20 leading-[1.2]">
          <SplitWords text="We don't just drop off equipment." />
          <br/>
          <SplitWords text="We curate the entire night." className="text-[var(--color-gold)] italic" />
        </h2>
        
        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-16 border-t border-[var(--color-border)]/50 pt-16">
          
          {/* Pillar 1 */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]">01 / The Hardware</span>
            <h3 className="font-[var(--font-headline)] text-2xl text-[var(--color-starlight)]">Optical Precision.</h3>
            <p className="font-[var(--font-ui)] font-light text-[13px] text-[var(--color-dust)] leading-[1.8]">
              We supply massive 130mm+ parabolic mirrors that gather 345× more light than the human eye. No digital approximations—just genuine photons traveling millions of lightyears to hit your retina.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]">02 / The Guidance</span>
            <h3 className="font-[var(--font-headline)] text-2xl text-[var(--color-starlight)]">Professional Navigation.</h3>
            <p className="font-[var(--font-ui)] font-light text-[13px] text-[var(--color-dust)] leading-[1.8]">
              Our astronomers guide your guests through the cosmos. We handle alignment, star-hopping, and target tracking so your residents get an effortless, awe-inspiring tour of the deep sky.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]">03 / The Partnership</span>
            <h3 className="font-[var(--font-headline)] text-2xl text-[var(--color-starlight)]">Zero Overhead.</h3>
            <p className="font-[var(--font-ui)] font-light text-[13px] text-[var(--color-dust)] leading-[1.8]">
              You don't need to buy fragile equipment or train staff. We integrate seamlessly into your residency's offerings to provide an unforgettable amenity for your guests. You provide the dark sky; we provide the universe.
            </p>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
