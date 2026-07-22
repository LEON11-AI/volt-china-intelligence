import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollMotion: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'))
      .filter((section) => section.id !== 'brief' && !section.hasAttribute('data-scroll-motion-skip'));

    if (!sections.length) return;

    const show = (section: HTMLElement) => section.classList.add('scroll-reveal--visible');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sections.forEach((section, index) => {
      section.classList.add('scroll-reveal');
      section.style.setProperty('--scroll-reveal-delay', `${(index % 3) * 80}ms`);
      if (reducedMotion || !('IntersectionObserver' in window)) show(section);
    });

    if (reducedMotion || !('IntersectionObserver' in window)) {
      return () => {
        sections.forEach((section) => {
          section.classList.remove('scroll-reveal', 'scroll-reveal--visible');
          section.style.removeProperty('--scroll-reveal-delay');
        });
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove('scroll-reveal', 'scroll-reveal--visible');
        section.style.removeProperty('--scroll-reveal-delay');
      });
    };
  }, [location.pathname]);

  return null;
};

export default ScrollMotion;
