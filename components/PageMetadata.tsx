import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata, SITE_URL } from '../src/lib/siteMetadata';

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

const PageMetadata: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const page = getPageMetadata(location.pathname);
    const canonical = `${SITE_URL}${page.path}`;
    document.title = page.title;
    upsertMeta('name', 'description', page.description);
    upsertMeta('name', 'robots', page.robots ?? 'index,follow,max-image-preview:large');
    upsertMeta('property', 'og:title', page.title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', page.image);
    upsertMeta('property', 'og:image:secure_url', page.image);
    upsertMeta('property', 'og:image:alt', page.title);
    upsertMeta('name', 'twitter:title', page.title);
    upsertMeta('name', 'twitter:description', page.description);
    upsertMeta('name', 'twitter:image', page.image);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    let schema = document.getElementById('voltchina-page-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'voltchina-page-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(page.schema).replace(/</g, '\\u003c');
  }, [location.pathname]);

  return null;
};

export default PageMetadata;
