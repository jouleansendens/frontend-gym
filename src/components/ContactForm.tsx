import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { toast } from 'sonner';

export function ContactForm() {
    const { addMessage } = useContent();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', goal: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await emailjs.send('service_abc123', 'template_qa3oyki', {
                from_name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                goal: formData.goal,
                message: formData.message
            }, 'cplkSAid9u0DW0gOM');

            addMessage(formData);
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success("Pesan berhasil dikirim!");
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ firstName: '', lastName: '', email: '', phone: '', goal: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
            toast.error("Gagal mengirim email.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

            <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Send us a Message</h3>
                <p className="text-zinc-400 text-sm mb-6 md:mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs md:text-sm font-medium text-zinc-300">First Name *</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs md:text-sm font-medium text-zinc-300">Last Name *</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs md:text-sm font-medium text-zinc-300">Email Address *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs md:text-sm font-medium text-zinc-300">Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-medium text-zinc-300">Fitness Goal *</label>
                        <select name="goal" value={formData.goal} onChange={handleChange} required className="w-full h-11 md:h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all appearance-none cursor-pointer">
                            <option value="" className="bg-zinc-900">Select your goal</option>
                            <option value="weight-loss" className="bg-zinc-900">Weight Loss</option>
                            <option value="muscle-gain" className="bg-zinc-900">Muscle Gain</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-medium text-zinc-300">Message *</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting || submitted} className="w-full h-12 md:h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group overflow-hidden">
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : submitted ? (
                            <><CheckCircle2 className="w-5 h-5" /><span>Sent!</span></>
                        ) : (
                            <><span className="text-sm">Send Message</span><Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" /></>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
