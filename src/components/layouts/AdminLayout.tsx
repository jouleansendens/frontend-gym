import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Dumbbell, 
  PencilRuler, 
  Briefcase,   
  DollarSign,
  HelpCircle,
  Trophy,
  MessageSquare,
  MessageSquareQuote, // ✅ Icon baru untuk Testimonials
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ✅ MenuItems diperbarui dengan Manage Testimonials
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: PencilRuler, label: 'Edit Landing Page', path: '/admin/editor' },
    { icon: Briefcase, label: 'Manage Services', path: '/admin/services' },
    { icon: DollarSign, label: 'Manage Pricing', path: '/admin/pricing' },
    { icon: HelpCircle, label: 'Manage FAQ', path: '/admin/faq' },
    // --- ✅ MENU BARU ---
    { icon: MessageSquareQuote, label: 'Manage Testimonials', path: '/admin/testimonials' }, 
    { icon: Trophy, label: 'Leaderboard', path: '/admin/leaderboard' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      
      {/* --- SIDEBAR (DESKTOP) --- */}
      <aside className="hidden md:flex w-64 bg-zinc-900 border-r border-white/10 flex-col flex-shrink-0">
        
        {/* Header Sidebar (Logo) */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <span>FitCoach</span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-white/10 shrink-0 bg-zinc-900">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-zinc-900 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2 font-bold text-white">
            <Dumbbell className="h-5 w-5 text-orange-500" />
            <span>FitCoach Admin</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* --- MAIN SCROLLABLE CONTENT --- */}
        <main className="flex-1 overflow-y-auto bg-black p-4 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-20">
            {children}
          </div>
        </main>

      </div>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="w-64 bg-zinc-900 h-full flex flex-col border-r border-white/10 shadow-2xl">
             <div className="h-16 flex items-center px-6 border-b border-white/10">
                <span className="font-bold text-lg">Menu</span>
             </div>
             <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium ${
                      location.pathname === item.path ? 'bg-orange-500 text-white' : 'text-zinc-400'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
             </div>
             <div className="p-4 border-t border-white/10">
                <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 w-full px-3 py-2">
                  <LogOut className="w-5 h-5" /> Keluar
                </button>
             </div>
          </div>
          <div className="flex-1 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

    </div>
  );
}