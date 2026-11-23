import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/content';
import { getServiceImages } from '@/serviceImages';
import ServiceIcon from './ServiceIcon';
import SmartImage from './SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      // Reveal rows on scroll
      gsap.utils.toArray<HTMLElement>('.service-item').forEach((row) => {
        gsap.from(row, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
        });
      });

      // Header reveal
      gsap.fromTo(
        '.services-header-inner',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.services-header', start: 'top 75%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    setOpen((cur) => (cur === i ? null : i));
    // Layout height changes — keep scroll triggers accurate once the panel finishes animating
    window.setTimeout(() => ScrollTrigger.refresh(), 600);
  };

  return (
    <section id="services" ref={rootRef} className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span className="section-number">02</span>
          <span style={{ width: 40, height: 1, background: 'var(--line)' }} />
          <span className="label">Services</span>
        </div>

        <div className="services-header" style={{ marginBottom: 64, overflow: 'hidden' }}>
          <h2 className="display services-header-inner" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            What We Do
          </h2>
        </div>

        {/* Service list */}
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {services.map((service, i) => {
            const isOpen = open === i;
            const highlighted = isOpen || hovered === i;
            const images = getServiceImages(service.id);
            const panelId = `service-panel-${service.id}`;

            return (
              <div key={service.id} className="service-item" style={{ borderBottom: '1px solid var(--line)', position: 'relative' }}>
                <button
                  type="button"
                  className="service-row"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 48px 1fr auto',
                    alignItems: 'center',
                    gap: 24,
                    width: '100%',
                    padding: '24px 0',
                    textAlign: 'left',
                    color: 'inherit',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'padding-left 0.4s cubic-bezier(0.16,1,0.3,1)',
                    paddingLeft: highlighted ? 16 : 0,
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 13,
                      fontWeight: 600,
                      color: highlighted ? 'var(--red)' : 'var(--muted)',
                      transition: 'color 0.3s',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div
                    style={{
                      color: highlighted ? 'var(--red)' : 'var(--text)',
                      transition: 'color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <ServiceIcon id={service.id} size={32} />
                  </div>

                  {/* Name */}
                  <h3
                    className="display"
                    style={{
                      fontSize: 'clamp(20px, 3vw, 28px)',
                      fontWeight: 600,
                      color: 'var(--text)',
                    }}
                  >
                    {service.name}
                  </h3>

                  {/* Open / close indicator */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke={highlighted ? 'var(--red)' : 'var(--muted)'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), stroke 0.3s',
                    }}
                    aria-hidden="true"
                  >
                    <path d="M4 10h12M10 4l6 6-6 6" />
                  </svg>

                  {/* Slanted red underline */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: 2,
                      background: 'var(--red)',
                      transform: highlighted ? 'scaleX(1) skewY(-0.5deg)' : 'scaleX(0) skewY(-0.5deg)',
                      transformOrigin: 'left',
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                      boxShadow: highlighted ? '0 0 8px var(--red-glow)' : 'none',
                    }}
                  />
                </button>

                {/* Expandable panel: description + this service's images */}
                <div
                  id={panelId}
                  role="region"
                  aria-label={`${service.name} details`}
                  className="service-panel"
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.55s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <div style={{ overflow: 'hidden', minHeight: 0 }}>
                    <div
                      className="service-panel-inner"
                      style={{
                        padding: '8px 0 40px 96px',
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(0)' : 'translateY(-12px)',
                        transition: 'opacity 0.45s ease 0.1s, transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: 17, lineHeight: 1.7, maxWidth: 640, marginBottom: 28 }}>
                        {service.description}
                      </p>

                      <div className="service-gallery">
                        {images.length > 0 ? (
                          images.map((src, n) => (
                            <div key={src} className="chamfer" style={{ aspectRatio: '3 / 4', background: 'var(--surface-2)' }}>
                              <SmartImage src={src} alt={`${service.name} — photo ${n + 1}`} position="center 80%" />
                            </div>
                          ))
                        ) : (
                          <div className="chamfer" style={{ aspectRatio: '3 / 4', background: 'var(--surface-2)' }}>
                            <SmartImage src="" alt={`${service.name} — photos coming soon`} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .service-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 340px));
          gap: 20px;
        }
        @media (max-width: 768px) {
          .service-row {
            grid-template-columns: 40px 32px 1fr auto !important;
            gap: 12px !important;
          }
          .service-panel-inner {
            padding-left: 0 !important;
          }
          .service-gallery {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }
        @media (max-width: 480px) {
          .service-gallery {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
