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
import SEO from '../components/SEO';
import { useContent } from '../context/ContentContext';

export default function Home() {
  const { sections } = useContent();

  const sectionComponents: Record<string, React.ReactNode> = {
    'Hero': <Hero />,
    'About': <About />,
    'QuoteBanner': <QuoteBanner />,
    'Services': <Services />,
    'StepsLeaderboard': <StepsLeaderboard />,
    'CoachBio': <CoachBio />,
    'Testimonials': <Testimonials />,
    'Pricing': <Pricing />,
    'FAQ': <FAQ />,
    'Contact': <Contact />,
  };

  return (
    <main className="bg-zinc-950 min-h-screen">
      <SEO
        title="Coach Gym & Training 1 on 1 Privat | Train with Braden"
        description="Program fitness terukur dengan Coach Gym Online dan Training 1 on 1 privat. Fokus pada transformasi tubuh, muscle gain, dan weight loss bersama Coach Braden."
      />

      <Navbar />

      {/* Dynamic Sections Rendering */}
      {sections.map(section => {
        if (!section.isVisible) return null;
        return (
          <div key={section.id}>
            {sectionComponents[section.component]}
          </div>
        );
      })}

      <Footer />
    </main>
  );
}