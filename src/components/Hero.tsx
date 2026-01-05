import { ArrowRight, Play, Camera } from 'lucide-react'; // Tambah icon Camera
import { Editable } from './editor/Editable';
import { useContent } from '../context/ContentContext'; // Tambah ini
import { useRef } from 'react'; // Tambah ini

export function Hero() {
  // Ambil state dan fungsi dari context
  const { images, updateImage, isEditMode } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateImage('hero.bg', file); // 'hero.bg' adalah ID unik untuk gambar ini
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-black">
      {/* Background Image with Overlay */}
      <div className={`absolute inset-0 z-0 ${isEditMode ? 'cursor-pointer group' : ''}`} onClick={handleImageClick}>
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black opacity-90" />
        </div>

        <img
          // Logic: Gunakan gambar dari context jika ada, jika tidak pakai default Unsplash
          src={images['hero.bg'] || "https://images.unsplash.com/photo-1549995546-87cb41aa98a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
          alt="Fitness Coach"
          className={`w-full h-full object-cover opacity-40 transition-all ${isEditMode ? 'group-hover:opacity-60' : ''}`}
          loading="eager"
        />

        {/* Overlay tombol upload saat Mode Edit */}
        {isEditMode && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
              <Camera className="w-5 h-5" />
              Ganti Background Hero
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        {/* Input File Tersembunyi */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Content (Tetap sama seperti sebelumnya) */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* ... isi konten hero ... */}
          <div className="inline-block bg-orange-500/20 border border-orange-500 px-4 py-2 rounded-full mb-6">
            <Editable id="hero.badge" as="span" className="text-orange-500 text-sm font-medium" defaultText="Certified Personal Trainer" />
          </div>

          <Editable id="hero.title" as="h1" type="textarea" className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" defaultText="Transform Your Body, Transform Your Life" />

          <Editable id="hero.subtitle" as="p" type="textarea" className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl" defaultText="Achieve your fitness goals with personalized 1-on-1 coaching." />

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 group font-medium"
            >
              <Editable id="hero.cta_primary" as="span" defaultText="Start Your Journey" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 border border-white/20 font-medium">
              <Play className="w-5 h-5" />
              <Editable id="hero.cta_secondary" as="span" defaultText="Watch Video" />
            </button>
          </div>
          {/* ... stats ... */}
        </div>
      </div>
    </section>
  );
}