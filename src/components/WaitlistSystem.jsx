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
        Coordinates Locked.
      </h3>
      <p className="font-[var(--font-ui)] text-[var(--color-dust)] max-w-sm">
        You are officially on the First Light waitlist. We will notify you the moment our operations go live in your sector.
      </p>
    </motion.div>
  );
}

export default function WaitlistSystem() {
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);

    try {
      // mode: "no-cors" is required to prevent Google's strict CORS policy from blocking the POST.
      // Note: Because it is no-cors, the response will be "opaque" (we can't read the success JSON),
      // so if it doesn't throw a network error, we assume it was successfully received.
      await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      setFormSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Transmission failed. Check network connection.");
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
                  
                  <button disabled={isSubmitting} type="submit" className="luxury-border px-8 py-4 rounded-none font-[var(--font-ui)] uppercase tracking-[0.2em] text-[10px] text-[var(--color-starlight)] hover:bg-[var(--color-starlight)] hover:text-[var(--color-void)] transition-all duration-500 w-full sm:w-auto self-start disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Transmitting..." : "Submit Coordinates"}
                  </button>
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
