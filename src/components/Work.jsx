import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import { mocks } from './Mocks';
import CaseStudy from './CaseStudy';
import './work.css';

gsap.registerPlugin(ScrollTrigger);

function Sheet({ p, onOpen }) {
  const c = p.colors;
  const Mock = mocks[p.key];
  return (
    <article className="wk-sheet" style={{ '--b': c.bg, '--f': c.text, '--t': c.title, '--p': c.pill, '--pc': c.pillText }}>
      <div className="wk-sc">
        <h3 className="wk-pt" aria-label={p.title}>
          {p.title.split(' ').map((w, i) => (
            <span className="wk-wm" key={i} aria-hidden="true"><span className="wk-w">{w}{'\u00a0'}</span></span>
          ))}
        </h3>
        <p className="wk-oh">{p.headline}</p>
        <p className="wk-od">{p.description}</p>
        <dl className="wk-figs">
          {p.figures.map((f) => (<div key={f.label}><dt>{f.value}</dt><dd>{f.label}</dd></div>))}
        </dl>
        <div className="wk-pills">
          <button type="button" className="wk-pill" onClick={() => onOpen(p)}>Read case study ↗</button>
          <span className="wk-pill ghost">{p.tag}</span>
        </div>
        <p className="wk-rl">{p.role}</p>
      </div>
      <Mock />
    </article>
  );
}

export default function Work() {
  const root = useRef(null);
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  useLayoutEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const nav = document.querySelector('.nav');
      const navSet = (c) => { if (!nav) return; nav.style.mixBlendMode = c ? 'normal' : ''; nav.style.color = c || ''; };

      // Desktop: the period of "work." opens like an aperture onto the first project.
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const dot = el.querySelector('.wk-dot'), pin = el.querySelector('.wk-pin');
        const at = () => { const a = dot.getBoundingClientRect(), b = pin.getBoundingClientRect(); return `${a.left + a.width / 2 - b.left}px ${a.top + a.height / 2 - b.top}px`; };
        gsap.fromTo('.wk-apx',
          { clipPath: () => `circle(${Math.round(dot.getBoundingClientRect().width / 2) + 1}px at ${at()})` },
          { clipPath: () => `circle(${Math.ceil(Math.hypot(innerWidth, innerHeight))}px at ${at()})`, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + Math.round(innerHeight * 0.8), scrub: 0.6, invalidateOnRefresh: true } });

        // Each sheet dims as the next one slides over it.
        const sheets = gsap.utils.toArray('.wk-sheet');
        sheets.forEach((s, i) => {
          if (i) gsap.to(sheets[i - 1], { filter: 'brightness(.6)', ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top top', scrub: true } });
        });

        // Nav text colour follows the sheet that is on screen.
        const cols = projects.map((p) => p.colors.text);
        ScrollTrigger.create({
          trigger: el, start: 'top top', end: 'bottom top',
          onUpdate: (s) => {
            const v = (s.scroll() - s.start) / innerHeight;
            navSet(v < 0.6 ? null : cols[v < 2.25 ? 0 : v < 3.25 ? 1 : 2]);
          },
          onLeave: () => navSet(null), onLeaveBack: () => navSet(null),
        });
        return () => navSet(null);
      });

      // Motion on any viewport: titles rise word by word, figures and windows move in.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.wk-pt').forEach((h) => gsap.from(h.querySelectorAll('.wk-w'), { yPercent: 115, stagger: 0.07, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
        gsap.utils.toArray('.wk-figs > div').forEach((f) => gsap.from(f, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: f, start: 'top 92%' } }));
        gsap.utils.toArray('.wk-win').forEach((w) => gsap.fromTo(w, { yPercent: 7 }, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: true } }));
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="stack" ref={root}>
      <div className="wk-pin">
        <div className="wk-hd">
          <h2>Selected<br />work<i className="wk-dot" /></h2>
          <p className="wk-sub">Three projects, from a MERN route planner to client work and a health-data model.</p>
        </div>
        <div className="wk-apx"><Sheet p={projects[0]} onOpen={setActive} /></div>
      </div>
      <div className="wk-gap" />
      {projects.slice(1).map((p) => <Sheet key={p.key} p={p} onOpen={setActive} />)}
      <CaseStudy project={active} onClose={close} />
    </section>
  );
}
