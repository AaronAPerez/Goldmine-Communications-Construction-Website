import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
}

const DEFAULT_SITE_NAME = 'Goldmine Construction Services';
const DEFAULT_SITE_URL = 'https://goldminecomm.net';
const DEFAULT_IMAGE = '/images/logo/logo-banner.jpg';

/**
 * Simple SEO Component
 * Provides basic meta tags and Open Graph data
 */
export default function SEO({
  title,
  description,
  canonical,
  keywords = [],
  noIndex = false,
  noFollow = false,
}: SEOProps) {
  const router = useRouter();
  const currentUrl = `${DEFAULT_SITE_URL}${router.asPath}`;
  const canonicalUrl = canonical || currentUrl;
  const fullTitle = title === DEFAULT_SITE_NAME ? title : `${title} | ${DEFAULT_SITE_NAME}`;
  
  // Generate robots content
  const robotsContent = () => {
    const directives = [];
    if (noIndex) directives.push('noindex');
    if (noFollow) directives.push('nofollow');
    return directives.length > 0 ? directives.join(', ') : 'index, follow';
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent()} />
      
      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
      <meta property="og:image" content={`${DEFAULT_SITE_URL}${DEFAULT_IMAGE}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${DEFAULT_SITE_URL}${DEFAULT_IMAGE}`} />
      
      {/* Technical SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
}