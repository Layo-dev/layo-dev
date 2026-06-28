import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

export interface CardNavLink {
  label: string;
  href?: string;
  ariaLabel?: string;
}

export interface CardNavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  logoText?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  theme?: 'light' | 'dark';
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  logoText = 'Layo.Dev',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fafaf7',
  menuColor = '#111111',
  buttonBgColor = '#111111',
  buttonTextColor = '#fafaf7',
  theme = 'light',
  ctaLabel = 'Get Started',
  onCtaClick,
}: CardNavProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return 60 + items.length * 90 + 40;
    }
    return 260;
  }, [items.length]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(cardsRef.current, { y: 30, opacity: 0 });
    gsap.set(nav, { height: 60 });

    const tl = gsap.timeline({ paused: true });
    tl.to(nav, {
      height: calculateHeight(),
      duration: 0.45,
      ease,
    });
    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease,
        stagger: 0.06,
      },
      '-=0.2'
    );

    tlRef.current = tl;

    const onResize = () => {
      if (isExpanded && tlRef.current) {
        gsap.set(nav, { height: calculateHeight() });
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      tl.kill();
    };
  }, [calculateHeight, ease, isExpanded]);

  const toggle = () => {
    if (!tlRef.current) return;
    if (isExpanded) {
      tlRef.current.reverse();
    } else {
      tlRef.current.play();
    }
    setIsExpanded((v) => !v);
  };

  const handleLinkClick = (href?: string) => {
    if (!href) return;
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, href.startsWith('mailto:') ? '_self' : '_blank');
    }
    if (tlRef.current) {
      tlRef.current.reverse();
      setIsExpanded(false);
    }
  };

  return (
    <div className={`card-nav-wrapper ${className}`} data-theme={theme}>
      <div
        ref={navRef}
        className="card-nav"
        style={{ background: baseColor }}
      >
        {/* Top bar */}
        <div className="card-nav-top">
          <button
            className="card-nav-toggle"
            onClick={toggle}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            style={{ color: menuColor }}
          >
            <span className={`hamburger ${isExpanded ? 'open' : ''}`}>
              <span />
              <span />
            </span>
          </button>

          <div className="card-nav-logo" style={{ color: menuColor }}>
            {logo ? (
              <img src={logo} alt={logoAlt} />
            ) : (
              <span className="card-nav-logo-text">{logoText}</span>
            )}
          </div>

          <button
            className="card-nav-cta"
            onClick={onCtaClick ?? (() => handleLinkClick('#contact'))}
            style={{ background: buttonBgColor, color: buttonTextColor }}
          >
            {ctaLabel}
            <GoArrowUpRight />
          </button>
        </div>

        {/* Expanded panel */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.map((item, idx) => (
            <div
              key={item.label + idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="card-nav-card"
              style={{ background: item.bgColor, color: item.textColor }}
            >
              <div className="card-nav-card-label">{item.label}</div>
              <ul className="card-nav-card-links">
                {item.links.map((link, i) => (
                  <li key={link.label + i}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      aria-label={link.ariaLabel ?? link.label}
                      style={{ color: item.textColor }}
                    >
                      <GoArrowUpRight />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardNav;
