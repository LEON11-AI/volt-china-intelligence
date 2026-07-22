import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const targetSelector = [
  ':scope .grid > *',
  ':scope form > *',
  ':scope form :is(input, select, textarea, button)',
  ':scope :is(h2, h3, h4)',
  ':scope p',
  ':scope li',
  ':scope :is(a.rounded-lg, a.rounded-xl, a.rounded-2xl, button)',
].join(', ');

const ScrollMotion: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'))
      .filter((section) => !section.hasAttribute('data-scroll-motion-skip'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = sections.flatMap((section) => {
      const candidates = Array.from(section.querySelectorAll<HTMLElement>(targetSelector));
      return candidates.filter((element) => {
        if (element.closest('section') !== section) return false;
        if (element.closest('[data-scroll-motion-skip]')) return false;
        if (element.matches('.grid, .flex, form, ul, ol')) return false;
        if (element.closest('.grid') && element.matches('h2, h3, h4, p, li')) return false;
        return element.offsetParent !== null;
      });
    });

    const uniqueTargets = Array.from(new Set(targets));
    const show = (element: HTMLElement) => element.classList.add('scroll-reveal-item--visible');

    uniqueTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal-item');
      element.style.setProperty('--scroll-reveal-delay', `${(index % 7) * 72}ms`);
      if (reducedMotion || !('IntersectionObserver' in window)) show(element);
    });

    if (reducedMotion || !('IntersectionObserver' in window)) {
      return () => {
        uniqueTargets.forEach((element) => {
          element.classList.remove('scroll-reveal-item', 'scroll-reveal-item--visible');
          element.style.removeProperty('--scroll-reveal-delay');
        });
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    uniqueTargets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      uniqueTargets.forEach((element) => {
        element.classList.remove('scroll-reveal-item', 'scroll-reveal-item--visible');
        element.style.removeProperty('--scroll-reveal-delay');
      });
    };
  }, [location.pathname]);

  return null;
};

export default ScrollMotion;