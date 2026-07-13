import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'Is astronomy knowledge required?',
    answer: 'Zero prior experience needed. Our custom-designed, foolproof field manuals guide you straight to the cosmos within minutes, completely eliminating the learning curve.'
  },
  {
    question: 'How does the partnership work?',
    answer: 'Seamlessly. You offer the stars to your guests as a premium amenity, and we handle all logistics, maintenance, and precision optics behind the scenes.'
  },
  {
    question: 'Who handles maintenance and collimation?',
    answer: 'We do. Our technicians meticulously clean, align, and calibrate every single instrument after every use to guarantee flawless, high-contrast views.'
  },
  {
    question: 'What happens on cloudy nights?',
    answer: 'The sky answers to no one. If heavy clouds or rain roll in, reservations are effortlessly rescheduled or fully refunded. Zero risk for you or your guests.'
  },
  {
    question: 'Is the equipment easily portable?',
    answer: 'Yes. Engineered for absolute mobility. The entire optical assembly is securely packed into a ruggedized, custom-fitted carrying system under 6kg.'
  },
  {
    question: 'How long does a typical session last?',
    answer: 'Most observers spend 2-3 hours discovering deep-space targets, but you secure the instrument for the entire night. The universe doesn\'t rush, and neither should you.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="w-full py-32 px-6 relative border-t border-[var(--color-aurora)]/30">
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Cinematic Header */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-[var(--font-ui)] text-[10px] uppercase tracking-[0.4em] text-[var(--color-dust)] mb-4">
            Intelligence
          </h2>
          <h3 className="font-[var(--font-headline)] font-normal text-4xl md:text-5xl text-[var(--color-starlight)] tracking-wide mb-6">
            Everything You Need To Know.
          </h3>
          <p className="font-[var(--font-ui)] text-[15px] font-light text-[var(--color-dust)] max-w-lg mx-auto">
            Clear, concise answers about our optical equipment, logistical operations, and zero-overhead partnerships.
          </p>
        </motion.div>

        {/* High-End Glassmorphic Accordion Boxes */}
        <div className="flex flex-col space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
               <motion.div 
                key={index} 
                className={`luxury-glass border rounded-[2px] overflow-hidden transition-all duration-500 ${isOpen ? 'bg-[var(--color-void)]/60 border-[var(--color-gold)]/50 shadow-[0_0_30px_rgba(212,175,55,0.05)]' : 'bg-[var(--color-void)]/20 border-[var(--color-aurora)]/30 hover:bg-[var(--color-void)]/40 hover:border-[var(--color-aurora)]/80'}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button 
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between px-6 md:px-10 py-6 md:py-8 text-left group"
                >
                  <span className={`font-[var(--font-ui)] text-[15px] md:text-[17px] uppercase tracking-[0.1em] transition-colors duration-300 pr-8 ${isOpen ? 'text-[var(--color-gold)]' : 'text-[var(--color-starlight)] group-hover:text-[var(--color-starlight)]'}`}>
                    {faq.question}
                  </span>
                  
                  {/* Custom Minimalist Plus/Minus Icon */}
                  <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${isOpen ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10' : 'border-[var(--color-border)] group-hover:border-[var(--color-starlight)]'}`}>
                    <span className={`font-light text-lg leading-none transition-transform duration-500 ${isOpen ? 'text-[var(--color-gold)] rotate-45' : 'text-[var(--color-dust)] group-hover:text-[var(--color-starlight)] rotate-0'}`}>
                      +
                    </span>
                  </div>
                </button>
                
                {/* Smooth Slide-down Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-10 pb-8 pt-2">
                        <p className="font-[var(--font-ui)] font-light text-[15px] md:text-[16px] text-[var(--color-dust)] leading-[1.8] tracking-wide max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
