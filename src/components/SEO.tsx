import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

const SEO = ({ title, description, canonical, image }: SEOProps) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://trainwithbraden.com';
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const fullTitle = `${title} | Train with Braden`;

  // Keyword super lengkap untuk menjaring traffic organic
  const keywords = "coach gym, personal trainer indonesia, training 1 on 1, coach gym online, best fitness coach, pelatih fitness jakarta, program diet, muscle gain program, weight loss coach, pelatih gym privat, gym coaching services, personal training near me, fitness mentor, bimbingan fitness online, transformation coach, fitness coach profesional, instruktur gym pribadi, paket latihan fitness, bimbingan angkat beban, fat loss program, coach fitness bersertifikat, home workout coach, online bodybuilding coach, jasa trainer fitness, pelatih olahraga privat, program kesehatan tubuh, lifestyle coaching, coach gym harian, training fitness intensif, fitness program for beginners, advanced weight training";

  // Structured Data (JSON-LD) agar Google menampilkan 'Rich Results' (Bintang, Harga, Lokasi)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Train with Braden",
    "image": image || `${siteUrl}/logo.png`,
    "description": description,
    "priceRange": "$$",
    "telephone": "+6281234567890", // Ganti dengan nomor asli
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    },
    // Geo coordinates membantu Local SEO (muncul di Google Maps)
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "url": siteUrl,
    "sameAs": [
      "https://instagram.com/trainwithbraden",
      "https://facebook.com/trainwithbraden",
      "https://youtube.com/@trainwithbraden"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook (Agar link preview bagus saat di-share) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || `${siteUrl}/og-image.jpg`} />

      {/* Twitter Cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image || `${siteUrl}/og-image.jpg`} />

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Admin Pages NoIndex */}
      {typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Helmet>
  );
};

export default SEO;