import { useState, useEffect } from 'react';
import AdminLayout from '../components/layouts/AdminLayout'; // Path diperbaiki
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Users, 
  Mail, 
  LayoutGrid, 
  Star, 
  TrendingUp, 
  Download, 
  Calendar as CalendarIcon,
  Loader2,
  ArrowUpRight
} from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Data Dummy untuk Grafik (Tetap dipertahankan untuk estetika)
const dataRevenue = [
  { name: "Jan", total: 1500 }, { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 }, { name: "Apr", total: 4500 },
  { name: "May", total: 3800 }, { name: "Jun", total: 5200 },
  { name: "Jul", total: 5800 }, { name: "Aug", total: 6500 },
];

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load data statistik dari MySQL melalui Laravel
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://trainwithbraden.com/api/admin/dashboard-stats', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Mengirim token asli
          }
        });
        const result = await response.json();
        if (response.ok) {
          setData(result);
        }
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        
        {/* Header Dashboard */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
            <p className="text-white/60">Ringkasan performa gym berdasarkan database MySQL Anda.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 hidden md:flex">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-zinc-900 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-white/60">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white/60" disabled>Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            
            {/* KPI Cards: Diambil dari stats backend */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard 
                title="Pesan Masuk" 
                value={data?.stats?.total_messages || 0} 
                trend={`${data?.stats?.unread_messages || 0} baru`} 
                icon={Mail} 
                subtext="total inbox"
              />
              <StatsCard 
                title="Layanan Aktif" 
                value={data?.stats?.total_services || 0} 
                trend="Live" 
                icon={LayoutGrid} 
                subtext="paket di landing page"
              />
              <StatsCard 
                title="Testimonial" 
                value={data?.stats?.total_testimonials || 0} 
                trend="Verified" 
                icon={Star} 
                subtext="review pelanggan"
              />
              <StatsCard 
                title="Member Aktif" 
                value={data?.stats?.active_members || 0} 
                trend="Leaderboard" 
                icon={Users} 
                subtext="total kompetitor"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Grafik Overview Pendapatan */}
              <Card className="col-span-4 bg-zinc-900 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Aktivitas Pendapatan</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={dataRevenue}>
                      <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                      />
                      <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Leaderboard dari database */}
              <Card className="col-span-3 bg-zinc-900 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Top Members</CardTitle>
                  <CardDescription className="text-white/60">Berdasarkan data Leaderboard MySQL.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {data?.top_leaderboard?.map((member: any, index: number) => (
                      <div key={member.id} className="flex items-center">
                        <span className="w-6 text-sm font-bold text-orange-500">#{index + 1}</span>
                        <Avatar className="h-9 w-9 border border-white/10 ml-2">
                          <AvatarFallback className="bg-orange-500/10 text-orange-500 font-bold">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{member.name}</p>
                          <p className="text-xs text-white/50">{member.steps.toLocaleString()} Steps</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabel Pesan Masuk dari database */}
            <Card className="bg-zinc-900 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Pesan Klien Terbaru</CardTitle>
                <CardDescription className="text-white/60">Detail pesan masuk dari form kontak.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-white/60">Pengirim</TableHead>
                      <TableHead className="text-white/60">Tujuan Fitnes</TableHead>
                      <TableHead className="text-white/60">Status</TableHead>
                      <TableHead className="text-right text-white/60">Waktu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.recent_messages?.map((msg: any) => (
                      <TableRow key={msg.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">
                          <div>{msg.first_name} {msg.last_name}</div>
                          <div className="text-xs text-white/40">{msg.email}</div>
                        </TableCell>
                        <TableCell className="text-white/70">{msg.goal}</TableCell>
                        <TableCell>
                          <Badge className={msg.is_read ? "bg-zinc-800 text-white/50" : "bg-orange-500/20 text-orange-500 border-orange-500/20"}>
                            {msg.is_read ? 'Dibaca' : 'Baru'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-white/40 text-xs">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

function StatsCard({ title, value, trend, subtext, icon: Icon }: any) {
  return (
    <Card className="bg-zinc-900 border-white/10 text-white hover:border-orange-500/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/70">{title}</CardTitle>
        <div className="bg-white/5 p-2 rounded-full">
          <Icon className="h-4 w-4 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-white/50 flex items-center mt-1">
          <span className="text-green-500 flex items-center mr-1">
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
            {trend}
          </span>
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
}