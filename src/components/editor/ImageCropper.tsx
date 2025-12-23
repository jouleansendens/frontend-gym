import { useState, useRef } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '../ui/button';
import { Upload, Check, X, Crop as CropIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

// --- FUNGSI HELPER ---
async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2d context');

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  
  canvas.width = Math.floor(crop.width * scaleX);
  canvas.height = Math.floor(crop.height * scaleY);

  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

interface ImageCropperProps {
  currentImage: string;
  onSave: (newImageBase64: string) => void;
  // aspectRatio dihapus, kita hitung otomatis
}

export function ImageCropper({ currentImage, onSave }: ImageCropperProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  
  // Ref untuk gambar asli di website (untuk mengukur layout)
  const previewImgRef = useRef<HTMLImageElement>(null);
  
  // Ref untuk gambar di dalam modal crop
  const cropImgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  
  // State untuk menyimpan rasio otomatis
  const [dynamicAspect, setDynamicAspect] = useState<number>(16 / 9);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      
      // 1. HITUNG RASIO OTOMATIS BERDASARKAN GAMBAR YG TAMPIL
      if (previewImgRef.current) {
        const rect = previewImgRef.current.getBoundingClientRect();
        // Hitung rasio: Lebar dibagi Tinggi
        const calculatedAspect = rect.width / rect.height;
        setDynamicAspect(calculatedAspect);
        console.log("Auto Aspect Ratio Detected:", calculatedAspect);
      }

      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
      setIsDialogOpen(true);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    // Gunakan dynamicAspect yang sudah dihitung tadi
    setCrop(centerAspectCrop(width, height, dynamicAspect));
  }

  const handleSave = async () => {
    if (completedCrop && cropImgRef.current) {
      const canvas = document.createElement('canvas');
      await canvasPreview(cropImgRef.current, canvas, completedCrop);
      const base64Image = canvas.toDataURL('image/jpeg');
      onSave(base64Image);
      setIsDialogOpen(false);
      setImgSrc('');
    }
  };

  return (
    <div className="relative group w-full h-full">
      {/* GAMBAR PREVIEW UTAMA 
         Kita pasang ref={previewImgRef} di sini untuk mengukur ukurannya saat ini
      */}
      <img 
        ref={previewImgRef} 
        src={currentImage} 
        alt="Editable" 
        className="w-full h-full object-cover rounded-none transition duration-500 group-hover:brightness-50"
      />

      {/* Tombol Ganti Foto (Pojok Kanan Atas) */}
      <div className="absolute top-4 right-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <label className="cursor-pointer flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-md border border-white/20 hover:bg-orange-500 hover:border-orange-500 transition-all shadow-xl">
          <Upload className="w-4 h-4" />
          <span className="text-sm font-bold">Ganti Foto</span>
          <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
        </label>
      </div>

      {/* Dialog Cropping */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-xl max-h-[90vh] flex flex-col z-[100]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CropIcon className="w-5 h-5 text-orange-500" />
              Sesuaikan Foto
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto p-4 bg-black/50 rounded-lg flex justify-center items-center min-h-[300px]">
            {imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={dynamicAspect} // GUNAKAN RASIO OTOMATIS DI SINI
                className="max-h-[60vh]"
              >
                <img
                  ref={cropImgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="max-w-full max-h-[60vh] object-contain"
                />
              </ReactCrop>
            )}
          </div>

          <div className="text-center text-xs text-white/40 italic mt-2">
            *Kotak potong dikunci sesuai ukuran layout website saat ini.
          </div>

          <DialogFooter className="gap-2 mt-4">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white hover:bg-white/10">
              <X className="w-4 h-4 mr-2" /> Batal
            </Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Check className="w-4 h-4 mr-2" /> Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}