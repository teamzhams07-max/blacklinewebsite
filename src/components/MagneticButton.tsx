import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'a' | 'button' | 'div';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

/**
 * Magnetic button wrapper — the element subtly follows the cursor.
 */
export default function MagneticButton({ children, className = '', strength = 0.3, as = 'button', href, onClick, disabled }: Props) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  if (as === 'a') {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', display: 'inline-flex' }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      disabled={disabled}
      style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : undefined }}
    >
      {children}
    </button>
  );
}
