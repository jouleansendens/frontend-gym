import { useContent } from '../context/ContentContext';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export function Contact() {
  const { content } = useContent();

  // Settings from Admin Panel
  // Using explicit "0" check for robust string/number handling
  const isFormEnabled = content["contact_form_visibility"] !== "0";
  const isInfoEnabled = content["contact_info_visibility"] !== "0";

  // If both are disabled, hide the entire section
  if (!isFormEnabled && !isInfoEnabled) {
    return null;
  }

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 md:-left-48 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 md:-right-48 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Dynamic Width: max-w-7xl if Form present (2 column split), max-w-5xl if Info only (Center View) */}
        <div className={`grid gap-6 md:gap-8 mx-auto ${(isInfoEnabled && isFormEnabled) ? 'max-w-7xl grid-cols-1 lg:grid-cols-3' : 'max-w-5xl grid-cols-1'}`}>

          {/* Contact Info Section */}
          {isInfoEnabled && (
            <div className={`${isFormEnabled ? 'lg:col-span-1' : 'w-full'}`}>
              <ContactInfo
                fullWidth={!isFormEnabled}
              />
            </div>
          )}

          {/* Message Form Section */}
          {isFormEnabled && (
            <div className={`${isInfoEnabled ? 'lg:col-span-2' : 'w-full max-w-4xl mx-auto'}`}>
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}