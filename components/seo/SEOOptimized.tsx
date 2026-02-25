import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

export default function SEOOptimized({
  title,
  description,
  image = '/images/og-default.jpg',
  noindex = false,
}: SEOProps) {
  const router = useRouter();
  const url = `https://goldminecomm.net${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* SEO directives */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Goldmine Construction Services',
            url: 'https://goldminecomm.net',
            logo: 'https://goldminecomm.net/images/logo/logo-circular.jpg',
            sameAs: [
              // Social media URLs
            ],
          }),
        }}
      />
    </Head>
  );
}