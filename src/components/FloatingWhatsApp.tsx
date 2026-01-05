import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function FloatingWhatsApp() {
    const { content } = useContent();
    const phoneNumber = content['contact.phone'] || '';
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show after 2 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
            setShowTooltip(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const formatPhoneNumber = (phone: string) => {
        let formatted = phone.replace(/\D/g, '');
        if (formatted.startsWith('0')) {
            formatted = '62' + formatted.slice(1);
        }
        return formatted;
    };

    const handleClick = () => {
        if (!phoneNumber) return;
        const formattedPhone = formatPhoneNumber(phoneNumber);
        // Direct chat NO message template per user request
        const whatsappUrl = `https://wa.me/${formattedPhone}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!phoneNumber) return null;

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-transform duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

            {/* Tooltip Chat Bubble */}
            {showTooltip && (
                <div className="bg-white text-zinc-900 px-4 py-2 rounded-xl rounded-br-none shadow-lg mb-1 animate-bounce max-w-[200px] border border-zinc-100 relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                        className="absolute -top-1 -left-1 bg-zinc-200 rounded-full p-0.5 hover:bg-zinc-300"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    <p className="text-sm font-medium">Ada pertanyaan? Chat langsung di sini! 👋</p>
                </div>
            )}

            {/* Main Button */}
            <button
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300"
                aria-label="Chat WhatsApp"
            >
                {/* Pulse Effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-ping"></span>

                {/* Icon */}
                <MessageCircle className="w-7 h-7 text-white fill-white/20" />

                {/* Notif Badge (Gimmick) */}
                <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white font-bold items-center justify-center">1</span>
                </span>
            </button>
        </div>
    );
}
