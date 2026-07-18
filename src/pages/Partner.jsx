import PartnershipSystem from '../components/PartnershipSystem';

export default function Partner() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--color-starlight)]/5 blur-[150px] pointer-events-none rounded-[100%]" />
      <PartnershipSystem />
    </main>
  );
}
