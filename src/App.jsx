import useSmoothScroll from './hooks/useSmoothScroll';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Approach from './components/Approach';
import Work from './components/Work';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  useSmoothScroll();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Approach />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
