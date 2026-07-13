import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// --- Concierge Form Components ---

const LuxuryInput = ({ type = "text", placeholder, label, required = true }) => (
  <div className="relative mb-8 group w-full">
    <label className="absolute -top-4 left-0 font-[var(--font-ui)] text-[9px] uppercase tracking-[0.2em] text-[var(--color-dust)] group-focus-within:text-[var(--color-gold)] transition-colors">
      {label}
    </label>
    <input 
      type={type}
      placeholder={placeholder}
      required={required}
      className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-0 font-[var(--font-ui)] text-sm text-[var(--color-starlight)] focus:outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-[var(--color-dust)]/30"
    />
  </div>
);

const LuxurySelect = ({ label, options, required = true }) => (
  <div className="relative mb-8 group w-full">
    <label className="absolute -top-4 left-0 font-[var(--font-ui)] text-[9px] uppercase tracking-[0.2em] text-[var(--color-dust)] group-focus-within:text-[var(--color-gold)] transition-colors">
      {label}
    </label>
    <select required={required} defaultValue="" className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-0 font-[var(--font-ui)] text-sm text-[var(--color-starlight)] focus:outline-none focus:border-[var(--color-gold)] transition-colors appearance-none cursor-pointer">
      <option value="" disabled className="text-[var(--color-void)]">Select option...</option>
      {options.map(opt => (
        <option key={opt} value={opt} className="text-[var(--color-void)] bg-[var(--color-starlight)]">{opt}</option>
      ))}
    </select>
    {/* Custom Dropdown Arrow */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[var(--color-starlight)]">
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

const TravelerForm = ({ onSubmit }) => {
  return (
    <motion.form 
      className="flex flex-col w-full"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
    >
      <div className="flex flex-col md:flex-row md:space-x-8 w-full">
        <LuxurySelect 
          label="Instrument Tier" 
          options={["130mm Dobsonian (Planetary & Lunar)", "8-inch Cassegrain (Deep Sky Objects)", "12-inch LightBridge (Professional)"]} 
        />
        <LuxuryInput label="Destination / Coordinates" placeholder="e.g., Dharamshala, Spiti, or GPS" />
      </div>
      
      <div className="flex flex-col md:flex-row md:space-x-8 w-full">
        <LuxuryInput label="Arrival Date" type="date" />
        <LuxuryInput label="Departure Date" type="date" />
      </div>

      <LuxuryInput label="Contact Email" type="email" placeholder="observer@example.com" />

      <p className="font-[var(--font-ui)] text-[10px] text-[var(--color-dust)]/70 mt-2 mb-6">
        * Our team will reach out to you directly to confirm availability and logistics.
      </p>
      <button type="submit" className="luxury-border px-8 py-4 rounded-none font-[var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-[var(--color-starlight)] hover:bg-[var(--color-starlight)] hover:text-[var(--color-void)] transition-all duration-500 w-full sm:w-auto self-start">
        Request Instrument
      </button>
    </motion.form>
  );
};

const PartnerForm = ({ onSuccess }) => {
  return (
    <motion.form 
      className="flex flex-col w-full"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={(e) => { e.preventDefault(); onSuccess(); }}
    >
      <div className="flex flex-col md:flex-row md:space-x-8 w-full">
        <LuxuryInput label="Property Name" placeholder="e.g., Himalayan Ridge Resort" />
        <LuxuryInput label="Location Altitude" placeholder="e.g., 2000m (Dark Sky Rated?)" />
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8 w-full">
        <LuxurySelect 
          label="Expected Guest Volume" 
          options={["Boutique (1-10 rooms)", "Resort (10-50 rooms)", "Estate (50+ rooms)"]} 
        />
        <LuxuryInput label="Contact Email" type="email" placeholder="concierge@resort.com" />
      </div>

      <p className="font-[var(--font-ui)] text-[10px] text-[var(--color-dust)]/70 mt-2 mb-6">
        * Our partnership team will reach out to you directly to discuss integration and logistics.
      </p>
      <button type="submit" className="luxury-border px-8 py-4 rounded-none font-[var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-[var(--color-starlight)] hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-[var(--color-void)] transition-all duration-500 w-full sm:w-auto self-start">
        Submit Partnership Inquiry
      </button>
    </motion.form>
  );
};

function SuccessMessage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center text-center py-12"
    >
      <motion.div 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8 text-[var(--color-pulsar)]"
      >
        <CheckCircle2 size={64} strokeWidth={1.5} />
      </motion.div>
      <h3 className="font-[var(--font-headline)] italic text-4xl text-[var(--color-starlight)] mb-4">
        We'll be in touch.
      </h3>
      <p className="font-[var(--font-ui)] text-[var(--color-dust)] max-w-sm">
        Our partnership team will review your property details and reach out to you directly to discuss the next steps.
      </p>
    </motion.div>
  );
}

function BookingModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto flex flex-col justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl mx-auto bg-[var(--color-nebula)] border-t border-l border-r border-[var(--color-aurora)] rounded-t-xl p-8 pb-12 shadow-[0_0_50px_rgba(4,6,15,0.8)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors"
            >
              <span className="font-[var(--font-mono)] text-2xl">×</span>
            </button>

            <h3 className="font-[var(--font-headline)] italic text-4xl text-[var(--color-starlight)] mb-2">
              Kit Available.
            </h3>
            <p className="font-[var(--font-ui)] text-[var(--color-dust)] mb-8">
              A Dobsonian transit kit is available for your selected dates in Dharamshala.
            </p>

            <div className="bg-[var(--color-void)] border border-[var(--color-aurora)] rounded-[2px] p-6 mb-8">
              <div className="flex justify-between items-end mb-4 border-b border-[var(--color-aurora)]/50 pb-4">
                <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-dust)]">Equipment</span>
                <span className="font-[var(--font-ui)] text-sm text-[var(--color-starlight)]">130mm Dobsonian + Smart Mount</span>
              </div>
              <div className="flex justify-between items-end mb-4 border-b border-[var(--color-aurora)]/50 pb-4">
                <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-dust)]">Dates</span>
                <span className="font-[var(--font-ui)] text-sm text-[var(--color-starlight)]">Oct 14 — Oct 16</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-dust)]">Total (inc. Delivery)</span>
                <span className="font-[var(--font-ui)] font-bold text-lg text-[var(--color-pulsar)]">₹4,500</span>
              </div>
            </div>

            <a 
              href="#"
              className="flex items-center justify-center w-full bg-[#25D366] text-white font-[var(--font-ui)] font-bold uppercase tracking-[0.1em] text-[13px] py-4 rounded-[2px] hover:bg-[#20bd5a] transition-colors gap-3"
            >
              Confirm via WhatsApp
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function BookingSystem() {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  return (
    <section id="pricing" className="w-full flex justify-center px-6 py-24 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl luxury-glass flex flex-col md:flex-row overflow-hidden relative z-10"
      >
        
        {/* Left Panel - Vertical Selector */}
        <div className="w-full md:w-[30%] flex flex-col border-b md:border-b-0 md:border-r border-[var(--color-border)] bg-black/20 relative z-10">
          {[0, 1].map((idx) => {
            const isActive = activeTab === idx;
            return (
              <button 
                key={idx}
                onClick={() => { setActiveTab(idx); if (idx === 1) setFormSuccess(false); }}
                className="flex-1 min-h-[120px] md:min-h-[250px] relative text-left px-8 py-8 overflow-hidden flex flex-col justify-center group"
              >
                {/* Active Gliding Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[var(--color-nebula)]/50 border-l-[3px] border-[var(--color-pulsar)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Animated Background Numbers */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0, x: 20 }}
                      animate={{ scale: 1, opacity: 0.05, x: 0 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-4 right-4 font-[var(--font-headline)] font-normal text-[96px] leading-none text-[var(--color-starlight)] pointer-events-none select-none z-0"
                    >
                      0{idx + 1}
                    </motion.span>
                  )}
                </AnimatePresence>

                <span className="relative z-10 font-[var(--font-kinetic)] uppercase tracking-[0.15em] text-[12px] text-[var(--color-starlight)] transition-colors">
                  0{idx + 1} &mdash; {idx === 0 ? "Resort Partnerships" : "Private Rentals"}
                </span>
              </button>
            );
          })}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[var(--color-aurora)] pointer-events-none z-0 hidden md:block" />
        </div>

        {/* Right Panel - Form Area */}
        <div className="w-full md:w-[70%] p-8 md:p-16 min-h-[400px] relative z-10 bg-[var(--color-nebula)]">
          <AnimatePresence mode="wait">
            {activeTab === 0 ? (
              <motion.div 
                key="partners"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {!formSuccess ? (
                  <>
                    <h2 className="font-[var(--font-headline)] font-normal text-3xl text-[var(--color-starlight)] mb-4">
                      Host the Stars.
                    </h2>
                    <p className="font-[var(--font-ui)] font-light text-[var(--color-dust)] mb-10 text-sm leading-[1.8] tracking-wide">
                      Offer a premium stargazing experience to your guests. We handle equipment, professional guidance, and logistics, elevating your property's nighttime experience without any overhead.
                    </p>
                    <PartnerForm onSuccess={() => setFormSuccess(true)} />
                  </>
                ) : (
                  <SuccessMessage />
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="travelers"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-[var(--font-headline)] font-normal text-3xl text-[var(--color-starlight)] mb-4">
                  Professional Equipment.
                </h2>
                <p className="font-[var(--font-ui)] font-light text-[var(--color-dust)] mb-10 text-sm leading-[1.8] tracking-wide">
                  Already know your way around the sky? Rent our meticulously calibrated Dobsonian kits for personal use. Delivery included.
                </p>
                <TravelerForm onSubmit={() => setModalOpen(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
