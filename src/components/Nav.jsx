import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { person } from '../data/portfolio';

const links = [
  ['About', '#approach'],
  ['Work', '#work'],
  ['Resume', '#experience'],
  ['Contact', '#contact'],
];

function toggleTheme() {
  const root = document.documentElement;
  const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.dataset.theme = current === 'dark' ? 'light' : 'dark';
}

export default function Nav() {
  const ref = useRef(null);

  // Over the lime hero the nav is plain dark text; after it, it blends with whatever is behind.
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#approach',
      start: 'top 70px',
      onEnter: () => ref.current.classList.add('inv'),
      onLeaveBack: () => ref.current.classList.remove('inv'),
    });
    return () => st.kill();
  }, []);

  return (
    <header className="nav" ref={ref}>
      <a href="#hero" aria-label={`${person.fullName}, home`}>{person.fullName}</a>
      <nav>
        {links.map(([label, href]) => (
          <a key={href} href={href} className="nav-link">{label}</a>
        ))}
        <button type="button" onClick={toggleTheme} aria-label="Toggle theme">Theme</button>
      </nav>
    </header>
  );
}
