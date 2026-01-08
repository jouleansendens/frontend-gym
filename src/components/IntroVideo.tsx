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

    // Auto-convert YouTube watch URL to embed URL
    const convertToEmbedUrl = (url: string): string => {
        if (!url) return url;

        // Convert youtube.com/watch?v=xxx to youtube.com/embed/xxx
        const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
        if (watchMatch) {
            return `https://www.youtube.com/embed/${watchMatch[1]}`;
        }

        // Convert youtu.be/xxx to youtube.com/embed/xxx
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortMatch) {
            return `https://www.youtube.com/embed/${shortMatch[1]}`;
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

    // Check if it's a YouTube or Vimeo embed URL
    const isEmbedUrl = videoSource.includes('youtube.com/embed') ||
        videoSource.includes('player.vimeo.com');

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
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">

                    {/* Left Side - Text Content */}
                    <div className="order-2 lg:order-1 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 mb-6">
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

                        {/* Stats/Features */}
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
                    <div className="order-1 lg:order-2">
                        <div className="relative group">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-orange-500/30 via-yellow-500/20 to-orange-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

                            {/* Video Container */}
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                                {/* Aspect Ratio Container */}
                                <div className="relative" style={{ paddingTop: '56.25%' }}>
                                    {videoSource ? (
                                        <>
                                            {isEmbedUrl ? (
                                                // YouTube/Vimeo Embed
                                                <iframe
                                                    src={videoSource}
                                                    className="absolute inset-0 w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title="Introduction Video"
                                                />
                                            ) : isDirectVideo ? (
                                                // Direct Video File
                                                <>
                                                    <video
                                                        ref={videoRef}
                                                        src={videoSource}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                        controls={isPlaying}
                                                        playsInline
                                                    >
                                                        Your browser does not support the video tag.
                                                    </video>

                                                    {/* Custom Play Button Overlay */}
                                                    {!isPlaying && (
                                                        <div
                                                            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent cursor-pointer"
                                                            onClick={handlePlayClick}
                                                        >
                                                            {/* Play Button */}
                                                            <div className="relative">
                                                                {/* Pulse Animation */}
                                                                <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                                                                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/40 group-hover:scale-110 transition-transform duration-300">
                                                                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                                                                </div>
                                                            </div>

                                                            {/* Bottom Text */}
                                                            <div className="absolute bottom-6 left-6 right-6">
                                                                <p className="text-white/80 text-sm font-medium">Watch Introduction</p>
                                                                <p className="text-white/50 text-xs">2 min video</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                // Fallback - try as iframe
                                                <iframe
                                                    src={videoSource}
                                                    className="absolute inset-0 w-full h-full"
                                                    allowFullScreen
                                                    title="Introduction Video"
                                                />
                                            )}
                                        </>
                                    ) : (
                                        // Empty State (Edit Mode)
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-800/80 text-zinc-400">
                                            <Play className="w-16 h-16 mb-4 opacity-30" />
                                            <p className="text-sm font-medium">No video configured</p>
                                            <p className="text-xs text-zinc-500 mt-1">Add a video in Admin Settings</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-orange-500/50 rounded-tl-lg"></div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-orange-500/50 rounded-br-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
