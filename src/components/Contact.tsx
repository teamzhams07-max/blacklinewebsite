import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contact, services, site } from '@/content';
import SocialIcon from './SocialIcon';
import MagneticButton from './MagneticButton';
import HexMesh from './HexMesh';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      // Headline reveals
      const lines = rootRef.current?.querySelectorAll('.contact-line-inner');
      if (lines) {
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
          },
        );
      }

      // Form + info fade up
      gsap.fromTo(
        '.contact-fade',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-grid', start: 'top 75%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

const [sending, setSending] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  if (fd.get('bot-field')) return; // spam trap
  fd.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
  fd.append('subject', 'New enquiry from BLACK LINE website');
  fd.append('from_name', 'BLACK LINE Website');
  setSending(true);
  setError('');
  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    setSubmitted(true);
  } catch {
    setError('Sorry, something went wrong. Please WhatsApp us instead.');
  } finally {
    setSending(false);
  }
};
  return (
    <section id="contact" ref={rootRef} className="section" style={{ background: 'var(--surface)' }}>
      <HexMesh opacity={0.3} fade="right" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span className="section-number">05</span>
          <span style={{ width: 40, height: 1, background: 'var(--line)' }} />
          <span className="label">Contact</span>
        </div>

        {/* Headline */}
        <h2 className="display" style={{ fontSize: 'clamp(48px, 9vw, 100px)', lineHeight: 0.95, marginBottom: 80 }}>
          {site.contactHeadline.map((line, i) => (
            <span key={i} className="reveal-line contact-line">
              <span className="reveal-line-inner contact-line-inner">{line}</span>
            </span>
          ))}
        </h2>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60 }}>
          {/* Form */}
          <div className="contact-fade">
            {submitted ? (
              <div
                className="chamfer"
                style={{
                  padding: 60,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  textAlign: 'center',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 24px' }}>
                  <circle cx="24" cy="24" r="20" />
                  <path d="M16 24l6 6 12-12" />
                </svg>
                <h3 className="display" style={{ fontSize: 24, marginBottom: 12 }}>Message Sent</h3>
                <p style={{ color: 'var(--muted)' }}>
                  We'll get back to you within 24 hours. For urgent enquiries, call or WhatsApp us directly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-ghost"
                  style={{ marginTop: 24 }}
                >
                  <span className="sweep" />
                  Send Another
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-row-2">
                  <FormField label="Name" name="name" type="text" required />
                  <FormField label="Phone" name="phone" type="tel" required />
                </div>
                <FormField label="Email" name="email" type="email" required />
                <FormField label="Car Make / Model" name="car" type="text" />

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 8 }}>
                    Service
                  </label>
                  <select
                    name="service"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--line)',
                      color: 'var(--text)',
                      fontSize: 15,
                      outline: 'none',
                    }}
                  >
                    <option value="" disabled selected>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.number} — {s.name}
                      </option>
                    ))}
                    <option value="Other">Other / Not sure</option>
                  </select>
                </div>

                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 8 }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--line)',
                      color: 'var(--text)',
                      fontSize: 15,
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <MagneticButton as="button" className="btn btn-primary" strength={0.15}>
                  <span className="sweep" />
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M8 3l5 5-5 5" />
                  </svg>
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="contact-fade" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Phones */}
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 16 }}>Call Us</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="red-underline-hover"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 18,
                      fontWeight: 600,
                      color: 'var(--text)',
                      transition: 'color 0.3s',
                    }}
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 16 }}>WhatsApp</span>
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                <SocialIcon name="WhatsApp" size={20} />
                {contact.whatsappDisplay}
              </a>
            </div>

            {/* Email */}
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 16 }}>Email</span>
              <a
                href={`mailto:${contact.email}`}
                style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}
              >
                {contact.email}
              </a>
            </div>

            {/* Instagram */}
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 16 }}>Instagram</span>
              <a
                href={contact.instagramUrl}
                style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}
              >
                @{contact.instagram}
              </a>
            </div>

            {/* Address */}
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 16 }}>Address</span>
              <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>{contact.address}</p>
            </div>

            {/* Hours */}
            <div>
              <span className="label" style={{ display: 'block', marginBottom: 16 }}>Hours</span>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>{contact.hours}</p>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>{contact.hoursSun}</p>
            </div>

            {/* Map placeholder */}
            <div className="chamfer" style={{ height: 200, background: 'var(--surface-2)', overflow: 'hidden', position: 'relative' }}>
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BLACK LINE location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile call/WhatsApp bar */}
      <div className="mobile-action-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900, display: 'none' }}>
        <a href={`tel:${contact.phones[0].replace(/\s/g, '')}`} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '14px 0' }}>
          <span className="sweep" />
          Call
        </a>
        <a href={`https://wa.me/${contact.whatsappNumber}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px 0' }}>
          <span className="sweep" />
          WhatsApp
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 480px) {
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .mobile-action-bar {
            display: flex !important;
          }
          body {
            padding-bottom: 56px;
          }
        }
        .red-underline-hover:hover {
          color: var(--red) !important;
        }
      `}</style>
    </section>
  );
}

function FormField({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="label" style={{ display: 'block', marginBottom: 8 }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: 'var(--surface-2)',
          border: '1px solid var(--line)',
          color: 'var(--text)',
          fontSize: 15,
          outline: 'none',
        }}
      />
    </div>
  );
}
