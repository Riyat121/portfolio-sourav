import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/** Full-screen "curtain" that slides up with the details of one project. */
export default function CaseStudy({ project, onClose }) {
  const ref = useRef(null);
  const last = useRef(null);
  const opener = useRef(null);
  if (project) last.current = project;
  const p = last.current;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  useLayoutEffect(() => { gsap.set(ref.current, { yPercent: 100 }); }, []);

  useEffect(() => {
    const el = ref.current;
    if (project) {
      opener.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      gsap.set(el, { visibility: 'visible' });
      gsap.to(el, { yPercent: 0, duration: reduce ? 0 : 0.9, ease: 'expo.inOut', onComplete: () => el.querySelector('button')?.focus() });
      gsap.fromTo(el.querySelectorAll('.cs-in > *'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, delay: reduce ? 0 : 0.5, duration: 0.7 });
    } else if (last.current) {
      gsap.to(el, {
        yPercent: 100, duration: reduce ? 0 : 0.7, ease: 'expo.inOut',
        onComplete: () => { gsap.set(el, { visibility: 'hidden' }); document.body.style.overflow = ''; opener.current?.focus?.(); },
      });
    }
  }, [project, reduce]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [project, onClose]);

  return (
    <div className="cs" ref={ref} role="dialog" aria-modal="true" aria-label="Project details" data-lenis-prevent>
      <button type="button" className="cs-close" onClick={onClose}>Close</button>
      {p && (
        <div className="cs-in">
          <h2>{p.title}</h2>
          <p className="cs-sub">{p.role} · {p.tag} · {p.period}</p>
          <ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
