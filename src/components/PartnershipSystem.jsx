import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Building, MapPin, User, Mail } from 'lucide-react';

const B2BInput = ({ type = "text", name, placeholder, label, icon: Icon, required = true }) => (
  <div className="relative mb-8 group w-full">
    <label className="absolute -top-4 left-0 font-[var(--font-ui)] text-[9px] uppercase tracking-[0.2em] text-[var(--color-dust)] group-focus-within:text-[var(--color-starlight)] transition-colors">
      {label}
    </label>
    <div className="relative flex items-center">
      <div className="absolute left-0 text-[var(--color-dust)] group-focus-within:text-[var(--color-starlight)] transition-colors">
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <input 
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-white/20 py-3 pl-8 pr-0 font-[var(--font-ui)] text-sm text-[var(--color-starlight)] focus:outline-none focus:border-white transition-colors placeholder:text-[var(--color-dust)]/30"
      />
    </div>
  </div>
);

function SuccessMessage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center text-center py-12 relative"
    >
      <motion.div className="relative z-10 mb-8 flex items-center justify-center w-24 h-24">
        <motion.div
          initial={{ rotate: 0, scale: 0.8 }}
          animate={{ rotate: 90, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute inset-0 border border-white/20 rounded-full"
        />
        <motion.div
          initial={{ rotate: -45, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-2 border-t border-b border-[var(--color-starlight)]/50 rounded-full"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.6 }}
        >
          <CheckCircle2 className="w-12 h-12 text-[var(--color-starlight)] relative z-10" strokeWidth={1} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-[var(--color-starlight)]/70 mb-4 block">
          Transmission Successful
        </span>
        <h3 className="font-[var(--font-headline)] text-2xl md:text-3xl text-[var(--color-starlight)] tracking-widest mb-4">
          Partnership Inquiry Logged
        </h3>
        <p className="font-[var(--font-ui)] text-[var(--color-dust)] font-light max-w-sm mx-auto text-sm leading-relaxed border-l border-[var(--color-starlight)]/30 pl-4 py-1">
          Our logistics team has received your residency details. An operative will reach out shortly to initiate deployment protocols.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function PartnershipSystem() {
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (localStorage.getItem('lightyears_partner_submitted') === 'true') {
      setFormSuccess(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = new URLSearchParams(formData);

    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_SHEETS_PARTNER_URL, {
        method: "POST",
        body: data
      });
      
      const result = await response.json();

      if (result.result === "success") {
        localStorage.setItem('lightyears_partner_submitted', 'true');
        setFormSuccess(true);
      } else if (result.message === "duplicate") {
        setFormError("This residency is already in our routing matrix.");
      } else {
        setFormError("Failed to lock coordinates. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setFormError("Transmission failed. Check network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
      
      <div className="absolute top-0 left-6 w-[2px] h-24 bg-gradient-to-b from-[var(--color-starlight)]/50 to-transparent hidden md:block" />
      <div className="absolute top-0 right-6 w-[2px] h-24 bg-gradient-to-b from-[var(--color-starlight)]/50 to-transparent hidden md:block" />

      <div className="glass-panel p-8 md:p-16 relative overflow-hidden backdrop-blur-xl bg-[#04060F]/60 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
        
        {/* Sleek Silver Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
             style={{
               backgroundImage: `linear-gradient(var(--color-starlight) 1px, transparent 1px), linear-gradient(90deg, var(--color-starlight) 1px, transparent 1px)`,
               backgroundSize: '20px 20px',
             }}
        />

        <AnimatePresence mode="wait">
          {formSuccess ? (
            <SuccessMessage key="success" />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="relative z-10"
            >
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-[1px] bg-[var(--color-starlight)]"></span>
                  <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-starlight)]">
                    B2B Application
                  </span>
                </div>
                <h3 className="font-[var(--font-headline)] text-3xl md:text-5xl text-[var(--color-starlight)] mb-4 tracking-wider">
                  Initiate Partnership
                </h3>
                <p className="font-[var(--font-ui)] font-light text-[var(--color-dust)] text-sm md:text-base max-w-lg leading-relaxed">
                  Enter your property coordinates below. Our team will evaluate logistical parameters and contact you to arrange deployment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-4">
                  <B2BInput name="residencyName" label="Property Name" placeholder="e.g. The Oberoi Wildflower" icon={Building} />
                  <B2BInput name="location" label="Location (India Only)" placeholder="City / Region" icon={MapPin} />
                  <B2BInput name="contactPerson" label="Authorised Personnel" placeholder="Full Name" icon={User} />
                  <B2BInput type="email" name="email" label="Corporate Email" placeholder="director@property.com" icon={Mail} />
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  
                  <p className="font-[var(--font-ui)] text-[10px] text-[var(--color-dust)]/70">
                    * Applications are subject to geographic and logistical review.
                  </p>

                  <AnimatePresence>
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-8 md:mb-0 p-4 border border-red-500/30 bg-red-500/10 text-red-400 font-[var(--font-mono)] text-[10px] tracking-widest uppercase flex items-center gap-4 w-full md:w-auto"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                        {formError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button disabled={isSubmitting} type="submit" className="px-10 py-4 bg-white/5 hover:bg-white text-[var(--color-starlight)] hover:text-black border border-white/20 transition-all duration-500 font-[var(--font-ui)] uppercase tracking-[0.2em] text-[10px] disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Transmitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
