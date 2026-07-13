import { useEffect } from 'react';
// import BookingSystem from '../components/BookingSystem';
import WaitlistSystem from '../components/WaitlistSystem';

export default function Reserve() {
  // Ensure the page scrolls to top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow flex flex-col w-full min-h-screen pt-32 bg-[var(--color-void)]/70 backdrop-blur-md">
      <WaitlistSystem />
    </main>
  );
}
