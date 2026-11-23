import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about, site } from '@/content';
import SmartImage from './SmartImage';

gsap.registerPlugin(ScrollTrigger);

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.textContent = value.toLocaleString() + suffix;
      return;
    }

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });

    return () => st.kill();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      // Line-by-line text reveals
      const lines = rootRef.current?.querySelectorAll('.about-line-inner');
      if (lines) {
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 70%',
            },
          },
        );
      }

      // Image clip-path reveal
      gsap.fromTo(
        '.about-image-wrap',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-image-wrap',
            start: 'top 80%',
          },
        },
      );

      // Counters trigger
      gsap.from('.about-counter', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-counters',
          start: 'top 85%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const headlineLines = site.aboutHeadline.split('\n');

  return (
    <section id="about" ref={rootRef} className="section">
      <div className="container">
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 80 }}>
          <span className="section-number">01</span>
          <span style={{ width: 40, height: 1, background: 'var(--line)' }} />
          <span className="label">About</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left: text */}
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 32 }}>
              {headlineLines.map((line, i) => (
                <span key={i} className="reveal-line about-line">
                  <span className="reveal-line-inner about-line-inner">{line}</span>
                </span>
              ))}
            </h2>

            <div
              style={{
                width: 60,
                height: 2,
                background: 'var(--red)',
                marginBottom: 32,
                transform: 'skewY(-1.5deg)',
                boxShadow: '0 0 10px var(--red-glow)',
              }}
            />

            <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, maxWidth: 480 }}>{about.story}</p>
          </div>

          {/* Right: image + counters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div
              className="about-image-wrap chamfer"
              style={{ height: 360, background: 'var(--surface-2)' }}
            >
              <SmartImage src={about.image} alt="BLACK LINE detailing studio" position={about.imagePosition} />
            </div>

            <div className="about-counters" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              {about.counters.map((c) => (
                <div key={c.label} className="about-counter" style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 4vw, 40px)',
                      fontWeight: 700,
                      color: 'var(--text)',
                      lineHeight: 1,
                    }}
                  >
                    <Counter value={c.value} suffix={c.suffix} />
                  </div>
                  <div className="label" style={{ marginTop: 8, fontSize: 10, letterSpacing: '0.15em' }}>
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 480px) {
          .about-counters {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
