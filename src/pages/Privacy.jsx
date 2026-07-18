import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[var(--color-gold)]">
              Last Updated: June 2026
            </p>
          </div>

          <div className="space-y-12 font-[var(--font-ui)] text-[var(--color-dust)] font-light leading-relaxed text-[15px]">
            
            <p>
              At LightYears, we respect your privacy and are committed to protecting your personal data in accordance with the Digital Personal Data Protection (DPDP) Act of India. This policy explains what information we collect, why we need it, and how we keep it safe.
            </p>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                To provide a secure rental experience and verify the identity of our users, we collect the following limited information during the booking process:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-dust)]/80 marker:text-[var(--color-gold)]">
                <li>Full Name</li>
                <li>Contact Number</li>
                <li>Email Address</li>
                <li>Government-Issued ID Verification (e.g., PAN Card, Aadhaar, or Passport)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">2. How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-dust)]/80 marker:text-[var(--color-gold)]">
                <li><strong className="text-[var(--color-starlight)]">Identity Verification:</strong> Because we rent out high-value equipment, your Government ID is used strictly to verify your identity and prevent fraud or theft.</li>
                <li><strong className="text-[var(--color-starlight)]">Communication:</strong> We use your email and phone number to send booking confirmations, digital unlock codes, and operational updates.</li>
                <li><strong className="text-[var(--color-starlight)]">Marketing Offers:</strong> With your explicit consent, we may occasionally use your email and phone number to send promotional offers or discounts related to our stargazing services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">3. Strict Data Retention and Deletion</h2>
              <p className="mb-4">
                We practice aggressive data minimization to ensure your security:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-dust)]/80 marker:text-[var(--color-gold)]">
                <li><strong className="text-[var(--color-starlight)]">Immediate ID Deletion:</strong> Your Government ID (PAN Card, etc.) is never permanently stored on our servers. It is securely deleted immediately upon the successful completion and safe return of your rental.</li>
                <li><strong className="text-[var(--color-starlight)]">Account Deletion:</strong> You have the absolute right to be forgotten. You can request the complete deletion of your account, including your email and phone number, at any time by sending an email to our support team. Upon receiving your request, all your data will be permanently wiped from our active systems.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">4. Zero Third-Party Sharing</h2>
              <p>
                We are in the business of stargazing, not data brokering. We will never sell, rent, or share your personal information, phone number, or email address with any third-party marketing agencies, advertisers, or external businesses. Your data stays exclusively with us.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl text-[var(--color-starlight)] mb-4">5. Contact Us for Privacy Concerns</h2>
              <p>
                If you wish to view, correct, or request the deletion of your personal data, please contact our Grievance Officer at:<br/>
                <strong className="text-[var(--color-starlight)]">Email:</strong> support@joinlightyears.in
              </p>
            </section>

          </div>
        </motion.div>
      </section>

    </main>
  );
}
