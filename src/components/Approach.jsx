import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { approach, rows, stats } from '../data/portfolio';
import './approach.css';

gsap.registerPlugin(ScrollTrigger);

const Words = ({ text }) => text.split(' ').map((w, i) => <span className="ap-w" key={i}>{w}</span>);

export default function Approach() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Statement fills in word by word as you scroll.
        gsap.fromTo('.ap-w', { opacity: 0.14 }, {
          opacity: 1, stagger: 0.12, ease: 'none',
          scrollTrigger: { trigger: '.ap-text', start: 'top 78%', end: 'bottom 45%', scrub: true },
        });
        gsap.from('.ap-row', { opacity: 0, y: 40, stagger: 0.12, duration: 0.8, scrollTrigger: { trigger: '.ap-rows', start: 'top 82%' } });
        // Count-up numbers.
        gsap.utils.toArray('.ap-stat b').forEach((b) => {
          const n = parseFloat(b.dataset.n), dec = b.dataset.n.includes('.') ? 2 : 0, suffix = b.dataset.suffix || '', o = { v: 0 };
          gsap.to(o, { v: n, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: b, start: 'top 88%' }, onUpdate: () => { b.textContent = o.v.toFixed(dec) + suffix; } });
        });
      });
      // Reduced motion: show the statement at full strength.
      mm.add('(prefers-reduced-motion: reduce)', () => { gsap.set('.ap-w', { opacity: 1 }); });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" className="sec approach" ref={root}>
      <p className="ap-text">
        <Words text={approach.before} />
        <span className="ap-pill ap-w"><img src="/portrait.webp" alt="" /></span>
        <Words text={approach.after} />
      </p>
      <div className="ap-rows">
        {rows.map((r) => (
          <div className="ap-row" key={r.title}><h3>{r.title}</h3><p>{r.text}</p></div>
        ))}
      </div>
      <div className="ap-stats">
        {stats.map((s) => (
          <div className="ap-stat" key={s.label}>
            <b data-n={s.n} data-suffix={s.suffix}>{s.n}{s.suffix}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
