import { ArrowRight, Camera, Award, FileCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Editable } from './editor/Editable';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'; // Pastikan path ini sesuai dengan struktur project Anda

export function CoachBio() {
  // Ambil state dan fungsi dari context
  const { content, images, updateImage, isEditMode, certificates } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State untuk mengontrol terbukanya Modal Bio
  const [isBioOpen, setIsBioOpen] = useState(false);

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateImage('coach.image', file);
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Kolom Kiri: Gambar Coach */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
            
            <div 
              className={`relative rounded-2xl overflow-hidden border border-white/10 h-[600px] w-full group ${isEditMode ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            >
              <img 
                src={images['coach.image'] || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1080"} 
                alt="Coach" 
                className={`w-full h-full object-cover grayscale transition duration-700 ${isEditMode ? 'group-hover:opacity-50' : 'hover:grayscale-0'}`}
              />

              {isEditMode && (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                    <Camera className="w-5 h-5" />
                    Ganti Foto Coach
                  </div>
                </div>
              )}

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Kolom Kanan: Teks Bio */}
          <div className="w-full md:w-1/2">
            <Editable 
              id="coach.label"
              as="span"
              className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2 block"
              defaultText="Meet Your Coach"
            />
            
            <Editable 
              id="coach.title"
              as="h2"
              type="textarea"
              className="text-white font-bold text-4xl md:text-6xl mb-6 leading-none"
              defaultText="Your Partner in Fitness Excellence"
            />
            
            <Editable 
              id="coach.desc1"
              as="p"
              type="textarea"
              className="text-white/60 mb-6 leading-relaxed text-lg"
              defaultText="With over 10 years of experience in personal training, I help people transform their lives through sustainable fitness."
            />
            
            <Editable 
              id="coach.desc2"
              as="p"
              type="textarea"
              className="text-white/60 mb-8 leading-relaxed text-lg"
              defaultText="My approach focuses on functional movement and nutrition tailored to your lifestyle."
            />
            
            {/* Sertifikasi Ringkasan (Statis di Landing Page) */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="border-l-2 border-orange-500 pl-4">
                <Editable 
                  id="coach.cert1.title"
                  as="h4"
                  className="font-bold text-2xl text-white"
                  defaultText="NASM"
                />
                <Editable 
                  id="coach.cert1.desc"
                  as="p"
                  className="text-xs text-white/40 uppercase tracking-wider"
                  defaultText="Certified Personal Trainer"
                />
              </div>
              <div className="border-l-2 border-orange-500 pl-4">
                <Editable 
                  id="coach.cert2.title"
                  as="h4"
                  className="font-bold text-2xl text-white"
                  defaultText="PN1"
                />
                <Editable 
                  id="coach.cert2.desc"
                  as="p"
                  className="text-xs text-white/40 uppercase tracking-wider"
                  defaultText="Nutrition Coach"
                />
              </div>
            </div>

            {/* Tombol Pemicu Modal Bio & Sertifikat */}
            <div 
              onClick={() => !isEditMode && setIsBioOpen(true)}
              className="flex items-center gap-2 text-white font-bold hover:text-orange-500 transition-colors cursor-pointer group"
            >
              <Editable 
                id="coach.link" 
                as="span" 
                defaultText="Read My Full Story"
              />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL BIO & DAFTAR SERTIFIKAT DINAMIS --- */}
      <Dialog open={isBioOpen} onOpenChange={setIsBioOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-3xl max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-orange-500 flex items-center gap-2">
              <Award /> Full Professional Biography
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 py-6">
            {/* Bagian Cerita (Editable di Admin Panel) */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4">The Journey</h4>
              <Editable 
                id="about.modal_content" 
                as="p" 
                type="textarea" 
                className="text-white/80 leading-relaxed text-lg whitespace-pre-line" 
                defaultText="Write your full professional story here..."
              />
            </div>

            {/* Bagian Daftar Sertifikat Dinamis */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4">Credentials & Certifications</h4>
              {certificates && certificates.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center gap-4 group/cert hover:border-orange-500/30 transition-colors">
                      <div className="bg-orange-500/10 p-3 rounded-lg">
                        <FileCheck className="text-orange-500 w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{cert.name}</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-tighter">{cert.issuer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/20 italic text-sm">No additional certificates listed yet.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5 mt-4">
            <button 
              onClick={() => setIsBioOpen(false)}
              className="text-white/40 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}