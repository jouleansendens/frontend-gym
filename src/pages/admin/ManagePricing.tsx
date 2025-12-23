import { useState } from 'react';
import { useContent, PricingItem } from '../../context/ContentContext';
import AdminLayout from '../../components/layouts/AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Plus, Pencil, Trash2, Sparkles, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function ManagePricing() {
  const { pricing, addPricing, updatePricing, deletePricing } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: 'per month',
    description: '',
    featuresText: '',
    popular: false
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', period: 'per month', description: '', featuresText: '', popular: false });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: PricingItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      period: item.period,
      description: item.description,
      featuresText: item.features.join('\n'),
      popular: item.popular
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    const featuresArray = formData.featuresText.split('\n').filter(line => line.trim() !== '');
    
    if (editingItem) {
      updatePricing(editingItem.id, {
        ...formData,
        features: featuresArray
      });
      toast.success("Paket harga diperbarui!");
    } else {
      addPricing({
        ...formData,
        features: featuresArray
      });
      toast.success("Paket harga baru ditambahkan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus paket ini?")) {
      deletePricing(id);
      toast.success("Paket dihapus.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Manage Pricing</h2>
            <p className="text-white/60">Atur paket harga dan fitur yang ditawarkan.</p>
          </div>
          <Button onClick={handleOpenAdd} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Paket
          </Button>
        </div>

        <Card className="bg-zinc-900 border-white/10 text-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/60">Nama Paket</TableHead>
                  <TableHead className="text-white/60">Harga</TableHead>
                  <TableHead className="text-white/60 hidden md:table-cell">Deskripsi</TableHead>
                  <TableHead className="text-white/60 text-center">Popular</TableHead>
                  <TableHead className="text-white/60 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricing.map((item) => (
                  <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-orange-500 font-bold">${item.price}</TableCell>
                    <TableCell className="text-white/60 hidden md:table-cell truncate max-w-xs">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.popular && <Sparkles className="h-4 w-4 text-yellow-500 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(item)} className="hover:bg-white/10 text-white/80">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="hover:bg-red-500/20 text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog Form */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Paket' : 'Tambah Paket Baru'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Nama Paket</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-black/40 border-white/20" 
                    placeholder="Basic Plan"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Harga ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
                    <Input 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="bg-black/40 border-white/20 pl-9" 
                      placeholder="99"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Periode</label>
                <Input 
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="bg-black/40 border-white/20" 
                  placeholder="per month"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Deskripsi Singkat</label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-black/40 border-white/20" 
                  placeholder="Deskripsi singkat paket ini..."
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Fitur (Satu per baris)</label>
                <Textarea 
                  value={formData.featuresText}
                  onChange={(e) => setFormData({...formData, featuresText: e.target.value})}
                  className="bg-black/40 border-white/20 min-h-[100px]" 
                  placeholder="Akses Gym 24 Jam&#10;Free Handuk&#10;Loker Pribadi"
                />
              </div>

              <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg border border-white/10">
                <Switch 
                  id="popular-mode" 
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData({...formData, popular: checked})}
                />
                <Label htmlFor="popular-mode" className="text-white cursor-pointer">Jadikan Paket "Most Popular"</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white hover:bg-white/10">Batal</Button>
              <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
                {editingItem ? 'Simpan' : 'Tambah'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}