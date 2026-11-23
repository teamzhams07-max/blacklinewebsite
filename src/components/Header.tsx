import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { nav } from '@/content';

/**
 * Fixed minimal header. Hides on scroll down, shows on scroll up.
 * Mobile gets a full-screen menu with staggered link reveal.
 */
export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100 && y > lastScroll.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const links = menuLinksRef.current?.querySelectorAll('.menu-link');
      if (links) {
        gsap.fromTo(
          links,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 },
        );
      }
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          background: 'rgba(10,10,11,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            padding: '0 40px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a href="#hero" onClick={closeMenu} aria-label="Blackline Detailing Studio home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="/images/logo-horizontal.png"
              alt="BLACK LINE Detailing Studio"
              style={{ height: 'clamp(30px, 9vw, 50px)', width: 'auto', display: 'block' }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--text)',
                  position: 'relative',
                  padding: '4px 0',
                }}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 12 }}>
              <span className="sweep" />
              Book Now
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            className="burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}
          >
            <span style={{ width: 24, height: 2, background: 'var(--text)' }} />
            <span style={{ width: 24, height: 2, background: 'var(--text)' }} />
            <span style={{ width: 16, height: 2, background: 'var(--red)' }} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg)',
            zIndex: 10001,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 24px',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--line)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>

          <div ref={menuLinksRef} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="menu-link"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 10vw, 56px)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 14, color: 'var(--red)' }}>0{i + 1}</span>
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="btn btn-primary menu-link"
              style={{ alignSelf: 'flex-start', marginTop: 16, padding: '16px 32px' }}
            >
              <span className="sweep" />
              Book Now
            </a>
          </div>
        </div>
      )}

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--red);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 6px var(--red-glow);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        @media (max-width: 768px) {
          .header-nav { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
