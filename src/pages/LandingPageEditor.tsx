import { useEffect, useState, useRef, useCallback } from 'react';
import Home from './Home';
import { useContent } from '../context/ContentContext';
import { Button } from '../components/ui/button';
import {
  ArrowLeft, Save, RotateCcw, MessageCircle, Settings,
  Globe, Clock, Instagram, Facebook, Youtube, Linkedin, Twitter,
  UserCircle, FileText, Award, Trash2, Layout, Image as ImageIcon, Dumbbell,
  Crop as CropIcon, RefreshCcw, ZoomIn, ZoomOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';

// ✅ IMPORT LIBRARY CROPPER
import Cropper from 'react-easy-crop';

// --- HELPER FUNCTIONS UNTUK CROP GAMBAR ---
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/png');
  });
}

export default function LandingPageEditor() {
  const {
    setEditMode, resetContent, content, updateContent,
    certificates, addCertificate, deleteCertificate,
    images, updateImage, deleteImage // ✅ deleteImage untuk reset logo
  } = useContent();

  const navigate = useNavigate();
  const logoInputRef = useRef<HTMLInputElement>(null);

  // --- STATE DIALOG ---
  const [isWaSettingsOpen, setIsWaSettingsOpen] = useState(false);
  const [isContactSettingsOpen, setIsContactSettingsOpen] = useState(false);
  const [isAboutSettingsOpen, setIsAboutSettingsOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isSiteSettingsOpen, setIsSiteSettingsOpen] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false); // ✅ Dialog Cropper

  // --- CROPPER STATE ---
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // --- CONFIG STATE ---
  const [waConfig, setWaConfig] = useState({ phone: '', template: '' });
  const [contactConfig, setContactConfig] = useState({
    monFri: '', sat: '', sun: '', ig: '', fb: '', yt: '', li: '', tw: ''
  });
  const [aboutConfig, setAboutConfig] = useState({ title: '', content: '' });
  const [siteName, setSiteName] = useState('');
  const [newCert, setNewCert] = useState({ name: '', issuer: '' });

  useEffect(() => {
    setEditMode(true);
    return () => setEditMode(false);
  }, [setEditMode]);

  // --- HANDLERS: BRANDING & CROP LOGO ---
  const openSiteSettings = () => {
    setSiteName(content["site.name"] || "FITCOACH");
    setIsSiteSettingsOpen(true);
  };

  const saveSiteName = () => {
    updateContent("site.name", siteName);
    toast.success("Branding name updated!");
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null);
        setIsCropperOpen(true);
        setIsSiteSettingsOpen(false); // Tutup dialog utama saat cropping
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCroppedLogo = useCallback(async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
        if (croppedImageBlob) {
          const file = new File([croppedImageBlob], "logo.png", { type: "image/png" });
          updateImage('site.logo', file);
          toast.success("Logo cropped and updated!");
          setIsCropperOpen(false);
          setImageSrc(null);
          setIsSiteSettingsOpen(true);
        }
      }
    } catch (e) {
      toast.error("Failed to crop image.");
    }
  }, [imageSrc, croppedAreaPixels, updateImage]);

  const handleResetLogo = () => {
    if (confirm("Reset logo to default icon?")) {
      deleteImage('site.logo');
      toast.info("Logo reset to default.");
    }
  };

  // --- HANDLERS LAINNYA ---
  const openWaSettings = () => {
    setWaConfig({ phone: content["contact.phone"] || "", template: content["contact.wa_template"] || "" });
    setIsWaSettingsOpen(true);
  };

  const saveWaSettings = () => {
    updateContent("contact.phone", waConfig.phone);
    updateContent("contact.wa_template", waConfig.template);
    setIsWaSettingsOpen(false);
    toast.success("WhatsApp settings saved!");
  };

  const openContactSettings = () => {
    setContactConfig({
      monFri: content["contact.hours.mon_fri"] || "",
      sat: content["contact.hours.sat"] || "",
      sun: content["contact.hours.sun"] || "",
      ig: content["social.instagram"] || "",
      fb: content["social.facebook"] || "",
      yt: content["social.youtube"] || "",
      li: content["social.linkedin"] || "",
      tw: content["social.twitter"] || "",
    });
    setIsContactSettingsOpen(true);
  };

  const saveContactSettings = () => {
    updateContent("contact.hours.mon_fri", contactConfig.monFri);
    updateContent("contact.hours.sat", contactConfig.sat);
    updateContent("contact.hours.sun", contactConfig.sun);
    updateContent("social.instagram", contactConfig.ig);
    updateContent("social.facebook", contactConfig.fb);
    updateContent("social.youtube", contactConfig.yt);
    updateContent("social.linkedin", contactConfig.li);
    updateContent("social.twitter", contactConfig.tw);
    setIsContactSettingsOpen(false);
    toast.success("Contact settings updated!");
  };

  const openAboutSettings = () => {
    setAboutConfig({ title: content["about.modal_title"] || "", content: content["about.modal_content"] || "" });
    setIsAboutSettingsOpen(true);
  };

  const saveAboutSettings = () => {
    updateContent("about.modal_title", aboutConfig.title);
    updateContent("about.modal_content", aboutConfig.content);
    setIsAboutSettingsOpen(false);
    toast.success("Bio updated!");
  };

  const handleFinish = () => { toast.success("All changes synced!"); navigate('/admin'); };

  const handleReset = () => {
    if (confirm("Reset all content?")) {
      resetContent();
      toast.info("Content reset.");
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* --- TOOLBAR --- */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-zinc-900 border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="text-white hover:bg-white/10"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</Button>
          <p className="text-white font-medium text-sm hidden md:block text-orange-500 italic">Editor Active</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Button variant="outline" size="sm" onClick={openSiteSettings} className="bg-transparent border-white/20 text-white"><Layout className="w-4 h-4 mr-2 text-blue-400" /> Branding</Button>
          <Button variant="outline" size="sm" onClick={() => setIsCertOpen(true)} className="bg-transparent border-white/20 text-white"><Award className="w-4 h-4 mr-2 text-yellow-500" /> Sertifikat</Button>
          <Button variant="destructive" size="sm" onClick={handleReset}><RotateCcw className="w-4 h-4 mr-2" />Reset</Button>
          <Button className="bg-green-600 hover:bg-green-700 font-bold" size="sm" onClick={handleFinish}><Save className="w-4 h-4 mr-2" /> Selesai</Button>
        </div>
      </div>

      <div className="pt-16"><div className="editor-wrapper"><Home /></div></div>

      {/* --- ✅ DIALOG SITE BRANDING --- */}
      <Dialog open={isSiteSettingsOpen} onOpenChange={setIsSiteSettingsOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle className="flex items-center gap-2 text-blue-400"><Layout /> Branding Identity</DialogTitle></DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-[10px] uppercase opacity-50 ml-1">Brand Name</Label>
              <div className="flex gap-2">
                <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="bg-black/50 border-white/20" />
                <Button onClick={saveSiteName} className="bg-blue-600">Update</Button>
              </div>
            </div>
            <div className="space-y-3 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] uppercase opacity-50 ml-1">Site Logo</Label>
                {images['site.logo'] && (
                  <Button variant="ghost" size="sm" onClick={handleResetLogo} className="h-6 text-[10px] text-red-400 hover:bg-red-500/10 px-2">
                    <RefreshCcw className="w-3 h-3 mr-1" /> Reset to Default
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-5 bg-black/30 p-4 rounded-2xl border border-white/5">
                <div className="w-24 h-24 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 relative">
                  {images['site.logo'] ? (
                    <img src={images['site.logo']} className="w-full h-full object-contain p-2" alt="Preview" />
                  ) : (
                    <Dumbbell className="w-10 h-10 text-white/20" />
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <Button variant="outline" size="sm" onClick={() => logoInputRef.current?.click()} className="w-full bg-zinc-800 text-xs">
                    <CropIcon className="w-3 h-3 mr-2" /> Pilih & Crop Logo
                  </Button>
                  <p className="text-[9px] text-white/30 italic">Format PNG/SVG transparan disarankan.</p>
                </div>
                <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={onFileChange} />
              </div>
            </div>
          </div>
          <DialogFooter><Button variant="ghost" onClick={() => setIsSiteSettingsOpen(false)} className="text-white hover:bg-white/5">Tutup</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- ✅ DIALOG CROPPER UI --- */}
      <Dialog open={isCropperOpen} onOpenChange={(o) => { if (!o) { setIsCropperOpen(false); setIsSiteSettingsOpen(true); } }}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-lg shadow-2xl">
          <DialogHeader><DialogTitle className="flex items-center gap-2 text-blue-400"><CropIcon /> Adjust Logo</DialogTitle></DialogHeader>
          <div className="space-y-6 py-4">
            <div className="relative w-full h-[300px] bg-black/50 rounded-xl overflow-hidden border border-white/10">
              {imageSrc && (
                <Cropper
                  image={imageSrc} crop={crop} zoom={zoom} aspect={1}
                  onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom}
                />
              )}
            </div>
            <div className="flex items-center gap-4 px-2">
              <ZoomOut className="w-4 h-4 text-white/50" />
              <Slider value={[zoom]} min={1} max={3} step={0.1} onValueChange={(v) => setZoom(v[0])} className="flex-1" />
              <ZoomIn className="w-4 h-4 text-white/50" />
            </div>
          </div>
          <DialogFooter className="flex justify-between items-center gap-2">
            <Button variant="ghost" onClick={() => { setIsCropperOpen(false); setIsSiteSettingsOpen(true); }} className="text-white hover:bg-white/5">Batal</Button>
            <Button onClick={handleSaveCroppedLogo} className="bg-blue-600 hover:bg-blue-700 font-bold px-6"><CropIcon className="w-4 h-4 mr-2" /> Simpan Hasil Crop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- DIALOG LAINNYA (Sertifikat, Kontak, WA, Bio) --- */}
      <Dialog open={isCertOpen} onOpenChange={setIsCertOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle className="flex items-center gap-2 text-yellow-500"><Award /> Certificates Manager</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3">
              <Input placeholder="Certificate Name" value={newCert.name} onChange={e => setNewCert({ ...newCert, name: e.target.value })} className="bg-zinc-800" />
              <Input placeholder="Issuer" value={newCert.issuer} onChange={e => setNewCert({ ...newCert, issuer: e.target.value })} className="bg-zinc-800" />
              <Button className="w-full bg-orange-600" onClick={() => { if (newCert.name && newCert.issuer) { addCertificate(newCert); setNewCert({ name: '', issuer: '' }); toast.success("Added!"); } }}>Add Certificate</Button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
              {certificates.map(c => (
                <div key={c.id} className="flex justify-between items-center bg-zinc-800/50 p-3 rounded-lg border border-white/5">
                  <div><div className="text-sm font-bold text-white">{c.name}</div><div className="text-[10px] opacity-40 uppercase">{c.issuer}</div></div>
                  <Button variant="ghost" size="sm" onClick={() => { deleteCertificate(c.id); toast.info("Deleted."); }} className="text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Kontak & Bio (Struktur sama seperti kodingan sebelumnya) */}
      <Dialog open={isContactSettingsOpen} onOpenChange={setIsContactSettingsOpen}>
        <DialogContent className="bg-zinc-900 text-white max-w-2xl">{/* Isi UI Kontak */}</DialogContent>
      </Dialog>
      <Dialog open={isAboutSettingsOpen} onOpenChange={setIsAboutSettingsOpen}>
        <DialogContent className="bg-zinc-900 text-white max-w-xl">{/* Isi UI Bio */}</DialogContent>
      </Dialog>
      <Dialog open={isWaSettingsOpen} onOpenChange={setIsWaSettingsOpen}>
        <DialogContent className="bg-zinc-900 text-white">{/* Isi UI WA */}</DialogContent>
      </Dialog>
    </div>
  );
}