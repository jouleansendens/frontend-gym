import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import LandingPageEditor from './pages/LandingPageEditor';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManagePricing from './pages/admin/ManagePricing';
import ManageLeaderboard from './pages/admin/ManageLeaderboard';
import ManageFAQ from './pages/admin/ManageFAQ';
import ManageMessages from './pages/admin/ManageMessages';
import Settings from './pages/admin/Settings';
import ManageTestimonials from './pages/admin/ManageTestimonials';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  // ✅ TUNGGU hingga verifikasi selesai sebelum melakukan keputusan redirect
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/editor" 
          element={
            <ProtectedRoute>
              <LandingPageEditor />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/services" 
          element={
            <ProtectedRoute>
              <ManageServices />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/pricing" 
          element={
            <ProtectedRoute>
              <ManagePricing />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/leaderboard" 
          element={
            <ProtectedRoute>
              <ManageLeaderboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/faq" 
          element={
            <ProtectedRoute>
              <ManageFAQ />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/messages" 
          element={
            <ProtectedRoute>
              <ManageMessages />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/testimonials" 
          element={
            <ProtectedRoute>
              <ManageTestimonials />
            </ProtectedRoute>
          } 
        />

        {/* 404 Not Found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}