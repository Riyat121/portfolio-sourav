import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { person } from '../data/portfolio';
import './hero.css';

gsap.registerPlugin(ScrollTrigger);

const Letters = ({ text }) => text.split('').map((c, i) => <i className="hero-c" key={i}>{c}</i>);

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pinned scroll sequence. The "fx" class switches the layout to the absolute composition.
      mm.add('(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)', () => {
        el.classList.add('fx');
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: el, start: 'top top', end: '+=230%', pin: true, scrub: 0.7, anticipatePin: 1, refreshPriority: 10, invalidateOnRefresh: true },
          })
          .to('.hero-role, .hero-hint', { opacity: 0, duration: 0.15 }, 0)
          .to('.hero-photo img', { scale: 1.16, transformOrigin: '50% 100%', duration: 0.5 }, 0)
          .to('.hero-bg', { yPercent: -10, scale: 1.2, duration: 1 }, 0)
          .to('.hero-n1', { xPercent: -135, duration: 0.5 }, 0.12)
          .to('.hero-n2', { xPercent: 135, duration: 0.5 }, 0.12)
          .to('.hero-wipe', { clipPath: () => `circle(${Math.ceil(Math.hypot(innerWidth, innerHeight))}px at 50% 62%)`, duration: 0.45, ease: 'power2.in' }, 0.3)
          .fromTo('.hero-sl', { opacity: 0, x: -70 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }, 0.68)
          .fromTo('.hero-sr', { opacity: 0, x: 70 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }, 0.74)
          .to('.hero-photo img', { scale: 1.04, duration: 0.3 }, 0.7);
        return () => el.classList.remove('fx');
      });

      // Any viewport: intro animation and pointer parallax.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-c', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04, delay: 0.15 });
        gsap.from('.hero-photo img', { filter: 'blur(18px)', opacity: 0, y: 60, duration: 1.4, ease: 'power3.out' });
        if (matchMedia('(pointer: fine)').matches) {
          const qx = gsap.quickTo('.hero-name', 'x', { duration: 0.9 });
          const qp = gsap.quickTo('.hero-photo img', 'x', { duration: 1.1 });
          const onMove = (e) => { const k = e.clientX / innerWidth - 0.5; qx(k * -36); qp(k * 22); };
          addEventListener('pointermove', onMove);
          return () => removeEventListener('pointermove', onMove);
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero" ref={root}>
      <div className="hero-stage">
        <div className="hero-bg" />
        <div className="hero-wipe" />
        <h1 className="hero-name" aria-label={person.fullName}>
          <span className="hero-n1"><Letters text={person.first} /></span>
          <span className="hero-n2"><Letters text={person.last} /></span>
        </h1>
        <figure className="hero-photo">
          <img src="/portrait.webp" alt={`Illustrated portrait of ${person.fullName}`} />
        </figure>
        <p className="hero-role">{person.role}<br />{person.stack}</p>
        <p className="hero-hint">Scroll</p>
        <p className="hero-statement">
          <span className="hero-sl">I build the whole stack.</span>
          <span className="hero-sr">From first idea to deployed.</span>
        </p>
      </div>
    </section>
  );
}
