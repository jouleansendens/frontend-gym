import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, Instagram, Facebook, Youtube, Linkedin, Twitter,
  Send, CheckCircle2, Clock, MessageSquare, Music2
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { toast } from 'sonner';
import { Editable } from './editor/Editable';

// Custom X Logo Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Contact() {
  const { addMessage, content, updateContent, isEditMode } = useContent();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', goal: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- Konfigurasi Sosial Media Dinamis ---
  const socialPlatforms = [
    { key: "social.instagram", enableKey: "social.instagram.enabled", icon: Instagram, label: "Instagram", color: "pink" },
    { key: "social.facebook", enableKey: "social.facebook.enabled", icon: Facebook, label: "Facebook", color: "blue" },
    { key: "social.youtube", enableKey: "social.youtube.enabled", icon: Youtube, label: "YouTube", color: "red" },
    { key: "social.tiktok", enableKey: "social.tiktok.enabled", icon: Music2, label: "TikTok", color: "white" },
    { key: "social.linkedin", enableKey: "social.linkedin.enabled", icon: Linkedin, label: "LinkedIn", color: "blue" },
    { key: "social.twitter", enableKey: "social.twitter.enabled", icon: XIcon, label: "X (Twitter)", color: "white" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send('service_abc123', 'template_qa3oyki', {
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        goal: formData.goal,
        message: formData.message
      }, 'cplkSAid9u0DW0gOM');

      addMessage(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Pesan berhasil dikirim!");
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', goal: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Gagal mengirim email.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Background Elements (TETAP SAMA) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 md:-left-48 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 md:-right-48 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Removed per Request */}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Sisi Kiri: Informasi Kontak */}
          <div className="lg:col-span-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">

              {/* Email Block */}
              <div className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 hover:border-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-500/10 text-orange-400">
                    <Mail className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 md:mb-2 text-xs md:text-sm">Email Us</h4>
                    <Editable id="contact.email" className="text-zinc-400 text-xs md:text-sm break-all" defaultText="coach@fitcoach.com" />
                  </div>
                </div>
              </div>

              {/* Call Block */}
              <div className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 hover:border-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-500/10 text-blue-400">
                    <Phone className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 md:mb-2 text-xs md:text-sm">Call Us</h4>
                    <Editable id="contact.phone" className="text-zinc-400 text-xs md:text-sm" defaultText="+1 (234) 567-890" />
                  </div>
                </div>
              </div>

              {/* Visit Block */}
              <div className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 hover:border-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-500/10 text-green-400">
                    <MapPin className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 md:mb-2 text-xs md:text-sm">Visit Us</h4>
                    <Editable id="contact.address" type="textarea" className="text-zinc-400 text-xs md:text-sm whitespace-pre-line" defaultText="123 Fitness Street\nLos Angeles, CA 90001" />
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Block (DINAMIS) */}
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-400" strokeWidth={2} />
                </div>
                <h4 className="font-semibold text-white text-sm md:text-base">Working Hours</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-zinc-400">Mon - Fri</span>
                  <Editable id="contact.hours.mon_fri" className="text-xs text-white font-medium" defaultText="6:00 AM - 10:00 PM" />
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-zinc-400">Saturday</span>
                  <Editable id="contact.hours.sat" className="text-xs text-white font-medium" defaultText="8:00 AM - 8:00 PM" />
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-zinc-400">Sunday</span>
                  <Editable id="contact.hours.sun" className="text-xs text-white font-medium" defaultText="9:00 AM - 6:00 PM" />
                </div>
              </div>
            </div>

            {/* Connect With Us Block (DINAMIS) */}
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-center">
              <h4 className="font-semibold text-white mb-4 text-sm md:text-base">Connect With Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialPlatforms.map((platform, idx) => {
                  const url = content[platform.key];
                  const isEnabled = content[platform.enableKey] !== "false"; // Default true if not set

                  // Di halaman publik, ikon akan hilang jika toggle disabled atau link kosong
                  if ((!url || !isEnabled) && !isEditMode) return null;

                  return (
                    <div key={idx} className="relative group/social">
                      <a
                        href={url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-300 
                        ${!url || !isEnabled ? 'opacity-20 grayscale' : 'hover:text-white hover:scale-110'} 
                        ${platform.color === 'pink' ? 'hover:bg-pink-500 hover:border-pink-500' :
                            platform.color === 'blue' ? 'hover:bg-blue-500 hover:border-blue-500' :
                              platform.color === 'white' ? 'hover:bg-white hover:border-white hover:!text-black' :
                                'hover:bg-red-500 hover:border-red-500'}`}
                      >
                        <platform.icon className="w-5 h-5" strokeWidth={2} />
                      </a>

                      {/* Input URL hanya muncul saat Admin Mode diaktifkan */}
                      {isEditMode && (
                        <div className="absolute -top-10 left-0 w-32 bg-zinc-800 text-[10px] text-white p-1 rounded border border-orange-500 z-50 shadow-xl opacity-0 group-hover/social:opacity-100 transition-opacity">
                          <input
                            type="text"
                            placeholder={`Link ${platform.label}`}
                            value={url || ""}
                            onChange={(e) => updateContent(platform.key, e.target.value)}
                            className="w-full bg-transparent outline-none p-0.5"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Form (TETAP SAMA SEPERTI AWAL) */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Send us a Message</h3>
                <p className="text-zinc-400 text-sm mb-6 md:mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Bagian Input Form tetap identik dengan kode lama Anda */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs md:text-sm font-medium text-zinc-300">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs md:text-sm font-medium text-zinc-300">Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                    </div>
                  </div>
                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs md:text-sm font-medium text-zinc-300">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs md:text-sm font-medium text-zinc-300">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                    </div>
                  </div>
                  {/* Goal */}
                  <div className="space-y-2">
                    <label className="block text-xs md:text-sm font-medium text-zinc-300">Fitness Goal *</label>
                    <select name="goal" value={formData.goal} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all appearance-none cursor-pointer">
                      <option value="" className="bg-zinc-900">Select your goal</option>
                      <option value="weight-loss" className="bg-zinc-900">Weight Loss</option>
                      <option value="muscle-gain" className="bg-zinc-900">Muscle Gain</option>
                    </select>
                  </div>
                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-xs md:text-sm font-medium text-zinc-300">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all resize-none" />
                  </div>

                  <button type="submit" disabled={isSubmitting || submitted} className="w-full h-12 md:h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group overflow-hidden">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : submitted ? (
                      <><CheckCircle2 className="w-5 h-5" /><span>Sent!</span></>
                    ) : (
                      <><span className="text-sm">Send Message</span><Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}