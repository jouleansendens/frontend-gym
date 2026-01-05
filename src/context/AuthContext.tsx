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
  
  // ✅ 2. Inisialisasi token dari localStorage
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);

useEffect(() => {
  const checkAuth = async () => {
    const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
    const savedToken = localStorage.getItem('token');
    
    if (isLoggedInLocal && savedToken) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        // ✅ Kirim Bearer token di header Authorization
        const res = await fetch(`${import.meta.env.VITE_API_URL}/check-auth`, {
          signal: controller.signal,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${savedToken}` // ✅ PENTING: Kirim token
          }
        });
        
        clearTimeout(timeoutId);

        if (res.ok) {
          // Jika backend menjawab 200 OK
          setAuthenticated(true);
          setToken(savedToken);
        } else {
          // Jika backend menjawab selain 200 (misal 401)
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        // HANYA hapus login jika error memang karena tidak sah
        setAuthenticated(false);
        setToken(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token'); // ✅ Hapus token juga
      }
    } else {
      setAuthenticated(false);
      setToken(null);
    }
    
    setIsLoading(false); 
  };
  
  checkAuth();
}, []);

  const login = (newToken: string) => {
    setAuthenticated(true);
    setToken(newToken);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setAuthenticated(false);
    setToken(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // ✅ Hapus token saat logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, token }}>
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