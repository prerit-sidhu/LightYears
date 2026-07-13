import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const { active } = useProgress();

  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Subtle Minimalist Animation */}
          <motion.div
            className="w-16 h-16 rounded-full border border-[var(--color-starlight)]/20 relative"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.8, 0.1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 rounded-full bg-[var(--color-starlight)]/10 blur-xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
