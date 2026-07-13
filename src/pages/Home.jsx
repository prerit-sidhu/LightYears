import Hero from '../components/Hero'
import ProofSection from '../components/ProofSection'
import MarqueeSection from '../components/MarqueeSection'
import WhatInside from '../components/WhatInside'
import WeatherGuarantee from '../components/WeatherGuarantee'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <main className="flex-grow flex flex-col w-full">
      <Hero />
      
      {/* Glassmorphic Wrappers for the lower sections to let 3D show through */}
      <div className="bg-transparent backdrop-blur-sm border-t border-[var(--color-aurora)]/30 mt-32">
        <ProofSection />
      </div>

      <div className="bg-transparent">
        <MarqueeSection />
      </div>
      
      <div className="bg-transparent">
        <WhatInside />
      </div>
      
      {/* Continuous Glassmorphic Wrapper for bottom sections to prevent blur seaming */}
      <div className="bg-[var(--color-void)]/30 backdrop-blur-md">
        <WeatherGuarantee />
        <CTASection />
        
        <div className="border-t border-[var(--color-aurora)]/30">
          <FAQSection />
        </div>
      </div>
      
    </main>
  );
}
