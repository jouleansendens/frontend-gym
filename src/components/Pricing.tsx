import { Check, Sparkles, Zap } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export function Pricing() {
  const { pricing, content } = useContent();

  // --- HELPER TO FORMAT CURRENCY ---
  const formatIDR = (price: any) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  // --- HELPER TO SAFELY PARSE FEATURES (from database may be string or array) ---
  const parseFeatures = (features: any): string[] => {
    if (Array.isArray(features)) return features;
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return features.split(',').map((f: string) => f.trim()).filter(Boolean);
      }
    }
    return [];
  };

  // --- WHATSAPP LOGIC WITH ADMIN CONFIGURATION ---
  const handlePlanClick = (plan: any) => {
    const phoneNumber = content["contact.phone"] || "6281234567890";

    // Default Message Template
    let messageTemplate = content["contact.wa_template"] || "Hello Coach, I'm interested in the *{name}* package for {price}/{period}. Could you provide more details?";

    let message = messageTemplate.replace(/{name}/g, plan.name);
    // ✅ Updated to include Rp symbol and thousand separators in WhatsApp message
    message = message.replace(/{price}/g, `Rp${formatIDR(plan.price)}`);
    message = message.replace(/{period}/g, plan.period);

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 bg-black relative">

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest">
            <Zap className="w-3 h-3" />
            Investment Plans
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
            Choose Your Training Plan
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            The best investment for your long-term health and peak performance.
          </p>
        </div>

        {/* Carousel Area */}
        {pricing.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            No pricing plans available. Add plans from the admin panel!
          </div>
        ) : (
          <div className="relative px-4 w-full max-w-[1200px] mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6 pt-20 pb-10">
                {pricing.map((plan) => (
                  <CarouselItem
                    key={plan.id}
                    className="pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="h-full pt-2">
                      <div
                        className={`h-full flex flex-col rounded-[2rem] p-8 relative transition-all duration-300 ${plan.popular
                          ? 'bg-zinc-900 border border-orange-500/50 shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)] scale-100'
                          : 'bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-900/60 backdrop-blur-sm'
                          }`}
                      >
                        {/* Most Popular Badge */}
                        {plan.popular && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-max z-20">
                            <div className="relative">
                              <div className="absolute inset-0 bg-orange-500 blur-lg opacity-60 rounded-full scale-110"></div>
                              <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-xl border border-orange-400/30">
                                <Sparkles className="w-3.5 h-3.5 fill-white" />
                                Most Popular
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Card Header */}
                        <div className="text-center mb-8 pt-4">
                          <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white/90'}`}>
                            {plan.name}
                          </h3>
                          <div className="flex items-end justify-center gap-1 mb-3">
                            {/* ✅ Updated Currency Symbol to Rp */}
                            <span className="text-white/40 text-lg mb-1.5 font-medium">Rp</span>
                            <span className="text-5xl font-extrabold tracking-tighter leading-none text-white">
                              {formatIDR(plan.price)}
                            </span>
                            <span className="text-white/40 text-sm mb-1.5 font-medium">/{plan.period.replace('per ', '')}</span>
                          </div>
                          <p className="text-white/50 text-sm leading-relaxed min-h-[40px] px-2 line-clamp-2">
                            {plan.description}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                        {/* Feature List */}
                        <ul className="space-y-4 mb-8 flex-grow">
                          {parseFeatures(plan.features).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-left">
                              <div className={`mt-0.5 p-1 rounded-full flex-shrink-0 ${plan.popular ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/70'
                                }`}>
                                <Check className="w-3 h-3 stroke-[3px]" />
                              </div>
                              <span className="text-white/80 text-sm leading-snug font-medium">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Action Button */}
                        <button
                          onClick={() => handlePlanClick(plan)}
                          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 ${plan.popular
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-[0_5px_30px_-5px_rgba(249,115,22,0.4)] hover:shadow-orange-500/60 hover:-translate-y-1'
                            : 'bg-white text-black hover:bg-zinc-200 shadow-lg hover:shadow-white/20 hover:-translate-y-1'
                            }`}
                        >
                          Choose Plan
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Buttons */}
              <div className="hidden md:block">
                <CarouselPrevious className="-left-16 h-14 w-14 bg-zinc-900/50 border border-white/10 text-white/50 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all backdrop-blur-md z-30" />
                <CarouselNext className="-right-16 h-14 w-14 bg-zinc-900/50 border border-white/10 text-white/50 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all backdrop-blur-md z-30" />
              </div>
            </Carousel>
          </div>
        )}

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-sm">
            Need a consultation before choosing?{' '}
            <a href="#contact" className="text-orange-500 hover:text-orange-400 font-medium transition-colors underline decoration-orange-500/30 underline-offset-4 hover:decoration-orange-500">
              Contact Coach Now
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}