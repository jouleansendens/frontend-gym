import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ContentProvider>
      <App />
      <Toaster position="top-right" richColors />
    </ContentProvider>
  </AuthProvider>
);