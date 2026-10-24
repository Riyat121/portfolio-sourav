import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, recognition } from '../data/portfolio';
import './experience.css';

gsap.registerPlugin(ScrollTrigger);

const LINE_1 = ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind'];
const LINE_2 = ['DSA', 'REST APIs', 'JWT', 'MySQL', 'Framer Motion', 'CI/CD'];

function Track({ items }) {
  // Four identical groups so the track can wrap seamlessly at half its width.
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {[0, 1, 2, 3].map((g) => items.map((t) => <span key={g + t}>{t}<em>✦</em></span>))}
      </div>
    </div>
  );
}

export default function Experience() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.ex-row').forEach((r) => gsap.from(r, { xPercent: -6, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 90%' } }));
        gsap.from('.ex-chips b', { scale: 0.6, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: '.ex-chips', start: 'top 92%' } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Skills strips drift sideways and speed up with your scroll speed.
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tracks = [...root.current.querySelectorAll('.mq-track')];
    const pos = tracks.map(() => 0);
    let last = scrollY, vel = 0;
    const tick = () => {
      const d = scrollY - last; last = scrollY; vel += (d - vel) * 0.1;
      tracks.forEach((t, i) => {
        const w = t.scrollWidth / 2, dir = i ? 1 : -1;
        if (!reduce) pos[i] += dir * (0.7 + Math.abs(vel) * 0.5);
        if (pos[i] < -w) pos[i] += w;
        if (pos[i] > 0) pos[i] -= w;
        t.style.transform = `translateX(${pos[i]}px)`;
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div ref={root}>
      <section id="experience" className="sec ex">
        {experience.map((e) => (
          <div className="ex-row" key={e.title + e.period}>
            <span>{e.period}</span><h4>{e.title}</h4><p>{e.where}</p>
          </div>
        ))}
        <div className="ex-chips">{recognition.map((r) => <b key={r}>{r}</b>)}</div>
      </section>
      <Track items={LINE_1} />
      <Track items={LINE_2} />
    </div>
  );
}
