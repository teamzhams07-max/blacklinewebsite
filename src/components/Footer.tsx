import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site, socials, contact } from '@/content';
import SocialIcon from './SocialIcon';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      // Giant wordmark outline reveal
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: wordmarkRef.current, start: 'top 90%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={rootRef} style={{ position: 'relative', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'start',
            marginBottom: 80,
          }}
          className="footer-grid"
        >
          <div>
            <span className="label" style={{ display: 'block', marginBottom: 16 }}>Follow</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    width: 44,
                    height: 44,
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--red)';
                    e.currentTarget.style.color = 'var(--red)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.color = 'var(--muted)';
                  }}
                >
                  <SocialIcon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="label" style={{ display: 'block', marginBottom: 16 }}>Get in Touch</span>
            <a href={`tel:${contact.phones[0].replace(/\s/g, '')}`} style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text)' }}>
              {contact.phones[0]}
            </a>
          </div>
        </div>

        {/* Giant wordmark outline */}
        <div ref={wordmarkRef} style={{ textAlign: 'center', marginBottom: 40, overflow: 'hidden' }}>
          <img
            src="/images/logo-full.png"
            alt="BLACK LINE Detailing Studio"
            style={{ width: 'clamp(220px, 34vw, 420px)', height: 'auto', display: 'block', margin: '0 auto 8px', userSelect: 'none' }}
          />
          <p className="label" style={{ marginTop: 16, fontSize: 12 }}>
            {site.tagline}
          </p>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 32,
            borderTop: '1px solid var(--line)',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>
              &copy; {new Date().getFullYear()} BLACK LINE Detailing Studio. All rights reserved.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: '0.04em' }}>
              Built and maintained by <span style={{ color: 'var(--text)', fontWeight: 600 }}>Z-Hams</span>
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="label"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--muted)',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            Back to Top
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 12V2M2 7l5-5 5 5" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-grid > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </footer>
  );
}
