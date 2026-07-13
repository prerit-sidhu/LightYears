import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow flex flex-col w-full min-h-screen pt-32 bg-[var(--color-void)]/70 backdrop-blur-md pb-32">
      
      {/* Spacer for Fixed Navbar */}
      <div className="h-16" />

      <section className="max-w-4xl mx-auto w-full px-6 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="luxury-glass p-8 md:p-16 border border-[var(--color-aurora)]/30 rounded-[2px]"
        >
          <div className="mb-16">
            <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl text-[var(--color-starlight)] tracking-wide mb-4">
              Terms & Conditions
            </h1>
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[var(--color-gold)]">
              Last Updated: June 2026
            </p>
          </div>

          <div className="space-y-12 font-[var(--font-ui)] text-[var(--color-dust)] font-light leading-relaxed text-[15px]">
            
            <p>
              Welcome to LightYears. These Terms and Conditions govern your use of our website and our premium astronomical equipment rental services, including direct rentals and guided experiences at partner properties. By booking with us, you agree to these terms.
            </p>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">1. Our Services</h2>
              <p>
                We provide high-end optical telescopes and stargazing equipment for temporary rental. Our services operate primarily in high-altitude dark sky regions, including Manali and Sissu. Equipment is available for individual rent to verified users or through curated experiences at partner hospitality stays.
              </p>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">2. Weather, Cancellation, and Rescheduling Policy</h2>
              <p className="mb-4">
                Stargazing is highly dependent on clear skies. To ensure fairness, we enforce the following weather and cancellation rules:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-dust)]/80 marker:text-[var(--color-gold)]">
                <li><strong className="text-[var(--color-starlight)]">The 4-Hour Cancellation Window:</strong> You may cancel your booking for any reason up to 4 hours before your scheduled event or rental pickup time. You will receive a 70% refund. The remaining 30% is retained to cover pre-staged logistical costs.</li>
                <li><strong className="text-[var(--color-starlight)]">Late Cancellations:</strong> Cancellations made less than 4 hours before the scheduled time are strictly non-refundable.</li>
                <li><strong className="text-[var(--color-starlight)]">Bad Weather Rescheduling:</strong> If severe weather or 100% cloud cover prevents viewing, you may reschedule your booking for any other available date at no additional cost. Rescheduling is strictly reserved for verifiable bad weather or documented emergencies, not for general changes of mind.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">3. Equipment Security and Damage Liability</h2>
              <p className="mb-4">
                Telescopes are highly sensitive precision instruments. To protect our inventory, the following liability protocols apply:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-dust)]/80 marker:text-[var(--color-gold)]">
                <li><strong className="text-[var(--color-starlight)]">Security Holds:</strong> Prior to the release of equipment, a temporary security hold will be placed on your payment method (via UPI Mandate or Credit Card Authorization). This hold is fully released upon the safe, undamaged return of the equipment.</li>
                <li><strong className="text-[var(--color-starlight)]">Liability Execution:</strong> If the equipment is returned with damage beyond normal wear and tear, or if internal mechanisms are broken due to forced handling, the repair or replacement costs will be deducted from your security hold.</li>
                <li><strong className="text-[var(--color-starlight)]">Theft:</strong> Failure to return the equipment without communication will be treated as theft. The user will be liable for the full retail replacement value of the telescope kit, and local authorities will be notified.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">4. Strict Equipment Handling Directives</h2>
              <p className="mb-4">
                By renting our equipment, you agree to the following mandatory care rules:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-dust)]/80 marker:text-[var(--color-gold)]">
                <li><strong className="text-[var(--color-starlight)]">Do Not Clean the Optics:</strong> You are strictly prohibited from touching, wiping, or attempting to clean the glass lenses or mirrors with shirts, tissues, or any fluids. Dust is normal; improper cleaning permanently destroys optical coatings.</li>
                <li><strong className="text-[var(--color-starlight)]">Weather Protection:</strong> Equipment must never be exposed to rain, snow, or heavy moisture. If weather shifts unexpectedly, the telescope must be capped and brought indoors immediately.</li>
                <li><strong className="text-[var(--color-starlight)]">No Forced Movements:</strong> Never force motorized or manual tracking gears. If a part resists movement, stop immediately to prevent stripping the gears.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">5. Partner Property Regulations (B2B)</h2>
              <p className="mb-4">
                For guests utilizing our equipment at partner hotels or stays:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-dust)]/80 marker:text-[var(--color-gold)]">
                <li>Equipment must remain on the hotel premises at all times.</li>
                <li>Unauthorized, unlogged use of the equipment facilitated by property management constitutes a direct breach of our exclusivity and asset-protection agreements, subject to immediate audit and liquidated damages as outlined in our corporate partnership contracts.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">6. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Himachal Pradesh.
              </p>
            </section>

          </div>
        </motion.div>
      </section>

    </main>
  );
}
