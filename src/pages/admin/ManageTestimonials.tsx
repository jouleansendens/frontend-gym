import { useState, useCallback } from 'react'; // ✅ Tambah useCallback
import { useContent } from '../../context/ContentContext';
import AdminLayout from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Slider } from '../../components/ui/slider'; // ✅ Pastikan ada Slider shadcn
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog'; // ✅ Tambah Dialog
import { Trash2, Plus, Star, Image as ImageIcon, MessageSquareQuote, Crop as CropIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';
import Cropper from 'react-easy-crop'; // ✅ Import Cropper

// --- HELPER UNTUK PROSES CROP ---
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string | null> {
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

  return canvas.toDataURL('image/jpeg'); // Hasil akhir Base64
}

export default function ManageTestimonials() {
  const {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateContent,
    content
  } = useContent();

  const [newTesti, setNewTesti] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    image: ''
  });

  // --- STATE KHUSUS CROPPER ---
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  // ✅ State untuk track perubahan visibility (toggle)
  const [localVisibility, setLocalVisibility] = useState<Record<string, boolean>>({});

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const paginatedTestimonials = testimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handler Pilih File
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null);
        setIsCropperOpen(true); // Buka modal crop setelah pilih file
      });
      reader.readAsDataURL(file);
    }
  };

  // Callback saat crop selesai diatur
  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Simpan hasil crop
  const handleSaveCroppedImage = useCallback(async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedBase64 = await getCroppedImg(imageSrc, croppedAreaPixels);
        if (croppedBase64) {
          setNewTesti({ ...newTesti, image: croppedBase64 });
          setIsCropperOpen(false);
          setImageSrc(null);
          toast.success("Foto berhasil dipotong!");
        }
      }
    } catch (e) {
      toast.error("Gagal memotong gambar.");
    }
  }, [imageSrc, croppedAreaPixels, newTesti]);

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 text-white space-y-8 bg-black/50 min-h-screen">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageSquareQuote className="text-orange-500 w-8 h-8" /> Manage Testimonials
            </h1>
            <p className="text-white/40 mt-1">Kendalikan cerita sukses klien dan pengaturan tampilan landing page.</p>
          </div>
        </div>

        {/* --- CONFIG: JUMLAH TAMPILAN --- */}
        <div className="bg-zinc-900/50 border border-orange-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-orange-500/5">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-lg text-orange-500 flex items-center gap-2 justify-center md:justify-start">
              Display Configuration
            </h3>
            <p className="text-sm text-white/40">Tentukan jumlah testimoni aktif yang akan muncul di website (Kelipatan 3 disarankan).</p>
          </div>
          <div className="flex items-center gap-3 bg-black/40 p-2 rounded-xl border border-white/5">
            <Label className="text-xs font-black uppercase text-white/30 ml-2">Show Count:</Label>
            <select
              value={content["testimonial.display_count"] || "3"}
              onChange={(e) => updateContent("testimonial.display_count", e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-orange-500 outline-none transition-all cursor-pointer"
            >
              <option value="3">3 Testimonials</option>
              <option value="6">6 Testimonials</option>
              <option value="9">9 Testimonials</option>
              <option value="12">12 Testimonials</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* --- COLUMN 1: FORM TAMBAH --- */}
          <div className="bg-zinc-900 border border-white/5 p-4 md:p-6 rounded-2xl space-y-4 md:space-y-6 flex flex-col">
            <h3 className="font-bold flex items-center gap-2 border-b border-white/5 pb-4">
              <Plus className="w-4 h-4 text-orange-500" /> New Success Story
            </h3>

            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-black border-2 border-dashed border-white/10 overflow-hidden relative group transition-all hover:border-orange-500/50 cursor-pointer">
                  {newTesti.image ? (
                    <img src={newTesti.image} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-1">
                      <ImageIcon className="w-6 h-6" />
                      <span className="text-[8px] uppercase font-bold">Pilih Foto</span>
                    </div>
                  )}
                  <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-white/40 uppercase">Client Name</Label>
                <Input value={newTesti.name} onChange={e => setNewTesti({ ...newTesti, name: e.target.value })} className="bg-black/50 border-white/10 focus:border-orange-500/50" placeholder="e.g. Michael Chen" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-white/40 uppercase">Jobs / Achievements</Label>
                <Input value={newTesti.role} onChange={e => setNewTesti({ ...newTesti, role: e.target.value })} className="bg-black/50 border-white/10 focus:border-orange-500/50" placeholder="e.g. Lost 20kg in 3 months" />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <Label className="text-xs text-white/40 uppercase">Review Text</Label>
                <Textarea value={newTesti.text} onChange={e => setNewTesti({ ...newTesti, text: e.target.value })} className="bg-black/50 border-white/10 min-h-[200px] flex-1 focus:border-orange-500/50 resize-none" placeholder="What is their experience?" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-white/40 uppercase">Rating</Label>
                <div className="flex gap-2 p-3 bg-black/30 rounded-xl justify-center">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      onClick={() => setNewTesti({ ...newTesti, rating: num })}
                      className={`w-6 h-6 cursor-pointer transition-all ${num <= newTesti.rating ? 'fill-orange-500 text-orange-500 scale-110' : 'text-white/10 hover:text-white/30'}`}
                    />
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 font-bold py-6 shadow-lg shadow-orange-600/20"
                onClick={() => {
                  if (!newTesti.name || !newTesti.text) return toast.error("Mohon lengkapi nama dan isi testimoni!");
                  addTestimonial(newTesti);
                  setNewTesti({ name: '', role: '', text: '', rating: 5, image: '' });
                  toast.success("Testimoni berhasil ditambahkan!");
                }}
              >
                Add Testimonial
              </Button>
            </div>
          </div>

          {/* --- COLUMN 2: LIST TESTIMONI --- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2">
              <Label className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-black">
                Database Testimoni ({testimonials.length})
              </Label>
            </div>

            <div className="grid gap-4">
              {paginatedTestimonials.length === 0 ? (
                <div className="text-center py-32 bg-zinc-900/20 rounded-3xl border border-dashed border-white/5">
                  <MessageSquareQuote className="w-12 h-12 text-white/5 mx-auto mb-4" />
                  <p className="text-white/20 italic">Belum ada testimoni. Mulai tambahkan cerita sukses pertama Anda.</p>
                </div>
              ) : (
                paginatedTestimonials.map((t) => (
                  <div key={t.id} className="bg-zinc-900 border border-white/5 p-5 rounded-2xl flex items-center justify-between group transition-all hover:border-orange-500/30 hover:bg-zinc-900/80">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-full bg-black border border-white/10 overflow-hidden shrink-0">
                        <img src={t.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" alt={t.name} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg leading-tight">{t.name}</h4>
                        <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">{t.role}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'fill-orange-500 text-orange-500' : 'text-white/5'}`} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* ✅ Status label */}
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${t.isActive || t.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {t.isActive || t.is_active ? 'Visible' : 'Hidden'}
                      </span>

                      {/* ✅ TOGGLE BUTTON - Toggle dan save dalam 1 klik */}
                      <Button
                        variant="default"
                        size="sm"
                        onClick={async () => {
                          const currentActive = t.isActive || t.is_active;
                          const newValue = !currentActive;
                          console.log('🔄 Toggling testimonial:', t.id, 'from', currentActive, 'to', newValue);
                          try {
                            await updateTestimonial(t.id, { is_active: newValue ? 1 : 0 });
                            console.log('✅ Toggle saved successfully');
                            toast.success(newValue ? "✅ Visible" : "❌ Hidden");
                          } catch (error) {
                            console.error('❌ Toggle failed:', error);
                            toast.error("Gagal menyimpan");
                          }
                        }}
                        className={`text-xs px-3 py-1 h-7 ${t.isActive || t.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                      >
                        {t.isActive || t.is_active ? 'Hide' : 'Show'}
                      </Button>

                      <div className="h-8 w-px bg-white/10" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => { if (confirm("Hapus testimoni ini secara permanen?")) deleteTestimonial(t.id); }}
                        className="text-white/30 hover:text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ✅ PAGINATION - Premium Design */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-white/10">
                {/* Page info */}
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, testimonials.length)} of {testimonials.length} testimonials
                </p>

                {/* Pagination buttons */}
                <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
                  {/* Previous */}
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${currentPage === 1
                      ? 'text-white/20 cursor-not-allowed'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Prev
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${currentPage === page
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'text-white/40 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${currentPage === totalPages
                      ? 'text-white/20 cursor-not-allowed'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL CROPPER --- */}
      <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-500">
              <CropIcon className="w-5 h-5" /> Sesuaikan Foto Klien
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Area Cropping */}
            <div className="relative w-full h-[300px] bg-black rounded-xl overflow-hidden border border-white/10">
              {imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // ✅ Kunci aspek rasio 1:1 (Persegi)
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              )}
            </div>

            {/* Slider Zoom */}
            <div className="flex items-center gap-4 px-2">
              <ZoomOut className="w-4 h-4 text-white/50" />
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(v) => setZoom(v[0])}
                className="flex-1"
              />
              <ZoomIn className="w-4 h-4 text-white/50" />
            </div>
          </div>

          <DialogFooter className="flex justify-between gap-2">
            <Button variant="ghost" onClick={() => setIsCropperOpen(false)} className="text-white">Batal</Button>
            <Button onClick={handleSaveCroppedImage} className="bg-orange-600 hover:bg-orange-700 font-bold px-8">
              Potong & Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </AdminLayout >
  );
}