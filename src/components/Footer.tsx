import { Dumbbell } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Footer() {
  const { content, services } = useContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <span className="font-bold text-xl tracking-tighter">FITCOACH</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Transform your body and life with expert personal training and science-based coaching.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Pricing'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-zinc-500 hover:text-orange-500 text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-3 text-zinc-500 text-sm">
              {services.slice(0, 4).map(s => <li key={s.id}>{s.title}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact</h4>
            <div className="space-y-4 text-sm text-zinc-500 leading-relaxed">
              <p>{content["contact.email"]}</p>
              <p>{content["contact.display_phone"]}</p>
              <p className="whitespace-pre-line">{content["contact.address"]}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-600 uppercase tracking-widest">
          <p>© {currentYear} FITCOACH. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}