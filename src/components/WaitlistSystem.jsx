import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const LuxuryInput = ({ type = "text", name, placeholder, label, required = true }) => (
  <div className="relative mb-8 group w-full">
    <label className="absolute -top-4 left-0 font-[var(--font-ui)] text-[9px] uppercase tracking-[0.2em] text-[var(--color-dust)] group-focus-within:text-[var(--color-gold)] transition-colors">
      {label}
    </label>
    <input 
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full bg-transparent border-b border-[var(--color-border)] py-3 px-0 font-[var(--font-ui)] text-sm text-[var(--color-starlight)] focus:outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-[var(--color-dust)]/30"
    />
  </div>
);

function SuccessMessage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center text-center py-12 relative"
    >
      {/* Crosshair to Checkmark Animation Sequence */}
      <motion.div className="relative z-10 mb-8 flex items-center justify-center w-24 h-24">
        <motion.div
          initial={{ rotate: -90, scale: 2, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute inset-0 border border-[var(--color-gold)]/30 rounded-full"
        />
        <motion.div 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="text-[var(--color-gold)] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
        >
          <CheckCircle2 size={56} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Terminal Typing Effect for Title */}
      <div className="overflow-hidden mb-4 min-h-[60px] flex items-center justify-center text-center w-full">
        <motion.h3 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
          className="font-[var(--font-mono)] uppercase text-xl sm:text-2xl tracking-[0.1em] sm:tracking-[0.2em] text-[var(--color-starlight)]"
        >
          Coordinates <span className="text-[var(--color-gold)]">Locked</span>
        </motion.h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="flex flex-col items-center relative z-10"
      >
        <p className="font-[var(--font-ui)] text-[var(--color-dust)] text-[13px] max-w-sm mb-6 leading-loose">
          Connection established. You are officially on the First Light routing matrix.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function WaitlistSystem() {
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Check local storage to prevent duplicate submissions on the same browser
  useEffect(() => {
    if (localStorage.getItem('lightyears_waitlist_submitted') === 'true') {
      setFormSuccess(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
    
    // Using URLSearchParams prevents CORS preflight errors with Google Apps Script
    // and allows us to read the JSON response (to check for duplicates)
    const formData = new FormData(e.target);
    const data = new URLSearchParams(formData);

    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL, {
        method: "POST",
        body: data
      });
      
      const result = await response.json();

      if (result.result === "success") {
        localStorage.setItem('lightyears_waitlist_submitted', 'true');
        setFormSuccess(true);
      } else if (result.message === "duplicate") {
        setFormError("This email is already on the First Light routing matrix.");
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
    <section id="waitlist" className="w-full flex justify-center px-6 py-24 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl luxury-glass flex flex-col md:flex-row overflow-hidden relative z-10"
      >
        
        {/* Left Panel - Branding */}
        <div className="w-full md:w-[35%] flex flex-col border-b md:border-b-0 md:border-r border-[var(--color-border)] bg-black/20 p-12 justify-center relative z-10 overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30" />
          
          <h2 className="font-[var(--font-headline)] font-normal text-4xl text-[var(--color-starlight)] mb-6 leading-tight">
            The First Light<br/>Protocol.
          </h2>
          <p className="font-[var(--font-ui)] font-light text-[var(--color-dust)] mb-8 text-[13px] leading-relaxed">
            LightYears operates on strict logistical routing to maintain zero-overhead excellence. Demand mapping is currently active.
          </p>
          <p className="font-[var(--font-ui)] font-light text-[var(--color-dust)] text-[13px] leading-relaxed">
            Submit your coordinates. We deploy fleets based directly on early-access demand density.
          </p>
        </div>

        {/* Right Panel - Form Area */}
        <div className="w-full md:w-[65%] p-8 md:p-16 min-h-[400px] relative z-10 bg-[var(--color-nebula)] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!formSuccess ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-8">
                  Request Early Access
                </h3>
                
                <form 
                  className="flex flex-col w-full"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col md:flex-row md:space-x-8 w-full">
                    <LuxuryInput name="name" label="Full Name" placeholder="e.g., Galileo Galilei" />
                    <LuxuryInput name="location" label="Target Location / City" placeholder="e.g., Dharamshala, HP" />
                  </div>
                  
                  <LuxuryInput name="email" label="Contact Email" type="email" placeholder="observer@example.com" />

                  <p className="font-[var(--font-ui)] text-[10px] text-[var(--color-dust)]/70 mt-2 mb-8">
                    * By subscribing, you agree to our Privacy Policy. We do not sell data.
                  </p>

                  <AnimatePresence>
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-8 p-4 border border-red-500/30 bg-red-500/10 text-red-400 font-[var(--font-mono)] text-[10px] tracking-widest uppercase flex items-center gap-4"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        {formError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full mt-2">
                    <button disabled={isSubmitting} type="submit" className="luxury-border px-8 py-4 rounded-none font-[var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-[var(--color-starlight)] hover:bg-[var(--color-starlight)] hover:text-[var(--color-void)] transition-all duration-500 w-full sm:w-auto self-start disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? "Transmitting..." : "Submit Coordinates"}
                    </button>
                    
                    <Link to="/partner" className="font-[var(--font-ui)] text-[11px] text-[var(--color-dust)] hover:text-[var(--color-gold)] transition-colors text-center sm:text-right group">
                      Commercial or Hospitality property?<br/>
                      <span className="border-b border-[var(--color-gold)]/30 group-hover:border-[var(--color-gold)] pb-0.5">Initialize B2B Protocol &rarr;</span>
                    </Link>
                  </div>
                </form>
              </motion.div>
            ) : (
              <SuccessMessage key="success" />
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
}
