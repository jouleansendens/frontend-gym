import { ArrowLeft, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function IntroVideo() {
    const navigate = useNavigate();
    const { content } = useContent();

    const videoUrl = content['intro.video_url'] || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    const videoLocal = content['intro.video_local'];
    const videoSource = content['intro.video_local'] ? 'local' : 'url'; // Auto-detect based on data presence

    const title = content['intro.title'] || 'Welcome to My Fitness Journey';
    const description = content['intro.description'] || 'Watch this introduction to learn more about my coaching philosophy and how I can help you transform your life.';

    // Check if it's a YouTube URL and convert to embed format if needed
    const getEmbedUrl = (url: string) => {
        if (!url) return '';

        // Already an embed URL (generic)
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

    const embedUrl = getEmbedUrl(videoUrl);
    // Determine if it's an embeddable URL source (not local)
    const isEmbedSource = videoSource === 'url';

    // ✅ Detect Portrait Sources for Page Layout
    const isInstagram = videoUrl.includes('instagram.com');
    const isTikTok = videoUrl.includes('tiktok.com');
    const isShorts = videoUrl.includes('/shorts/');
    const isPortraitEmbed = isInstagram || isTikTok || isShorts;

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
                <div className="container mx-auto px-4 py-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white/80 hover:text-orange-500 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-5xl">
                    {/* Title & Description */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500 px-4 py-2 rounded-full mb-4">
                            <Play className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-500 text-sm font-medium">Introduction Video</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Video Player - Consistent with Component Logic */}
                    <div className={`relative overflow-hidden shadow-2xl mx-auto transition-all duration-500 flex flex-col
                        ${isPortraitEmbed ? 'bg-zinc-100' : 'bg-black'}
                        ${(isTikTok || isShorts) ? 'rounded-[2.5rem] border-[6px] border-zinc-950 shadow-orange-500/10 ring-1 ring-white/10 max-w-[340px] aspect-[9/16]' : ''}
                        ${isInstagram ? 'rounded-xl border border-zinc-200 max-w-[400px] min-h-[600px]' : ''}
                        ${!isPortraitEmbed ? 'rounded-2xl border border-white/5 shadow-orange-500/10 w-full aspect-video' : ''}
                    `}>
                        {/* Empty Default Class reset handled by conditional render below if needed, but styling is applied to container */}

                        {videoSource === 'local' && videoLocal ? (
                            // ✅ Local Video: Auto Auto aspect ratio with constraints
                            <div className="w-full h-full flex justify-center bg-black items-center flex-1">
                                <video
                                    src={videoLocal}
                                    controls
                                    autoPlay
                                    className={`w-full h-full object-contain ${isPortraitEmbed ? 'scale-[1.01]' : 'max-h-[80vh]'}`}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            // ✅ Embeds (YouTube, TikTok, IG)
                            <div className={`w-full relative ${isPortraitEmbed ? 'bg-white' : ''} flex-1`}>
                                {isEmbedSource ? (
                                    <>
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
                                            src={embedUrl}
                                            title={title}
                                            className="absolute inset-0 w-full h-full z-10"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            scrolling="no"
                                            style={{ border: 'none', backgroundColor: 'transparent' }}
                                        />
                                        {/* TikTok Inner Shadow only */}
                                        {(isTikTok || isShorts) && <div className="absolute inset-0 pointer-events-none rounded-[2.2rem] ring-1 ring-black/10 inset-shadow"></div>}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/30">
                                        Invalid Video Source
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full transition-colors font-medium inline-flex items-center gap-2"
                        >
                            Start Your Journey
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </button>
                    </div>
                </div>
            </main>

            {/* Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
