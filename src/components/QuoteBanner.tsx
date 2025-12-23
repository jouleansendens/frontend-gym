import { useContent } from '../context/ContentContext';
// ✅ Perbaikan: Nama package yang benar adalah lucide-react
import { Quote, Type } from 'lucide-react'; 
import { Editable } from './editor/Editable';

export function QuoteBanner() {
  const { content, isEditMode, updateContent } = useContent();

  // Daftar Font Lengkap (20 Pilihan)
  const fontOptions = [
    { name: 'Playfair Display', value: '"Playfair Display", serif' },
    { name: 'Inter (Modern Sans)', value: '"Inter", sans-serif' },
    { name: 'Bebas Neue (Strong)', value: '"Bebas Neue", sans-serif' },
    { name: 'Montserrat (Sporty)', value: '"Montserrat", sans-serif' },
    { name: 'Lora (Classic)', value: '"Lora", serif' },
    { name: 'Poppins (Friendly)', value: '"Poppins", sans-serif' },
    { name: 'Oswald (Bold)', value: '"Oswald", sans-serif' },
    { name: 'Dancing Script', value: '"Dancing Script", cursive' },
    { name: 'Cinzel (Royal)', value: '"Cinzel", serif' },
    { name: 'Anton (Impact)', value: '"Anton", sans-serif' },
    { name: 'Merriweather', value: '"Merriweather", serif' },
    { name: 'Pacifico (Retro)', value: '"Pacifico", cursive' },
    { name: 'Righteous', value: '"Righteous", sans-serif' },
    { name: 'Fira Code', value: '"Fira Code", monospace' },
    { name: 'Abril Fatface', value: '"Abril Fatface", serif' },
    { name: 'Cormorant Garamond', value: '"Cormorant Garamond", serif' },
    { name: 'Roboto Condensed', value: '"Roboto Condensed", sans-serif' },
    { name: 'Oswald (Light)', value: '"Oswald", sans-serif' },
    { name: 'System Default', value: 'system-ui, sans-serif' },
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden flex items-center justify-center border-y border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        
        {/* FONT SELECTOR (Hanya muncul saat Mode Edit) */}
        {isEditMode && (
          <div className="mb-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-3 bg-zinc-900/90 border border-orange-500/40 p-2 rounded-2xl backdrop-blur-xl shadow-2xl">
              <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                <Type className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <label className="text-[9px] text-orange-500 font-black uppercase tracking-widest ml-1 mb-0.5">Tipografi</label>
                <select 
                  value={content["quote.font"] || fontOptions[0].value}
                  onChange={(e) => updateContent("quote.font", e.target.value)}
                  className="bg-transparent text-white text-sm font-bold pr-10 pl-1 py-0.5 focus:ring-0 border-none cursor-pointer"
                >
                  {fontOptions.map(font => (
                    <option key={font.value} value={font.value} className="bg-zinc-900 text-white">
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto group relative">
          <Quote className="absolute -top-24 -left-8 w-40 h-40 text-orange-500/5 rotate-180 pointer-events-none" />
          
          {/* Quote Text */}
          <Editable 
            id="quote.text"
            as="h3"
            type="textarea"
            defaultText="The only bad workout is the one that didn't happen."
            style={{ fontFamily: content["quote.font"] || fontOptions[0].value }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight relative z-10 italic"
          />
          
          <Quote className="absolute -bottom-24 -right-8 w-40 h-40 text-orange-500/5 pointer-events-none" />
        </div>

        {/* Author Line */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          <Editable 
            id="quote.author"
            as="span"
            defaultText="— COACH FITCOACH"
            className="text-orange-500 font-black tracking-[0.4em] text-xs md:text-sm uppercase opacity-80"
          />
        </div>
      </div>
    </section>
  );
}