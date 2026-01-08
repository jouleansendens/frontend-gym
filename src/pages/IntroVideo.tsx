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
        // Already an embed URL
        if (url.includes('/embed/')) return url;

        // YouTube watch URL
        const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }

        return url;
    };

    const embedUrl = getEmbedUrl(videoUrl);
    const isYouTube = videoSource === 'url' && embedUrl.includes('youtube.com/embed');

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

                    {/* Video Player */}
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl shadow-orange-500/10">
                        <div className="aspect-video">
                            {videoSource === 'local' && videoLocal ? (
                                <video
                                    src={videoLocal}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-cover"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : isYouTube ? (
                                <iframe
                                    src={embedUrl}
                                    title={title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                    poster=""
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
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
