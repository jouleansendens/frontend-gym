import { useState } from 'react';
import { useContent, ServiceItem } from '../../context/ContentContext';
import AdminLayout from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { iconMap } from '../../components/Services'; // Import mapping icon
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ManageServices() {
  const { services, addService, updateService, deleteService } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconName: 'Dumbbell',
    featuresText: '' // Kita input features sebagai text baris baru agar simpel
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({ title: '', description: '', iconName: 'Dumbbell', featuresText: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      featuresText: service.features.join('\n')
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const featuresArray = formData.featuresText.split('\n').filter(line => line.trim() !== '');
    
    if (editingService) {
      updateService(editingService.id, {
        title: formData.title,
        description: formData.description,
        iconName: formData.iconName,
        features: featuresArray
      });
      toast.success("Service berhasil diperbarui!");
    } else {
      addService({
        title: formData.title,
        description: formData.description,
        iconName: formData.iconName,
        features: featuresArray
      });
      toast.success("Service baru berhasil ditambahkan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus layanan ini?")) {
      deleteService(id);
      toast.success("Service dihapus.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Manage Services</h2>
            <p className="text-white/60">Kelola daftar layanan yang ditampilkan di landing page.</p>
          </div>
          <Button onClick={handleOpenAdd} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Service
          </Button>
        </div>

        <Card className="bg-zinc-900 border-white/10 text-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/60">Icon</TableHead>
                  <TableHead className="text-white/60">Judul Layanan</TableHead>
                  <TableHead className="text-white/60 hidden md:table-cell">Deskripsi</TableHead>
                  <TableHead className="text-white/60 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => {
                  const Icon = iconMap[service.iconName] || iconMap.Dumbbell;
                  return (
                    <TableRow key={service.id} className="border-white/10 hover:bg-white/5">
                      <TableCell>
                        <div className="bg-white/10 p-2 rounded-md w-fit">
                          <Icon className="h-5 w-5 text-orange-500" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell className="text-white/60 hidden md:table-cell truncate max-w-xs">
                        {service.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(service)} className="hover:bg-white/10 text-white/80">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)} className="hover:bg-red-500/20 text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog Form Add/Edit */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Nama Layanan</label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-black/40 border-white/20" 
                  placeholder="Contoh: 1-on-1 Coaching"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Pilih Ikon</label>
                <Select 
                  value={formData.iconName} 
                  onValueChange={(val) => setFormData({...formData, iconName: val})}
                >
                  <SelectTrigger className="bg-black/40 border-white/20">
                    <SelectValue placeholder="Pilih icon" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-white/10 text-white">
                    {Object.keys(iconMap).map(iconName => (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          {/* Render icon kecil di dropdown */}
                          {(() => { const Ico = iconMap[iconName]; return <Ico className="h-4 w-4" /> })()} 
                          {iconName}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Deskripsi Singkat</label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-black/40 border-white/20" 
                  placeholder="Jelaskan layanan ini..."
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Fitur (Satu per baris)</label>
                <Textarea 
                  value={formData.featuresText}
                  onChange={(e) => setFormData({...formData, featuresText: e.target.value})}
                  className="bg-black/40 border-white/20 min-h-[100px]" 
                  placeholder="Custom Plan&#10;Weekly Check-in&#10;Nutrition Guide"
                />
                <p className="text-xs text-white/40">*Tekan Enter untuk memisahkan setiap fitur.</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white hover:bg-white/10">Batal</Button>
              <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
                {editingService ? 'Simpan Perubahan' : 'Tambah'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}