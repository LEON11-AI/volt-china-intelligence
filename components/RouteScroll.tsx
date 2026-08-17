import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScroll: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.querySelector(hash) as HTMLElement | null;
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

export default RouteScroll;
