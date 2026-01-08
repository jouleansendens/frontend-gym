import { useContent } from '../context/ContentContext';
import { Play, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

export function IntroVideo() {
    const { content, isEditMode } = useContent();
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Get video source - SEPARATE keys from Hero modal (use introsection.* instead of intro.*)
    const videoUrl = content["introsection.video_url"] || "";
    const localVideoUrl = content["introsection.video_local"] || "";

    // Auto-convert URL to embed URL (YouTube, TikTok, Instagram)
    const convertToEmbedUrl = (url: string): string => {
        if (!url) return url;

        // Already an embed URL
        if (url.includes('/embed/')) return url;

        // YouTube (Standard & Shorts)
        const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/\s]+)/);
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }

        // Instagram (Post or Reel) -> Append /embed
        if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/')) {
            let cleanUrl = url.split('?')[0];
            // Strip protocol and www to rebuild smoothly
            cleanUrl = cleanUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
            // Force https://www.
            const finalUrl = `https://www.instagram.com/${cleanUrl.split('instagram.com/')[1]}`;

            const urlWithSlash = finalUrl.endsWith('/') ? finalUrl : `${finalUrl}/`;
            return `${urlWithSlash}embed`;
        }

        // TikTok
        const tiktokMatch = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
        if (tiktokMatch) {
            return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
        }

        return url;
    };

    const videoSource = localVideoUrl || convertToEmbedUrl(videoUrl);

    const title = content["introsection.title"] || "Meet Your Coach";
    const description = content["introsection.description"] || "Get to know the person who will guide you on your fitness journey. Watch this short introduction to understand my approach and philosophy.";

    // Stats from content
    const stat1Value = content["introsection.stat1_value"] || "10+";
    const stat1Label = content["introsection.stat1_label"] || "Years Experience";
    const stat2Value = content["introsection.stat2_value"] || "500+";
    const stat2Label = content["introsection.stat2_label"] || "Happy Clients";
    const stat3Value = content["introsection.stat3_value"] || "100%";
    const stat3Label = content["introsection.stat3_label"] || "Dedication";

    // Check if it's an embeddable URL
    // We assume any URL that isn't a direct file (isDirectVideo) and isn't local is an embed if processed by convertToEmbedUrl
    const isEmbedUrl = !localVideoUrl && !videoSource.match(/\.(mp4|webm|ogg|mov)$/i);

    // ✅ Detect Specific Portrait Sources
    const isInstagram = videoSource.includes('instagram.com');
    const isTikTok = videoSource.includes('tiktok.com');
    // Check original URL for shorts since the converted one is generic /embed/
    const isShorts = videoUrl.includes('/shorts/');

    const isPortraitEmbed = isInstagram || isTikTok || isShorts;

    // Check if it's a direct video file
    const isDirectVideo = videoSource.match(/\.(mp4|webm|ogg|mov)$/i) ||
        videoSource.startsWith('data:video') ||
        videoSource.startsWith('blob:');

    // If no video source, hide section (unless in edit mode)
    if (!videoSource && !isEditMode) {
        return null;
    }

    const handlePlayClick = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <section id="intro-video" className="relative py-20 md:py-28 bg-black overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-blue-500/15 to-transparent rounded-full blur-[100px] opacity-50"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Side - Text Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 mb-6 mx-auto lg:mx-0">
                            <Sparkles className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-300 text-xs md:text-sm font-medium uppercase tracking-wider">
                                Personal Introduction
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i === title.split(' ').length - 1 ? 'text-orange-500' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h2>

                        {/* Description */}
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                            {description}
                        </p>

                        {/* Stats/Features - Always Visible in Text Column */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white">{stat1Value}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat1Label}</div>
                            </div>
                            <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white">{stat2Value}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat2Label}</div>
                            </div>
                            <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-500">{stat3Value}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat3Label}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Video Player */}
                    <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
                        <div className="relative group w-full max-w-xl">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-orange-500/30 via-yellow-500/20 to-orange-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

                            {/* Video Container - Smart Layout Logic */}
                            <div className={`relative overflow-hidden shadow-2xl transition-all duration-500 flex flex-col
                                ${isPortraitEmbed ? 'bg-zinc-100' : 'bg-black'}
                                ${(isTikTok || isShorts) ? 'rounded-[2.5rem] border-[6px] border-zinc-950 shadow-orange-500/10 ring-1 ring-white/10 max-w-[340px] mx-auto aspect-[9/16]' : ''}
                                ${isInstagram ? 'rounded-xl border border-zinc-200 max-w-[400px] mx-auto min-h-[600px]' : ''}
                                ${!isPortraitEmbed ? 'rounded-2xl border border-white/10 shadow-orange-500/10 flex justify-center aspect-video' : ''}
                            `}>
                                {videoSource ? (
                                    <>
                                        {localVideoUrl ? (
                                            // ✅ Local Video
                                            <div className="w-full h-full bg-black flex justify-center items-center flex-1">
                                                <video
                                                    ref={videoRef}
                                                    src={localVideoUrl}
                                                    className={`w-full h-full object-cover ${isPortraitEmbed ? 'scale-[1.01]' : 'max-h-[80vh] w-auto'}`}
                                                    controls={isPlaying}
                                                    playsInline
                                                >
                                                    Your browser does not support the video tag.
                                                </video>

                                                {/* Play Button Overlay */}
                                                {!isPlaying && (
                                                    <div
                                                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-all cursor-pointer z-10"
                                                        onClick={handlePlayClick}
                                                    >
                                                        <div className="relative group/play">
                                                            <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                                                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/30 group-hover/play:scale-110 transition-transform duration-300">
                                                                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // ✅ Embeds (TikTok / YouTube / Instagram)
                                            <div className={`w-full relative ${isPortraitEmbed ? 'bg-white' : 'aspect-video'} flex-1`}>
                                                {/* Fallback Link for Blocked Embeds (Behind iframe, visible if iframe is transparent/blocked) */}
                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-100 z-0 p-6 text-center text-zinc-500">
                                                    <p className="text-xs mb-4">
                                                        Video loading...
                                                    </p>
                                                    <a
                                                        href={videoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-bold transition-all shadow-lg shadow-orange-500/20 group-hover/btn:scale-105"
                                                    >
                                                        <Play className="w-5 h-5 fill-current" />
                                                        Watch on {isInstagram ? 'Instagram' : isTikTok ? 'TikTok' : isShorts ? 'YouTube' : 'Platform'}
                                                    </a>
                                                </div>

                                                <iframe
                                                    src={videoSource}
                                                    className="absolute inset-0 w-full h-full z-10"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    scrolling="no"
                                                    style={{ border: 'none', backgroundColor: 'transparent' }}
                                                    title="Introduction Video"
                                                />

                                                {/* TikTok Inner Shadow only */}
                                                {isTikTok && <div className="absolute inset-0 pointer-events-none rounded-[2.2rem] ring-1 ring-black/10 inset-shadow"></div>}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    // Empty State
                                    <div className="w-full aspect-video flex flex-col items-center justify-center bg-zinc-800/80 text-zinc-400">
                                        <Play className="w-16 h-16 mb-4 opacity-30" />
                                        <p className="text-sm font-medium">No video configured</p>
                                    </div>
                                )}
                            </div>

                            {/* Corner Accents - Hidden on Portrait for cleaner look */}
                            {!isPortraitEmbed && (
                                <>
                                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-orange-500/50 rounded-tl-lg"></div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-orange-500/50 rounded-br-lg"></div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
