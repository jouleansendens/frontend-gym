import { useState, useEffect } from 'react';
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
import { Plus, Pencil, Trash2, Sparkles, Banknote } from 'lucide-react'; // Changed DollarSign to Banknote for a more general feel
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

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(pricing.length / itemsPerPage);
  const paginatedPricing = pricing.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔍 Monitor dialog state
  useEffect(() => {
    console.log('📊 Dialog State Changed:', isDialogOpen);
    if (isDialogOpen) {
      console.log('✅ Dialog SHOULD be visible now');
      console.log('EditingItem:', editingItem);
      console.log('FormData:', formData);
    }
  }, [isDialogOpen, editingItem, formData]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', period: 'per month', description: '', featuresText: '', popular: false });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: PricingItem) => {
    console.log('🔥 EDIT BUTTON CLICKED!');
    console.log('Pricing data:', item);

    try {
      // ✅ Parse features - backend returns JSON string
      let featuresArray: string[] = [];
      if (typeof item.features === 'string') {
        try {
          featuresArray = JSON.parse(item.features);
        } catch (e) {
          console.error('Failed to parse features:', e);
          featuresArray = [];
        }
      } else if (Array.isArray(item.features)) {
        featuresArray = item.features;
      }

      setEditingItem(item);
      setFormData({
        name: item.name || '',
        price: item.price || '',
        period: item.period || 'per month',
        description: item.description || '',
        featuresText: featuresArray.join('\n'),
        popular: item.popular || false
      });
      setIsDialogOpen(true);
      console.log('✅ Dialog opened successfully');
    } catch (error) {
      console.error('❌ Error opening edit dialog:', error);
      alert('Error loading pricing data. Check console.');
    }
  };

  const handleSubmit = () => {
    const featuresArray = formData.featuresText.split('\n').filter(line => line.trim() !== '');

    if (editingItem) {
      updatePricing(editingItem.id, {
        ...formData,
        features: featuresArray
      });
      toast.success("Pricing plan updated!");
    } else {
      addPricing({
        ...formData,
        features: featuresArray
      });
      toast.success("New pricing plan added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      deletePricing(id);
      toast.success("Plan deleted.");
    }
  };

  // Helper to format currency display
  const formatRupiah = (value: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(parseInt(value) || 0);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Manage Pricing</h2>
            <p className="text-white/60">Manage pricing packages and the features offered.</p>
          </div>
          <Button onClick={handleOpenAdd} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Plan
          </Button>
        </div>

        <Card className="bg-zinc-900 border-white/10 text-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/60">Plan Name</TableHead>
                  <TableHead className="text-white/60">Price</TableHead>
                  <TableHead className="text-white/60 hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-white/60 text-center">Popular</TableHead>
                  <TableHead className="text-white/60 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPricing.map((item) => (
                  <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-orange-500 font-bold">
                      {formatRupiah(item.price)}
                    </TableCell>
                    <TableCell className="text-white/60 hidden md:table-cell truncate max-w-xs">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.popular && <Sparkles className="h-4 w-4 text-yellow-500 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleOpenEdit(item);
                          }}
                          className="hover:bg-white/10 text-white/80 cursor-pointer"
                        >
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

        {/* ✅ PAGINATION - Premium Design */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-widest">
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, pricing.length)} of {pricing.length} plans
            </p>
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${currentPage === 1 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Prev
              </button>
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${currentPage === page ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-white/40 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${currentPage === totalPages ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* Dialog Form */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Plan Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-black/40 border-white/20"
                    placeholder="Basic Plan"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Price (Rp)</label>
                  <div className="relative">
                    <Banknote className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
                    <Input
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="bg-black/40 border-white/20 pl-9"
                      placeholder="500000"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Period</label>
                <Input
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="bg-black/40 border-white/20"
                  placeholder="per month"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Short Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-black/40 border-white/20"
                  placeholder="A short description of this plan..."
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Features (One per line)</label>
                <Textarea
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="bg-black/40 border-white/20 min-h-[100px]"
                  placeholder="24/7 Gym Access&#10;Free Towels&#10;Private Locker"
                />
              </div>

              <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg border border-white/10">
                <Switch
                  id="popular-mode"
                  checked={formData.popular}
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, popular: checked })}
                />
                <Label htmlFor="popular-mode" className="text-white cursor-pointer">Set as "Most Popular" plan</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white hover:bg-white/10">Cancel</Button>
              <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
                {editingItem ? 'Save Changes' : 'Add Plan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}