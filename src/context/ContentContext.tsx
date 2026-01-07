import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- TYPES ---
export type ServiceItem = { id: string; title: string; description: string; iconName: string; features: string[]; };
export type PricingItem = { id: string; name: string; price: string; period: string; description: string; features: string[]; popular: boolean; };
export type FAQItem = { id: string; question: string; answer: string; };
export type LeaderboardItem = { id: string; name: string; steps: number; };
export type MessageItem = { id: string; firstName: string; lastName: string; email: string; phone: string; goal: string; message: string; date: string; isRead: boolean; };
export type CertificateItem = { id: string; name: string; issuer: string; featured: boolean; };
export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  isActive: boolean | number; // ✅ Terima boolean atau number dari database
  is_active?: boolean | number; // ✅ Alias untuk backward compatibility
};

export type SectionConfig = {
  id: string;
  label: string;
  component: string;
  isVisible: boolean;
};

const defaultSections: SectionConfig[] = [
  { id: 'hero', label: 'Hero Section', component: 'Hero', isVisible: true },
  { id: 'about', label: 'About Me', component: 'About', isVisible: true },
  { id: 'quote', label: 'Quote Banner', component: 'QuoteBanner', isVisible: true },
  { id: 'services', label: 'Services', component: 'Services', isVisible: true },
  { id: 'leaderboard', label: 'Steps Leaderboard', component: 'StepsLeaderboard', isVisible: true },
  { id: 'coach_bio', label: 'Coach Bio', component: 'CoachBio', isVisible: true },
  { id: 'testimonials', label: 'Testimonials', component: 'Testimonials', isVisible: true },
  { id: 'pricing', label: 'Pricing Plans', component: 'Pricing', isVisible: true },
  { id: 'faq', label: 'FAQ', component: 'FAQ', isVisible: true },
  { id: 'contact', label: 'Contact', component: 'Contact', isVisible: true },
];

// --- DEFAULT CONTENT ---
const defaultContent: Record<string, string> = {
  "hero.badge": "Certified Personal Trainer",
  "hero.title": "Transform Your Body,\nTransform Your Life",
  "hero.subtitle": "Achieve your fitness goals with personalized 1-on-1 coaching, customized workout plans, and expert guidance - both in-person and online.",
  "hero.cta_primary": "Start Your Journey",
  "hero.cta_secondary": "Watch Video",
  "hero.stat1_value": "500+",
  "hero.stat1_label": "Clients Trained",
  "hero.stat2_value": "10+",
  "hero.stat2_label": "Years Experience",
  "hero.stat3_value": "98%",
  "hero.stat3_label": "Success Rate",
  "about.label": "About Me",
  "about.title": "Your Partner in\nFitness Excellence",
  "about.desc1": "With over 10 years of experience in personal training and fitness coaching, I've helped hundreds of clients achieve their fitness goals.",
  "about.desc2": "My approach combines proven training methodologies with personalized attention to ensure you not only reach your goals but maintain them for life.",
  "about.button": "Learn More About Me",
  "about.modal_title": "My Fitness Journey",
  "about.modal_content": "With over 10 years of experience, I started this journey because I believe everyone deserves to feel strong and confident in their own skin...",
  "about.modal_button": "Close Story",
  "coach.label": "Meet Your Coach",
  "coach.title": "Your Partner in Fitness Excellence",
  "coach.desc1": "With over 10 years of experience in personal training, I help people transform their lives through sustainable fitness.",
  "coach.desc2": "My approach focuses on functional movement and nutrition tailored to your lifestyle.",
  "coach.cert1.title": "NASM",
  "coach.cert1.desc": "Certified Personal Trainer",
  "coach.cert2.title": "PN1",
  "coach.cert2.desc": "Nutrition Coach",
  "coach.link": "Read My Full Story",
  "contact.phone": "6281234567890",
  "contact.wa_template": "Halo Coach, saya tertarik daftar paket *{name}* dengan harga {price}/{period}. Mohon infonya.",
  "contact.hours.mon_fri": "6:00 AM - 10:00 PM",
  "contact.hours.sat": "8:00 AM - 8:00 PM",
  "contact.hours.sun": "9:00 AM - 6:00 PM",
  "social.instagram": "https://instagram.com",
  "social.facebook": "https://facebook.com",
  "social.youtube": "https://youtube.com",
  "social.tiktok": "",
  "social.linkedin": "",
  "social.twitter": "",
  "social.instagram.enabled": "true",
  "social.facebook.enabled": "true",
  "social.youtube.enabled": "true",
  "social.tiktok.enabled": "true",
  "social.linkedin.enabled": "true",
  "social.twitter.enabled": "true",
  "site.name": "FITCOACH",
  "quote.text": "The only bad workout is the one that didn't happen.",
  "quote.font": '"Playfair Display", serif',
  "quote.author": "— COACH FITCOACH",
  "intro.video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "intro.title": "Welcome to My Fitness Journey",
  "intro.description": "Watch this introduction to learn more about my coaching philosophy and how I can help you transform your life."
};

const defaultServices: ServiceItem[] = [
  {
    id: 's1',
    iconName: 'User',
    title: '1-on-1 Personal Training',
    description: 'Highly personalized sessions focused on your specific goals, form, and rapid progress.',
    features: ['Customized workout plans', 'Posture & form correction', 'Private training environment']
  },
  {
    id: 's2',
    iconName: 'Video',
    title: 'Online Coaching',
    description: 'Train from anywhere in the world with expert guidance delivered straight to your smartphone.',
    features: ['Mobile app integration', 'Weekly video check-ins', '24/7 Chat support']
  },
  {
    id: 's3',
    iconName: 'Activity',
    title: 'Competition Prep',
    description: 'Specialized programming for athletes looking to step on stage or compete at elite levels.',
    features: ['Peak week protocols', 'Posing coaching', 'Performance analysis']
  },
  {
    id: 's4',
    iconName: 'Heart',
    title: 'Nutrition Planning',
    description: 'Fuel your body correctly with science-based meal plans tailored to your metabolism.',
    features: ['Macro-nutrient breakdown', 'Supplement guidance', 'Grocery shopping lists']
  },
  {
    id: 's5',
    iconName: 'Users',
    title: 'Small Group Sessions',
    description: 'The perfect balance of professional coaching and high-energy community motivation.',
    features: ['Max 5 people per group', 'Accountability partners', 'Budget-friendly rates']
  },
  {
    id: 's6',
    iconName: 'Zap',
    title: 'Express HIIT',
    description: 'High-intensity interval training designed to burn maximum calories in just 30 minutes.',
    features: ['Metabolic conditioning', 'Rapid fat loss', 'Equipment-free options']
  }
];

const defaultPricing: PricingItem[] = [
  {
    id: 'd1',
    name: 'Starter Plan',
    price: '350000',
    period: 'per month',
    description: 'Perfect for those just starting their fitness journey with full gym access.',
    features: ['Unlimited Gym Access', 'Locker & Shower Room', 'Free Fitness Assessment', 'Basic Workout Plan'],
    popular: false
  },
  {
    id: 'd2',
    name: 'Pro Coaching',
    price: '1200000',
    period: 'per month',
    description: 'Accelerate your results with dedicated 1-on-1 personal training sessions.',
    features: ['Everything in Starter', '8 Personal Training Sessions', 'Customized Nutrition Plan', 'Progress Tracking App'],
    popular: true
  },
  {
    id: 'd3',
    name: 'Elite Transformation',
    price: '3500000',
    period: 'per month',
    description: 'The ultimate package for total body transformation and 24/7 support.',
    features: ['Unlimited PT Sessions', 'Supplementation Guide', 'Monthly Body Scan (InBody)', '24/7 VIP Priority Support'],
    popular: false
  }
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Best decision I ever made! I lost 30 pounds in 4 months and gained so much confidence. The personalized coaching made all the difference.',
    isActive: true
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Marketing Director',
    image: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    text: 'The online coaching is perfect for my busy schedule. Professional, knowledgeable, and always there to support me. Highly recommend!',
    isActive: true
  },
  {
    id: 't3',
    name: 'David Rodriguez',
    role: 'Business Owner',
    image: 'https://i.pravatar.cc/150?img=13',
    rating: 5,
    text: 'Transformed my body and mindset in just 3 months. The workouts are challenging but achievable, and the results speak for themselves.',
    isActive: true
  }
];

const defaultFaqs: FAQItem[] = [
  {
    id: 'f1',
    question: 'Is this suitable for absolute beginners?',
    answer: 'Absolutely! Every program is customized to your current fitness level. We start with the basics to ensure your form is perfect before progressing to more intense exercises.'
  },
  {
    id: 'f2',
    question: 'How does the Online Coaching work?',
    answer: 'Online coaching is delivered via our dedicated app. You will receive customized workout plans, nutrition goals, and have 24/7 access to chat with the coach. Weekly video check-ins ensure you stay on track.'
  },
  {
    id: 'f3',
    question: 'Do I need a gym membership for the home plans?',
    answer: 'Not necessarily. While a gym provides more equipment, we can design highly effective home-based programs using just dumbbells, resistance bands, or even just your body weight.'
  }
];

const defaultLeaderboard: LeaderboardItem[] = [
  { id: 'l1', name: 'David Beckham', steps: 120500 },
  { id: 'l2', name: 'Sarah Jenkins', steps: 115200 },
  { id: 'l3', name: 'Marcus Thorne', steps: 98400 }
];

// --- CONTEXT INTERFACE ---
interface ContentContextType {
  content: Record<string, string>;
  updateContent: (key: string, value: string) => void;
  services: ServiceItem[];
  addService: (data: any) => void;
  updateService: (id: string, data: any) => void;
  deleteService: (id: string) => void;
  pricing: PricingItem[];
  addPricing: (data: any) => void;
  updatePricing: (id: string, data: any) => void;
  deletePricing: (id: string) => void;
  faqs: FAQItem[];
  addFAQ: (data: any) => void;
  updateFAQ: (id: string, data: any) => void;
  deleteFAQ: (id: string) => void;
  leaderboard: LeaderboardItem[];
  addLeaderboardEntry: (data: any) => void;
  updateLeaderboardEntry: (id: string, data: any) => void;
  deleteLeaderboardEntry: (id: string) => void;
  messages: MessageItem[];
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  addMessage: (data: any) => void;
  images: Record<string, string>;
  updateImage: (id: string, file: File) => void;
  deleteImage: (id: string) => void;
  isEditMode: boolean;
  setEditMode: (value: boolean) => void;
  resetContent: () => void;
  certificates: CertificateItem[];
  addCertificate: (data: any) => void;
  updateCertificate: (id: string, data: any) => void;
  deleteCertificate: (id: string) => void;
  testimonials: TestimonialItem[];
  addTestimonial: (data: any) => void;
  updateTestimonial: (id: string, data: any) => void;
  deleteTestimonial: (id: string) => void;
  sections: SectionConfig[];
  updateSections: (newSections: SectionConfig[]) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// ✅ Ubah ke Laravel API endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL;

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [pricing, setPricing] = useState<PricingItem[]>(defaultPricing);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [isEditMode, setEditMode] = useState(false);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>(defaultLeaderboard);

  // ✅ Helper untuk API calls
  const apiCall = async (endpoint: string, method: string = 'GET', data?: any) => {
    try {
      const token = localStorage.getItem('token'); // ✅ Ambil token

      // ✅ CACHE BUSTING: Tambahkan timestamp untuk prevent browser caching
      const separator = endpoint.includes('?') ? '&' : '?';
      const cacheBustedEndpoint = method === 'GET'
        ? `${endpoint}${separator}_t=${Date.now()}`
        : endpoint;

      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate', // ✅ Prevent caching
          'Pragma': 'no-cache', // ✅ HTTP 1.0 compatibility
          'Expires': '0', // ✅ Force revalidation
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      };

      if (data) options.body = JSON.stringify(data);

      const response = await fetch(`${API_BASE_URL}${cacheBustedEndpoint}`, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  };

  // ✅ Load data dari MySQL saat inisialisasi / Reset
  const loadData = async () => {
    console.log('📡 [loadData] Fetching data from API...');
    try {
      // ✅ FETCH PUBLIC DATA (tidak butuh token - untuk semua user)
      const [
        contentData,
        servicesData,
        pricingData,
        faqsData,
        leaderboardData,
        certificatesData,
        testimonialsData
      ] = await Promise.all([
        apiCall('/content'),
        apiCall('/services'),
        apiCall('/pricing'),
        apiCall('/faqs'),
        apiCall('/leaderboard'),
        apiCall('/certificates'),
        apiCall('/testimonials')
      ]);

      console.log('✅ [loadData] Public API Response:', {
        contentDataKeys: contentData?.data ? Object.keys(contentData.data).length : 0,
        siteName: contentData?.data?.['site.name'],
        heroTitle: contentData?.data?.['hero.title']
      });

      // Set state dengan data dari database
      if (contentData?.data) {
        const mergedContent = { ...defaultContent, ...contentData.data };
        console.log('🔄 [loadData] Setting content state:', {
          siteName: mergedContent['site.name'],
          heroTitle: mergedContent['hero.title']
        });
        setContent(mergedContent);
        // Load Layout Order if exists
        if (contentData.data['site.layout_order']) {
          try {
            const rawData = contentData.data['site.layout_order'];
            // Handle both string (JSON) and array (already parsed by backend)
            const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            if (Array.isArray(parsed)) setSections(parsed);
          } catch (e) {
            console.error('Failed to parse layout order', e);
          }
        }
      } else {
        console.warn('⚠️ [loadData] No content data received from API');
      }
      if (servicesData?.data) setServices(servicesData.data);
      if (pricingData?.data) setPricing(pricingData.data);
      if (faqsData?.data) setFaqs(faqsData.data);
      if (leaderboardData?.data) setLeaderboard(leaderboardData.data);
      if (certificatesData?.data) setCertificates(certificatesData.data);
      if (testimonialsData?.data) setTestimonials(testimonialsData.data);

      console.log('✅ [loadData] Public data loaded successfully');

      // ✅ FETCH PRIVATE DATA (butuh token - hanya untuk admin)
      const token = localStorage.getItem('token');
      if (token) {
        console.log('🔐 Token detected, fetching admin-only data...');
        try {
          const [messagesData, imagesData] = await Promise.all([
            apiCall('/messages'),
            apiCall('/images')
          ]);

          if (messagesData?.data) setMessages(messagesData.data);
          if (imagesData?.data) setImages(imagesData.data);
          console.log('✅ [loadData] Admin data loaded successfully');
        } catch (adminError) {
          console.warn('⚠️ [loadData] Failed to load admin data (token might be invalid):', adminError);
          // Don't throw error - public data already loaded
        }
      } else {
        console.log('ℹ️ No token found - skipping admin-only data (messages, images)');
      }

    } catch (error) {
      console.error('❌ [loadData] Failed to load public data:', error);
    }
  };

  // ✅ Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // ✅ Auto-refresh data setiap 2 menit untuk memastikan data selalu fresh
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing content from API...');
      loadData(); // Reload data dari API
    }, 2 * 60 * 1000); // 2 menit = 120000ms

    return () => clearInterval(refreshInterval); // Cleanup saat unmount
  }, []);

  // --- CONTENT MANAGEMENT ---
  const updateContent = async (key: string, value: string) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);
    try {
      await apiCall('/content', 'PUT', { key, value });
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };

  const updateSections = async (newSections: SectionConfig[]) => {
    setSections(newSections);
    await updateContent('site.layout_order', JSON.stringify(newSections));
  };

  // --- SERVICES MANAGEMENT ---
  const addService = async (data: any) => {
    try {
      const result = await apiCall('/services', 'POST', data);
      setServices(prev => [...prev, result.data]);
    } catch (error) {
      console.error('Failed to add service:', error);
    }
  };

  const updateService = async (id: string, data: any) => {
    try {
      await apiCall(`/services/${id}`, 'PUT', data);
      setServices(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await apiCall(`/services/${id}`, 'DELETE');
      setServices(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  // --- PRICING MANAGEMENT ---
  const addPricing = async (data: any) => {
    try {
      const result = await apiCall('/pricing', 'POST', data);
      setPricing(prev => [...prev, result.data]);
    } catch (error) {
      console.error('Failed to add pricing:', error);
    }
  };

  const updatePricing = async (id: string, data: any) => {
    try {
      await apiCall(`/pricing/${id}`, 'PUT', data);
      setPricing(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    } catch (error) {
      console.error('Failed to update pricing:', error);
    }
  };

  const deletePricing = async (id: string) => {
    try {
      await apiCall(`/pricing/${id}`, 'DELETE');
      setPricing(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete pricing:', error);
    }
  };

  // --- FAQ MANAGEMENT ---
  const addFAQ = async (data: any) => {
    try {
      const result = await apiCall('/faqs', 'POST', data);
      setFaqs(prev => [...prev, result.data]);
    } catch (error) {
      console.error('Failed to add FAQ:', error);
    }
  };

  const updateFAQ = async (id: string, data: any) => {
    try {
      await apiCall(`/faqs/${id}`, 'PUT', data);
      setFaqs(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    } catch (error) {
      console.error('Failed to update FAQ:', error);
    }
  };

  const deleteFAQ = async (id: string) => {
    try {
      await apiCall(`/faqs/${id}`, 'DELETE');
      setFaqs(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
    }
  };

  // --- LEADERBOARD MANAGEMENT ---
  const addLeaderboardEntry = async (data: any) => {
    try {
      const result = await apiCall('/leaderboard', 'POST', data);
      setLeaderboard(prev => [...prev, result.data]);
    } catch (error) {
      console.error('Failed to add leaderboard entry:', error);
    }
  };

  const updateLeaderboardEntry = async (id: string, data: any) => {
    try {
      await apiCall(`/leaderboard/${id}`, 'PUT', data);
      setLeaderboard(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    } catch (error) {
      console.error('Failed to update leaderboard entry:', error);
    }
  };

  const deleteLeaderboardEntry = async (id: string) => {
    try {
      await apiCall(`/leaderboard/${id}`, 'DELETE');
      setLeaderboard(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete leaderboard entry:', error);
    }
  };

  // --- MESSAGES MANAGEMENT ---
  const addMessage = async (data: any) => {
    try {
      const result = await apiCall('/messages', 'POST', data);
      setMessages(prev => [result.data, ...prev]);
    } catch (error) {
      console.error('Failed to add message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await apiCall(`/messages/${id}`, 'DELETE');
      setMessages(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      await apiCall(`/messages/${id}/read`, 'PUT');
      setMessages(prev => prev.map(item => item.id === id ? { ...item, isRead: true } : item));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  // --- CERTIFICATES MANAGEMENT ---
  const addCertificate = async (data: any) => {
    try {
      const result = await apiCall('/certificates', 'POST', { ...data, featured: false });
      setCertificates(prev => [...prev, result.data]);
    } catch (error) {
      console.error('Failed to add certificate:', error);
    }
  };

  const updateCertificate = async (id: string, data: any) => {
    // Optimistic update: update UI immediately
    setCertificates(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    try {
      await apiCall(`/certificates/${id}`, 'PUT', data);
    } catch (error) {
      console.error('Failed to update certificate:', error);
      // Optional: rollback here if needed, but for now allow UI consistency
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await apiCall(`/certificates/${id}`, 'DELETE');
      setCertificates(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete certificate:', error);
    }
  };

  // --- TESTIMONIALS MANAGEMENT ---
  const addTestimonial = async (data: any) => {
    try {
      const result = await apiCall('/testimonials', 'POST', { ...data, isActive: true });
      setTestimonials(prev => [...prev, result.data]);
    } catch (error) {
      console.error('Failed to add testimonial:', error);
    }
  };

  const updateTestimonial = async (id: string, data: any) => {
    try {
      await apiCall(`/testimonials/${id}`, 'PUT', data);
      setTestimonials(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    } catch (error) {
      console.error('Failed to update testimonial:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await apiCall(`/testimonials/${id}`, 'DELETE');
      setTestimonials(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  // --- IMAGE MANAGEMENT ---
  const updateImage = async (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImages(prev => ({ ...prev, [id]: base64 }));
      try {
        await apiCall('/images', 'PUT', { id, data: base64 });
      } catch (error) {
        console.error('Failed to update image:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteImage = async (id: string) => {
    try {
      await apiCall(`/images/${id}`, 'DELETE');
      setImages(prev => {
        const newImages = { ...prev };
        delete newImages[id];
        return newImages;
      });
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  // --- RESET (Discard Changes & Reload) ---
  const resetContent = async () => {
    // Reload data dari database (mengembalikan ke kondisi save terakhir)
    await loadData();
    console.log("Changes discarded, data reloaded from DB");
  };

  return (
    <ContentContext.Provider value={{
      content, updateContent,
      services, addService, updateService, deleteService,
      pricing, addPricing, updatePricing, deletePricing,
      faqs, addFAQ, updateFAQ, deleteFAQ,
      leaderboard, addLeaderboardEntry, updateLeaderboardEntry, deleteLeaderboardEntry,
      messages, deleteMessage, markMessageAsRead, addMessage,
      images, updateImage, deleteImage,
      isEditMode, setEditMode,
      resetContent,
      certificates, addCertificate, updateCertificate, deleteCertificate,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      sections, updateSections
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};