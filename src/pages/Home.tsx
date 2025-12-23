import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { CoachBio } from '../components/CoachBio';
import { Pricing } from '../components/Pricing';
import { StepsLeaderboard } from '../components/StepsLeaderboard';
import { Testimonials } from '../components/Testimonials'; // ✅ Import Testimonials
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { QuoteBanner } from '../components/QuoteBanner';

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <QuoteBanner />
      <Services />
      <StepsLeaderboard />
      <CoachBio />
      
      {/* ✅ Tambahkan Testimonials di sini untuk membangun social proof sebelum harga */}
      <Testimonials /> 
      
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}