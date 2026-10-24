import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { person, skills } from '../data/portfolio';
import './contact.css';

gsap.registerPlugin(ScrollTrigger);

// Three rings with fixed spacing, so the words orbit without ever overlapping each other.
const RINGS = [
  { n: 4, r: 0.4, s: 22, a: 0.1, v: 0.0016 },
  { n: 6, r: 0.66, s: 28, a: 0.16, v: -0.0012 },
  { n: 8, r: 0.92, s: 34, a: 0.24, v: 0.0009 },
];

export default function Contact() {
  const root = useRef(null);
  const canvas = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.ct-line > span', { yPercent: 105, stagger: 0.14, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 55%' } });
        gsap.from('.ct-mag, .ct-soc', { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, delay: 0.45, scrollTrigger: { trigger: root.current, start: 'top 55%' } });
        // Magnetic button.
        const btn = root.current.querySelector('.ct-mag');
        const move = (e) => { const r = btn.getBoundingClientRect(); gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 }); };
        const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, .4)' });
        btn.addEventListener('pointermove', move); btn.addEventListener('pointerleave', leave);
        return () => { btn.removeEventListener('pointermove', move); btn.removeEventListener('pointerleave', leave); };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Orbiting skills on a canvas.
  useEffect(() => {
    const cv = canvas.current, cx = cv.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pts = []; let k = 0;
    RINGS.forEach((g, gi) => { for (let i = 0; i < g.n; i++) pts.push({ t: skills[k++ % skills.length], g, a: (i / g.n) * Math.PI * 2 + gi }); });
    let W, H, on = false, raf;
    const resize = () => { const d = devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); };
    resize(); addEventListener('resize', resize);
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; }); io.observe(cv);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!on) return;
      cx.clearRect(0, 0, W, H); cx.fillStyle = '#f3f0e8'; cx.textAlign = 'center'; cx.textBaseline = 'middle';
      const k2 = Math.min(1, W / 900);
      pts.forEach((p) => {
        if (!reduce) p.a += p.g.v;
        cx.globalAlpha = p.g.a; cx.font = `700 ${Math.round(p.g.s * k2)}px Inter, sans-serif`;
        cx.fillText(p.t, W / 2 + Math.cos(p.a) * p.g.r * W * 0.46, H / 2 + Math.sin(p.a) * p.g.r * H * 0.4);
      });
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); io.disconnect(); };
  }, []);

  return (
    <section id="contact" className="contact" ref={root}>
      <canvas ref={canvas} className="ct-canvas" aria-hidden="true" />
      <div className="ct-in">
        <h2 aria-label="Let’s build something.">
          <span className="ct-line" aria-hidden="true"><span>Let’s build</span></span>
          <span className="ct-line" aria-hidden="true"><span>something.</span></span>
        </h2>
        <a className="ct-mag" href={`mailto:${person.email}`}>Get in touch</a>
        <div className="ct-soc">
          <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={person.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="ct-foot">© 2026 {person.fullName}</p>
      </div>
    </section>
  );
}
