import { useState } from 'react';
import { useContent, FAQItem } from '../../context/ContentContext';
import AdminLayout from '../../components/layouts/AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Pencil, Trash2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ManageFAQ() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ question: '', answer: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: FAQItem) => {
    setEditingItem(item);
    setFormData({
      question: item.question,
      answer: item.answer
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.question || !formData.answer) {
      toast.error("Please fill in both question and answer");
      return;
    }

    if (editingItem) {
      updateFAQ(editingItem.id, formData);
      toast.success("FAQ updated successfully!");
    } else {
      addFAQ(formData);
      toast.success("New FAQ added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      deleteFAQ(id);
      toast.success("FAQ deleted.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Manage FAQ</h2>
            <p className="text-white/60">Create, edit, and remove frequently asked questions.</p>
          </div>
          <Button onClick={handleOpenAdd} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </div>

        <Card className="bg-zinc-900 border-white/10 text-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/60 w-1/3">Question</TableHead>
                  <TableHead className="text-white/60">Answer</TableHead>
                  <TableHead className="text-white/60 text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((item) => (
                  <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium align-top pt-4">{item.question}</TableCell>
                    <TableCell className="text-white/60 align-top pt-4 whitespace-pre-wrap">{item.answer}</TableCell>
                    <TableCell className="text-right align-top pt-4">
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
                {faqs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-white/40">
                      No FAQs found. Click "Add Question" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog Form */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-900 border-white/10 text-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Question' : 'Add New Question'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Question</label>
                <Input 
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="bg-black/40 border-white/20" 
                  placeholder="e.g. Do I need gym access?"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white/70">Answer</label>
                <Textarea 
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="bg-black/40 border-white/20 min-h-[150px]" 
                  placeholder="Type the answer here..."
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white hover:bg-white/10">Cancel</Button>
              <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
                {editingItem ? 'Save Changes' : 'Add Question'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}