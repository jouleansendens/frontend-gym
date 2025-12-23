import { useState, useMemo } from 'react';
import { useContent, MessageItem } from '../../context/ContentContext';
import AdminLayout from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Trash2, MessageSquare, User, Mail, Calendar, 
  Phone, Target, Eye, X, CheckCircle, Filter, RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

export default function ManageMessages() {
  const { messages, deleteMessage, markMessageAsRead } = useContent();
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [filterDate, setFilterDate] = useState<string>(''); // State untuk filter tanggal

  // --- LOGIKA FILTER ---
  const filteredMessages = useMemo(() => {
    if (!filterDate) return messages;

    return messages.filter((msg) => {
      const messageDate = new Date(msg.date).toISOString().split('T')[0]; // Ambil YYYY-MM-DD
      return messageDate === filterDate;
    });
  }, [messages, filterDate]);

  const handleViewMessage = (msg: MessageItem) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markMessageAsRead(msg.id);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Hapus pesan ini secara permanen?")) {
      deleteMessage(id);
      setSelectedMessage(null);
      toast.success("Pesan dihapus");
    }
  };

  const resetFilter = () => {
    setFilterDate('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Inbox Messages</h2>
            <p className="text-zinc-400">Kelola dan baca pesan dari calon klien Anda.</p>
          </div>
          
          {/* --- UI FILTER TANGGAL --- */}
          <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-2xl border border-white/10">
            <div className="pl-2 text-zinc-500">
              <Filter size={16} />
            </div>
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-transparent text-sm text-white outline-none [color-scheme:dark] cursor-pointer"
            />
            {filterDate && (
              <button 
                onClick={resetFilter}
                className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors"
                title="Reset Filter"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </header>

        <Card className="bg-zinc-900 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-orange-500" />
                Inbox {filterDate ? `(${filteredMessages.length} hasil)` : `(${messages.length})`}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 italic">
                  {filterDate ? `Tidak ada pesan pada tanggal ${filterDate}` : 'Tidak ada pesan masuk.'}
                </p>
                {filterDate && (
                  <Button variant="link" onClick={resetFilter} className="text-orange-500 mt-2">
                    Lihat semua pesan
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      msg.isRead 
                        ? 'bg-white/[0.02] border-white/5 opacity-60' 
                        : 'bg-orange-500/[0.03] border-orange-500/20 shadow-lg shadow-orange-500/5'
                    } hover:border-white/20`}
                    onClick={() => handleViewMessage(msg)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white truncate">{msg.firstName} {msg.lastName}</span>
                        {!msg.isRead && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 mb-1">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(msg.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1 font-bold text-orange-500/80 tracking-tighter uppercase">{msg.goal}</span>
                      </div>
                      <p className="text-sm text-zinc-400 truncate">{msg.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* --- MODAL DETAIL MESSAGE (Sama seperti sebelumnya) --- */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {selectedMessage.firstName} {selectedMessage.lastName}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mt-0.5">
                    {new Date(selectedMessage.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Email Address</p>
                  <div className="flex items-center gap-2 text-zinc-200">
                    <Mail size={16} className="text-orange-500" />
                    <span>{selectedMessage.email}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Phone Number</p>
                  <div className="flex items-center gap-2 text-zinc-200">
                    <Phone size={16} className="text-blue-500" />
                    <span>{selectedMessage.phone || 'Not provided'}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Fitness Goal</p>
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-green-500" />
                    <span className="capitalize text-zinc-200 bg-white/5 px-2 py-0.5 rounded-md text-sm">
                      {selectedMessage.goal}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Status</p>
                  <div className="flex items-center gap-2 text-orange-400 text-sm font-bold">
                    <CheckCircle size={16} />
                    <span>{selectedMessage.isRead ? 'Sudah Dibaca' : 'Baru'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Message Content</p>
                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-zinc-300 leading-relaxed italic">
                  "{selectedMessage.message}"
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 flex gap-3 justify-end bg-white/[0.01]">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedMessage(null)}
                className="text-zinc-400 hover:text-white"
              >
                Close
              </Button>
              <Button 
                variant="destructive" 
                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-red-500/20"
                onClick={() => handleDelete(selectedMessage.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}