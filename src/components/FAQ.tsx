import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function FAQ() {
  const { faqs } = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-lg">Got questions? We've got answers.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              No FAQs available yet. Add FAQs from admin panel!
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all"
                >
                  <button 
                    onClick={() => toggleAccordion(index)} 
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                        openIndex === index ? 'bg-orange-500 text-white' : 'bg-white/5 text-zinc-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`text-lg font-semibold transition-colors ${
                        openIndex === index ? 'text-orange-500' : 'text-white'
                      }`}>
                        {item.question}
                      </span>
                    </div>
                    <div className="text-zinc-500">
                      {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pl-[72px] text-zinc-400 border-t border-white/5 pt-4 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}