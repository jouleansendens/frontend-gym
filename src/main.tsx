import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
// 1. Import HelmetProvider
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")!).render(
  <HelmetProvider> {/* 2. Bungkus di sini */}
    <AuthProvider>
      <ContentProvider>
        <App />
        <Toaster position="top-right" richColors />
      </ContentProvider>
    </AuthProvider>
  </HelmetProvider>
);