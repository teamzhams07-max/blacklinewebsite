import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site, heroSlides, heroSlideInterval, contact } from '@/content';
import HexMesh from './HexMesh';
import SmartImage from './SmartImage';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [nav, setNav] = useState({ active: 1, prev: 1 });
  const { active, prev: prevActive } = nav;
  const goTo = (to: number) => setNav((s) => ({ active: to, prev: s.active }));
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;
  const half = Math.floor(n / 2);
  const offset = (i: number, a: number) => ((((i - a) % n) + n + half) % n) - half;
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-advance, one image at a time
  useEffect(() => {
    if (paused || reducedMotion || n < 2) return;
    const id = window.setInterval(() => setNav((s) => ({ active: (s.active + 1) % n, prev: s.active })), heroSlideInterval);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, n, active]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      // Headline line reveals
      const lines = headlineRef.current?.querySelectorAll('.hero-line-inner');
      if (lines) {
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out',
            delay: 0.3,
          },
        );
      }

      // Tagline + CTAs fade up
      gsap.fromTo(
        '.hero-fade-up',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.8,
        },
      );

      // Row reveal
      gsap.fromTo('.hero-row', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });

      // Gentle parallax on the image row
      gsap.to('.hero-row', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={rootRef} className="hero3">
      {/* Background glow + hex mesh */}
      <div className="hero3-glow" />
      <HexMesh fade="left" style={{ left: 0, width: '20%' }} opacity={0.4} />
      <HexMesh fade="right" style={{ right: 0, width: '20%' }} opacity={0.4} />

      <div className="hero3-inner">
        {/* Sliding images */}
        <div
          className="hero-row"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero-lines" aria-hidden="true" />
          {heroSlides.map((slide, i) => {
            const pos = offset(i, active);
            const wrapped = Math.abs(pos - offset(i, prevActive)) > 2;
            return (
              <div
                key={slide.src}
                className={`hero-slide${wrapped ? ' hero-slide-jump' : ''}`}
                data-pos={pos}
                onClick={() => pos !== 0 && goTo(i)}
                aria-hidden={pos !== 0}
              >
                <SmartImage src={slide.src} alt={slide.alt} position={slide.position} loading="eager" />
              </div>
            );
          })}
          <div className="hero-edge hero-edge-left" aria-hidden="true" />
          <div className="hero-edge hero-edge-right" aria-hidden="true" />
          <div className="hero-dots">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`hero-dot${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div className="hero-fade-up hero3-tagline">
          {site.tagline.split(' | ').map((part, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && <span style={{ width: 24, height: 1, background: 'var(--red)' }} />}
              <span className="label">{part}</span>
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className="display hero3-headline">
          {site.heroHeadline.map((line, i) => (
            <span key={i} className="reveal-line hero-line">
              <span className="reveal-line-inner hero-line-inner">{line}</span>
            </span>
          ))}
        </h1>

        {/* CTAs */}
        <div className="hero-fade-up hero3-ctas">
          <MagneticButton as="a" href="#contact" className="btn btn-primary" strength={0.2}>
            <span className="sweep" />
            Book a Detailing
          </MagneticButton>
          <MagneticButton as="a" href={`https://wa.me/${contact.whatsappNumber}`} className="btn btn-ghost" strength={0.2}>
            <span className="sweep" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.5-4.5A8 8 0 1 1 12 20a7.9 7.9 0 0 1-4-1L3 21z" />
            </svg>
            WhatsApp
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-fade-up"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span className="label" style={{ fontSize: 9 }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'var(--muted)', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'var(--red)',
              animation: 'scrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
