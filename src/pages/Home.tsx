import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { CoachBio } from '../components/CoachBio';
import { Pricing } from '../components/Pricing';
import { StepsLeaderboard } from '../components/StepsLeaderboard';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { QuoteBanner } from '../components/QuoteBanner';
// 1. Import komponen SEO yang tadi dibuat
import SEO from '../components/SEO'; 

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      {/* 2. Pasang SEO di sini dengan kata kunci melimpah */}
      <SEO 
        title="Coach Gym & Training 1 on 1 Privat | Train with Braden" 
        description="Program fitness terukur dengan Coach Gym Online dan Training 1 on 1 privat. Fokus pada transformasi tubuh, muscle gain, dan weight loss bersama Coach Braden." 
      />

      <Navbar />
      <Hero />
      <About />
      <QuoteBanner />
      <Services />
      <StepsLeaderboard />
      <CoachBio />
      
      {/* Testimonials untuk social proof */}
      <Testimonials /> 
      
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}