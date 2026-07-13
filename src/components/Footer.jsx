import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full relative bg-[var(--color-void)]/90 backdrop-blur-3xl border-t border-[var(--color-aurora)]/30 overflow-hidden pt-32 pb-12">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[var(--color-aurora)]/5 blur-[120px] pointer-events-none rounded-[100%]" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{
             backgroundImage: `linear-gradient(var(--color-starlight) 1px, transparent 1px), linear-gradient(90deg, var(--color-starlight) 1px, transparent 1px)`,
             backgroundSize: '100px 100px'
           }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-24">
          
          {/* Brand & Mission (Spans 2 columns on desktop) */}
          <div className="md:col-span-2 flex flex-col items-start pr-8">
            <Link to="/" className="mb-6 flex items-center gap-4 hover:opacity-80 transition-opacity">
              <img src="/Logo.png" alt="LightYears" className="h-10 md:h-12 w-auto object-contain" />
              <span className="font-[var(--font-headline)] text-3xl md:text-4xl tracking-[0.2em] text-[var(--color-starlight)] mt-1">
                LIGHTYEARS<span className="text-[var(--color-gold)]">.</span>
              </span>
            </Link>
            <p className="font-[var(--font-ui)] font-light text-[var(--color-dust)] text-[14px] md:text-[15px] leading-relaxed max-w-sm mb-10">
              We engineer zero-overhead astronomical experiences for premium residencies. By seamlessly integrating precision optics with expert logistical execution, we bring the deepest corners of the universe directly to your guests.
            </p>
            <Link 
              to="/reserve"
              className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] hover:text-[var(--color-starlight)] transition-colors duration-300 pb-2 border-b border-[var(--color-gold)]/40 hover:border-[var(--color-starlight)] flex items-center gap-3"
            >
              Initiate Partnership 
              <span className="font-light tracking-normal">&rarr;</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-col">
            <h4 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-starlight)] mb-8">Navigation</h4>
            <ul className="flex flex-col space-y-5">
              {[
                { name: 'Optics', href: '/#optics' },
                { name: 'Telescopes', href: '/#how-it-works' },
                { name: 'Intel', href: '/#faqs' },
                { name: 'Reserve', href: '/reserve' }
              ].map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('/#') ? (
                    <a 
                      href={item.href}
                      className="font-[var(--font-ui)] font-light text-[14px] text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-300 relative group inline-block"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-starlight)] transition-all duration-500 ease-out group-hover:w-full" />
                    </a>
                  ) : (
                    <Link 
                      to={item.href}
                      className="font-[var(--font-ui)] font-light text-[14px] text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-300 relative group inline-block"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-starlight)] transition-all duration-500 ease-out group-hover:w-full" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="flex flex-col">
            <h4 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-starlight)] mb-8">Legal</h4>
            <ul className="flex flex-col space-y-5">
              {['Privacy Policy', 'Terms of Service', 'Contact Operations'].map((item) => {
                const isPrivacy = item === 'Privacy Policy';
                const isTerms = item === 'Terms of Service';
                const isContact = item === 'Contact Operations';
                const linkDest = isPrivacy ? '/privacy' : isTerms ? '/terms' : isContact ? 'mailto:support@lightyears.com' : '#';
                
                return (
                  <li key={item}>
                    {isPrivacy || isTerms ? (
                      <Link 
                        to={linkDest}
                        className="font-[var(--font-ui)] font-light text-[14px] text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    ) : (
                      <a 
                        href={linkDest}
                        className="font-[var(--font-ui)] font-light text-[14px] text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-300"
                      >
                        {item}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-aurora)]/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-dust)]">
            &copy; {new Date().getFullYear()} LightYears Technology
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-[var(--color-dust)] hover:text-[var(--color-starlight)] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Massive Background Typography */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center items-end pointer-events-none opacity-[0.02] select-none translate-y-16">
        <h1 className="font-[var(--font-headline)] text-[18vw] leading-[0.8] tracking-tighter text-[var(--color-starlight)] whitespace-nowrap">
          LIGHTYEARS
        </h1>
      </div>

    </footer>
  );
}
