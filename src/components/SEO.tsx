import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
}

const SEO = ({ title, description }: SEOProps) => {
const keywords = "coach gym, personal trainer indonesia, training 1 on 1, coach gym online, best fitness coach, pelatih fitness jakarta, program diet, muscle gain program, weight loss coach, pelatih gym privat, gym coaching services, personal training near me, fitness mentor, bimbingan fitness online, transformation coach, fitness coach profesional, instruktur gym pribadi, paket latihan fitness, bimbingan angkat beban, fat loss program, coach fitness bersertifikat, home workout coach, online bodybuilding coach, jasa trainer fitness, pelatih olahraga privat, program kesehatan tubuh, lifestyle coaching, coach gym harian, training fitness intensif, fitness program for beginners, advanced weight training";
  return (
    <Helmet>
      {/* 1. Nama Brand ditaruh di depan agar terlihat di tab browser */}
      <title>Train with Braden | {title}</title>
      
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* 2. Logika Noindex untuk Admin tetap dipertahankan */}
      {window.location.pathname.startsWith('/admin') && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {/* 3. Update Social Media Meta agar sinkron */}
      <meta property="og:title" content={`Train with Braden | ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;