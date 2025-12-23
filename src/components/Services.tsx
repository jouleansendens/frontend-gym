import { useContent } from '../context/ContentContext';
import { User, Users, Video, Dumbbell, Calendar, TrendingUp, Activity, Heart, Zap, Star } from 'lucide-react';

// Mapping String Name ke Komponen Icon
export const iconMap: Record<string, any> = {
  User, Users, Video, Dumbbell, Calendar, TrendingUp, Activity, Heart, Zap, Star
};

export function Services() {
  const { services } = useContent();

  return (
    <section id="services" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-orange-500 uppercase tracking-wider text-sm font-medium">What I Offer</span>
          <h2 className="text-white mt-2 mb-4 text-3xl md:text-4xl font-bold">Coaching Services</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Choose from a variety of training options designed to fit your lifestyle and help you achieve your fitness goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12 text-white/40">
              No services available. Add services from admin panel!
            </div>
          ) : (
            services.map((service) => {
              // Ambil icon dari map, fallback ke Dumbbell jika tidak ditemukan
              const Icon = iconMap[service.iconName] || Dumbbell;
              
              return (
                <div
                  key={service.id}
                  className="bg-black/40 border border-white/10 rounded-2xl p-8 hover:border-orange-500/50 transition-all hover:transform hover:-translate-y-1"
                >
                  <div className="bg-orange-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-orange-500" />
                  </div>
                  
                  <h3 className="text-white mb-3 text-xl font-bold">{service.title}</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-white/50 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}