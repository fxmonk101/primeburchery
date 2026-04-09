import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SOCIAL_PROOF_NOTIFICATIONS } from '@/lib/mock-data';

export function SocialProofNotification() {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShow(true);
    }, 8000);

    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % SOCIAL_PROOF_NOTIFICATIONS.length);
        setShow(true);
      }, 500);
    }, 25000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (show) {
      const hideTimer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [show, index]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-[9999] max-w-[320px] bg-card shadow-2xl rounded-xl p-4 border border-border"
        >
          <button onClick={() => setShow(false)} className="absolute top-1.5 right-2 text-muted-foreground text-xs hover:text-foreground">✕</button>
          <p className="text-sm font-button pr-4">{SOCIAL_PROOF_NOTIFICATIONS[index]}</p>
          <p className="text-[10px] text-muted-foreground mt-1 font-button">Just now</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
