import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ✅ 1. Inisialisasi status LANGSUNG dari localStorage agar tidak bernilai 'false' di awal
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);

useEffect(() => {
  const checkAuth = async () => {
    const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedInLocal) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        // ✅ TAMBAHKAN credentials: 'include'
        const res = await fetch(`${import.meta.env.VITE_API_URL}/check-auth`, {
          signal: controller.signal,
          credentials: 'include', // Sangat penting untuk mengirim session/cookie
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        clearTimeout(timeoutId);

        if (res.ok) {
          // Jika backend menjawab 200 OK
          setAuthenticated(true);
        } else {
          // Jika backend menjawab selain 200 (misal 401)
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        // HANYA hapus login jika error memang karena tidak sah
        setAuthenticated(false);
        localStorage.removeItem('isLoggedIn');
      }
    } else {
      setAuthenticated(false);
    }
    
    setIsLoading(false); 
  };
  
  checkAuth();
}, []);

  const login = () => {
    setAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  // Pastikan menyertakan 'token' jika memang ada di interface Anda
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, token: null }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}