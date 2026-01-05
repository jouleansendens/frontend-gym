import { Award, Target, Heart, Zap, Camera } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Editable } from './editor/Editable';
import { useRef, useState } from 'react'; // Tambah useState
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'; // Import Dialog

export function About() {
  const { content, images, updateImage, isEditMode } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State untuk mengontrol terbukanya Modal
  const [isBioOpen, setIsBioOpen] = useState(false);

  const values = [
    { icon: Target, titleId: 'about.value1.title', descId: 'about.value1.desc', defaultTitle: 'Results-Driven', defaultDesc: 'Every program is designed with your specific goals in mind.' },
    { icon: Heart, titleId: 'about.value2.title', descId: 'about.value2.desc', defaultTitle: 'Client-Focused', defaultDesc: 'Your success and wellbeing are my top priorities.' },
    { icon: Zap, titleId: 'about.value3.title', descId: 'about.value3.desc', defaultTitle: 'Science-Based', defaultDesc: 'Evidence-based training methods for optimal results.' },
    { icon: Award, titleId: 'about.value4.title', descId: 'about.value4.desc', defaultTitle: 'Certified Expert', defaultDesc: 'Fully certified with ongoing education in fitness science.' },
  ];

  const handleImageClick = () => {
    if (isEditMode) fileInputRef.current?.click();
  };

  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* KOLOM KIRI: GAMBAR DENGAN FITUR UPLOAD */}
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-3xl transform translate-x-4 translate-y-4" />

            <div
              className={`relative rounded-3xl overflow-hidden border border-white/10 ${isEditMode ? 'cursor-pointer hover:border-orange-500 transition-all' : ''}`}
              onClick={handleImageClick}
            >
              <img
                src={images['about_image'] || 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?w=1080'}
                alt="About Coach"
                className={`w-full h-[500px] object-cover ${isEditMode ? 'opacity-50 group-hover:opacity-30' : ''}`}
                loading="lazy"
              />

              {isEditMode && (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-12 h-12 text-orange-500 mb-2" />
                  <span className="text-sm font-bold bg-orange-500 px-3 py-1 rounded-full text-white">Ganti Foto About</span>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) updateImage('about_image', file);
                }}
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-orange-500 rounded-2xl p-6 max-w-xs z-10 shadow-2xl">
              <Editable id="about.card.title" as="h4" className="text-white mb-2 font-bold text-lg" defaultText="Transformation Guarantee" />
              <Editable id="about.card.desc" as="p" className="text-white/90 text-sm leading-relaxed" defaultText="See real results in 12 weeks or get personalized adjustments at no extra cost." />
            </div>
          </div>

          {/* KOLOM KANAN: TEKS EDITABLE */}
          <div>
            <Editable id="about.label" as="span" className="text-orange-500 uppercase tracking-wider text-sm font-medium" defaultText="About Me" />

            <Editable
              id="about.title"
              as="h2"
              type="textarea"
              className="text-white mt-2 mb-6 text-3xl md:text-4xl font-bold leading-tight"
              defaultText="Your Partner in Fitness Excellence"
            />

            <Editable
              id="about.desc1"
              as="p"
              type="textarea"
              className="text-white/70 mb-6 leading-relaxed whitespace-pre-line"
              defaultText="With over 10 years of experience in personal training and fitness coaching, I've helped hundreds of clients achieve their fitness goals."
            />

            <Editable
              id="about.desc2"
              as="p"
              type="textarea"
              className="text-white/70 mb-8 leading-relaxed whitespace-pre-line"
              defaultText="My approach combines proven training methodologies with personalized attention to ensure you maintain results for life."
            />

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="bg-orange-500/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <Editable id={value.titleId} as="h4" className="text-white mb-1 font-bold" defaultText={value.defaultTitle} />
                      <Editable id={value.descId} as="p" className="text-white/60 text-sm leading-relaxed" defaultText={value.defaultDesc} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tombol yang memicu Modal jika tidak dalam mode edit */}
            <button
              onClick={() => !isEditMode && setIsBioOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-colors font-medium"
            >
              <Editable id="about.button" as="span" defaultText="Learn More About Me" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL DETAIL CERITA (DINAMIS) --- */}
      <Dialog open={isBioOpen} onOpenChange={setIsBioOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-orange-500">
              <Editable id="about.modal_title" defaultText="My Fitness Journey" />
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <Editable
              id="about.modal_content"
              as="p"
              type="textarea"
              className="text-white/70 leading-relaxed text-lg whitespace-pre-line"
              defaultText="I started this journey because I believe everyone deserves to feel strong and confident. My professional experience span over a decade..."
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
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