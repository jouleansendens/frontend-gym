import { useState } from 'react';
import { useContent, LeaderboardItem } from '../../context/ContentContext';
import AdminLayout from '../../components/layouts/AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Pencil, Trash2, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function ManageLeaderboard() {
  const { leaderboard, addLeaderboardEntry, updateLeaderboardEntry, deleteLeaderboardEntry } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LeaderboardItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    steps: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', steps: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: LeaderboardItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      steps: item.steps.toString()
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.steps) {
      toast.error("Please fill in both name and steps");
      return;
    }

    const stepsNumber = parseInt(formData.steps.replace(/,/g, ''), 10); // Hapus koma jika ada

    if (isNaN(stepsNumber)) {
      toast.error("Steps must be a number");
      return;
    }

    if (editingItem) {
      updateLeaderboardEntry(editingItem.id, { name: formData.name, steps: stepsNumber });
      toast.success("Entry updated!");
    } else {
      addLeaderboardEntry({ name: formData.name, steps: stepsNumber });
      toast.success("New entry added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this person?")) {
      deleteLeaderboardEntry(id);
      toast.success("Entry deleted.");
    }
  };

  // Sort descending untuk admin view
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.steps - a.steps);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Steps Leaderboard</h2>
            <p className="text-white/60">Update your clients' weekly steps here.</p>
          </div>
          <Button onClick={handleOpenAdd} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>

        <Card className="bg-zinc-900 border-white/10 text-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/60 w-[100px]">Rank</TableHead>
                  <TableHead className="text-white/60">Client Name</TableHead>
                  <TableHead className="text-white/60 text-right">Steps</TableHead>
                  <TableHead className="text-white/60 text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeaderboard.map((item, index) => (
                  <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-bold text-lg">
                      {index === 0 && <span className="text-yellow-500">🥇</span>}
                      {index === 1 && <span className="text-gray-300">🥈</span>}
                      {index === 2 && <span className="text-orange-700">🥉</span>}
                      {index > 2 && <span className="text-white/50">#{index + 1}</span>}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right font-mono text-orange-400">
                      {item.steps.toLocaleString()}
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
                {leaderboard.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-white/40">
                      No data yet. Start adding clients!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                {editingItem ? 'Edit Entry' : 'Add Client Steps'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Client Name</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-black/40 border-white/20" 
                  placeholder="e.g. Sarah J."
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Weekly Steps</label>
                <Input 
                  type="number"
                  value={formData.steps}
                  onChange={(e) => setFormData({...formData, steps: e.target.value})}
                  className="bg-black/40 border-white/20" 
                  placeholder="e.g. 75000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}