import { Star, Quote } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Testimonials() {
  const { testimonials, content } = useContent();
  
  // Ambil pengaturan jumlah dari admin, default 3
  const displayCount = parseInt(content["testimonial.display_count"] || "3");

  // ✅ Perbaikan: Cek is_active (sesuai SQL) atau isActive
  const activeTestimonials = testimonials
    .filter(t => t.is_active === 1 || t.is_active === true || t.isActive === true)
    .slice(0, displayCount);

  // Ubah null menjadi pesan debug sementara jika data tidak muncul
  if (activeTestimonials.length === 0) {
    return (
      <div className="py-10 text-center text-white/20 bg-zinc-950">
        No active testimonials found in database.
      </div>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-orange-500 uppercase tracking-wider text-sm font-medium">Success Stories</span>
          <h2 className="text-white mt-2 mb-4 text-3xl md:text-4xl font-bold">What Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTestimonials.map((t) => (
            <div key={t.id} className="bg-black/40 border border-white/10 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
              <Quote className="w-10 h-10 text-orange-500/30 mb-4" />
              <div className="flex gap-1 mb-4">
                {/* Gunakan t.rating dari DB */}
                {[...Array(Number(t.rating) || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                {/* Fallback image jika image dari DB kosong */}
                <img 
                  src={t.image && t.image.startsWith('http') ? t.image : 'https://via.placeholder.com/150'} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}