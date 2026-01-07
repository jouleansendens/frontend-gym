import { Helmet } from 'react-helmet-async';
import { useContent } from '../context/ContentContext';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

const SEO = ({ title, description, canonical, image }: SEOProps) => {
  const { content, testimonials, faqs } = useContent();

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://trainwithbraden.com';
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const fullTitle = `${title} | ${content['site.name'] || 'Train with Braden'}`;

  // Enhanced keywords for better organic traffic
  const keywords = "personal trainer jakarta, coach gym indonesia, fitness training online, private gym coach, weight loss program, muscle gain training, online bodybuilding coach, certified personal trainer, nutrition coaching, workout plans, home fitness training, gym consultation, fitness transformation, health coaching jakarta, pelatih gym privat, program diet sehat,latihan angkat beban, coach kebugaran bersertifikat";

  // Calculate average rating from testimonials
  const activeTestimonials = testimonials.filter(t => t.isActive || t.is_active);
  const avgRating = activeTestimonials.length > 0
    ? (activeTestimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / activeTestimonials.length).toFixed(1)
    : "4.9";

  // 1. Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": content['site.name'] || "Train with Braden",
    "image": image || `${siteUrl}/og-image.jpg`,
    "description": description,
    "priceRange": "$$",
    "telephone": content['contact.display_phone'] || "+6281234567890",
    "email": content['contact.email'] || "info@trainwithbraden.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": content['contact.address']?.split(',')[0] || "Jakarta",
      "addressRegion": "DKI Jakarta",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "url": siteUrl,
    "sameAs": [
      content['social.instagram'],
      content['social.facebook'],
      content['social.youtube'],
      content['social.linkedin'],
      content['social.twitter']
    ].filter(Boolean),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating,
      "reviewCount": activeTestimonials.length || 150,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // 2. Person Schema (Coach Profile)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": content['coach.title'] || "Braden",
    "jobTitle": content['coach.cert1.desc'] || "Certified Personal Trainer",
    "url": siteUrl,
    "image": image || `${siteUrl}/coach-profile.jpg`,
    "description": content['coach.desc1'] || "Professional fitness coach with over 10 years of experience",
    "worksFor": {
      "@type": "Organization",
      "name": content['site.name'] || "Train with Braden"
    },
    "sameAs": [
      content['social.instagram'],
      content['social.linkedin']
    ].filter(Boolean)
  };

  // 3. FAQPage Schema (for rich snippets)
  const faqPageSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.slice(0, 5).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // 4. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": content['site.name'] || "Train with Braden",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": content['contact.display_phone'] || "+6281234567890",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "English"]
    },
    "sameAs": [
      content['social.instagram'],
      content['social.facebook'],
      content['social.youtube'],
      content['social.linkedin'],
      content['social.twitter']
    ].filter(Boolean)
  };

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Enhanced Meta Tags */}
      <meta name="author" content={content['coach.title'] || "Braden"} />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || `${siteUrl}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content={content['site.name'] || "Train with Braden"} />

      {/* Twitter Cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image || `${siteUrl}/og-image.jpg`} />
      <meta property="twitter:creator" content="@trainwithbraden" />

      {/* Additional SEO Meta */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="apple-mobile-web-app-title" content={content['site.name'] || "Train with Braden"} />

      {/* JSON-LD Schema Markup - Multiple Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(professionalServiceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {faqPageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqPageSchema)}
        </script>
      )}

      {/* Admin Pages NoIndex */}
      {typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Helmet>
  );
};

export default SEO;