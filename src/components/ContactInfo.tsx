import {
    Mail, Phone, MapPin, Instagram, Facebook, Youtube, Linkedin, Music2
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Editable } from './editor/Editable';

// Custom X Logo Component
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

interface ContactInfoProps {
    className?: string;
    fullWidth?: boolean;
}

export function ContactInfo({ className, fullWidth = false }: ContactInfoProps) {
    const { content, updateContent, isEditMode } = useContent();

    const socialPlatforms = [
        { key: "social.instagram", enableKey: "social.instagram.enabled", icon: Instagram, label: "Instagram", color: "pink" },
        { key: "social.facebook", enableKey: "social.facebook.enabled", icon: Facebook, label: "Facebook", color: "blue" },
        { key: "social.youtube", enableKey: "social.youtube.enabled", icon: Youtube, label: "YouTube", color: "red" },
        { key: "social.tiktok", enableKey: "social.tiktok.enabled", icon: Music2, label: "TikTok", color: "white" },
        { key: "social.linkedin", enableKey: "social.linkedin.enabled", icon: Linkedin, label: "LinkedIn", color: "blue" },
        { key: "social.twitter", enableKey: "social.twitter.enabled", icon: XIcon, label: "X (Twitter)", color: "white" },
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Grid wrapper for responsive layout - adapts if fullWidth is true */}
            <div className={`grid grid-cols-1 ${fullWidth ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-1'} gap-4`}>

                {/* Email Block */}
                <div className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-500/10 text-orange-400">
                            <Mail className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white mb-1 md:mb-2 text-xs md:text-sm">Email Us</h4>
                            <Editable id="contact.email" className="text-zinc-400 text-xs md:text-sm break-all" defaultText="coach@fitcoach.com" />
                        </div>
                    </div>
                </div>

                {/* Call Block */}
                <div className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-500/10 text-blue-400">
                            <Phone className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white mb-1 md:mb-2 text-xs md:text-sm">Call Us</h4>
                            <Editable id="contact.phone" className="text-zinc-400 text-xs md:text-sm" defaultText="+1 (234) 567-890" />
                        </div>
                    </div>
                </div>

                {/* Visit Block */}
                <div className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-500/10 text-green-400">
                            <MapPin className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white mb-1 md:mb-2 text-xs md:text-sm">Visit Us</h4>
                            <Editable id="contact.address" type="textarea" className="text-zinc-400 text-xs md:text-sm whitespace-pre-line" defaultText="123 Fitness Street\nLos Angeles, CA 90001" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid for Hours/Socials if fullWidth */}
            <div className={`grid grid-cols-1 ${fullWidth ? 'md:grid-cols-3' : ''} gap-6`}>
                {/* Working Hours Block */}
                <div className={`bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 ${fullWidth ? 'md:col-span-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                        {/* ... (Working hours icon logic) ... */}
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        </div>
                        <h4 className="font-semibold text-white text-sm md:text-base">Working Hours</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-xs text-zinc-400">Mon - Fri</span>
                            <Editable id="contact.hours.mon_fri" className="text-xs text-white font-medium" defaultText="6:00 AM - 10:00 PM" />
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-xs text-zinc-400">Saturday</span>
                            <Editable id="contact.hours.sat" className="text-xs text-white font-medium" defaultText="8:00 AM - 8:00 PM" />
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-zinc-400">Sunday</span>
                            <Editable id="contact.hours.sun" className="text-xs text-white font-medium" defaultText="9:00 AM - 6:00 PM" />
                        </div>
                    </div>
                </div>

                {/* Connect With Us Block */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col justify-center">
                    <h4 className="font-semibold text-white mb-4 text-sm md:text-base">Connect With Us</h4>
                    <div className={fullWidth ? "grid grid-cols-2 gap-3" : "flex flex-wrap gap-3"}>
                        {socialPlatforms.map((platform, idx) => {
                            const url = content[platform.key];
                            const isEnabled = content[platform.enableKey] !== "false";

                            if ((!url || !isEnabled) && !isEditMode) return null;

                            return (
                                <div key={idx} className={`relative ${fullWidth ? "w-full group" : "group/social"}`}>
                                    <a
                                        href={url || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`
                                            flex items-center transition-all duration-300 border border-white/10
                                            ${!url || !isEnabled ? 'opacity-20 grayscale' : ''}
                                            ${fullWidth
                                                ? 'gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 w-full'
                                                : 'justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl hover:scale-110'
                                            }
                                            ${platform.color === 'pink' ? 'hover:border-pink-500 hover:text-pink-500' :
                                                platform.color === 'blue' ? 'hover:border-blue-500 hover:text-blue-500' :
                                                    platform.color === 'white' ? 'hover:border-white hover:text-white' :
                                                        'hover:border-red-500 hover:text-red-500'}
                                            ${!fullWidth && 'text-zinc-400'}
                                            ${fullWidth && 'text-zinc-300'}
                                        `}
                                    >
                                        <platform.icon className={`w-5 h-5 flex-shrink-0`} strokeWidth={2} />
                                        {fullWidth && (
                                            <span className="text-xs md:text-sm font-medium truncate">{platform.label}</span>
                                        )}
                                    </a>

                                    {isEditMode && (
                                        <div className={`absolute z-50 shadow-xl opacity-0 hover:opacity-100 transition-opacity bg-zinc-800 p-1 rounded border border-orange-500
                                            ${fullWidth ? 'top-full left-0 w-full mt-1' : '-top-10 left-0 w-32'}
                                        `}>
                                            <input
                                                type="text"
                                                placeholder={`Link ${platform.label}`}
                                                value={url || ""}
                                                onChange={(e) => updateContent(platform.key, e.target.value)}
                                                className="w-full bg-transparent outline-none p-0.5 text-[10px] text-white"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
