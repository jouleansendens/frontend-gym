import { Star, Quote } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Testimonials() {
  const { testimonials, content, isLoading } = useContent();

  // Ambil pengaturan jumlah dari admin, default 3
  const displayCount = parseInt(content["testimonial.display_count"] || "3");

  // ✅ Show Loading Skeleton
  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-4 w-32 bg-zinc-800 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-zinc-800 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 animate-pulse">
                <div className="w-10 h-10 bg-zinc-800 rounded mb-4" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-4 h-4 bg-zinc-800 rounded-full" />)}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-zinc-800 rounded w-full" />
                  <div className="h-4 bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-800 rounded w-5/6" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full" />
                  <div>
                    <div className="h-4 w-32 bg-zinc-800 rounded mb-2" />
                    <div className="h-3 w-20 bg-zinc-800 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ✅ Filter hanya testimonial yang VISIBLE (is_active = 1 atau true)
  const activeTestimonials = testimonials
    .filter(t => {
      // Backend mungkin kirim is_active sebagai 0/1, true/false, atau "0"/"1"
      const isActive = t.is_active ?? t.isActive;

      // Convert to string untuk comparison yang konsisten
      const activeStr = String(isActive);

      // Only show if is_active = 1 or true
      return activeStr === "1" || activeStr === "true";
    })
    .slice(0, displayCount);

  // Jika tidak ada testimonial aktif, jangan render section ini sama sekali
  if (activeTestimonials.length === 0) {
    return null;
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
                {/* Support: http URLs, base64, relative paths */}
                <img
                  src={
                    t.image && (t.image.startsWith('http') || t.image.startsWith('data:') || t.image.startsWith('/'))
                      ? t.image
                      : 'https://via.placeholder.com/150'
                  }
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