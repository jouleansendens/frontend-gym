import { useState, useEffect } from 'react';
import AdminLayout from '../components/layouts/AdminLayout';
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
  ArrowUpRight,
  Eye,
  MessageSquare,
  Trophy,
  Zap,
  Settings,
  Plus
} from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useNavigate } from 'react-router-dom';

const dataRevenue = [
  { name: "Jan", total: 1500 }, { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 }, { name: "Apr", total: 4500 },
  { name: "May", total: 3800 }, { name: "Jun", total: 5200 },
  { name: "Jul", total: 5800 }, { name: "Aug", total: 6500 },
];

// Helper: Format relative time
function getRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard-stats`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const result = await response.json();
        if (response.ok) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
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

  // Calculate total revenue
  const totalRevenue = dataRevenue.reduce((sum, item) => sum + item.total, 0);

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">

        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back! 👋</h2>
            <p className="text-white/60 mt-1">Here's what's happening with your fitness business today</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 hidden md:flex">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickActionCard
            title="View Site"
            icon={Eye}
            onClick={() => window.open('/', '_blank')}
          />
          <QuickActionCard
            title="Messages"
            icon={MessageSquare}
            badge={data?.stats?.unread_messages || 0}
            onClick={() => navigate('/admin/inbox')}
          />
          <QuickActionCard
            title="Add Service"
            icon={Plus}
            onClick={() => navigate('/admin/services')}
          />
          <QuickActionCard
            title="Settings"
            icon={Settings}
            onClick={() => navigate('/admin/settings')}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-zinc-900 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-white/60">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white/60" disabled>Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Client Inquiries"
                value={data?.stats?.total_messages || 0}
                trend={`+${data?.stats?.unread_messages || 0}`}
                icon={Mail}
                subtext="new this week"
                trendPositive={true}
              />
              <StatsCard
                title="Active Services"
                value={data?.stats?.total_services || 0}
                trend="Live"
                icon={LayoutGrid}
                subtext="on your website"
                trendPositive={true}
              />
              <StatsCard
                title="Client Reviews"
                value={data?.stats?.total_testimonials || 0}
                trend="Verified"
                icon={Star}
                subtext="testimonials"
                trendPositive={true}
              />
              <StatsCard
                title="Active Challengers"
                value={data?.stats?.active_members || 0}
                trend="Competing"
                icon={Trophy}
                subtext="in leaderboard"
                trendPositive={true}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Revenue Chart */}
              <Card className="col-span-4 bg-zinc-900 border-white/10 text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Monthly Revenue Trend</CardTitle>
                      <CardDescription className="text-white/60 mt-1">
                        Total: ${totalRevenue.toLocaleString()} YTD
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-green-500 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12.5%
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={dataRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis
                        dataKey="name"
                        stroke="#888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `$${v / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181b',
                          border: '1px solid #f97316',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                      />
                      <Bar dataKey="total" fill="#f97316" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="col-span-3 bg-zinc-900 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-orange-500" />
                    Top Performers
                  </CardTitle>
                  <CardDescription className="text-white/60">Your most active members this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {data?.top_leaderboard?.map((member: any, index: number) => {
                      const maxSteps = data?.top_leaderboard[0]?.steps || 1;
                      const percentage = (member.steps / maxSteps) * 100;
                      const medals = ['🥇', '🥈', '🥉'];

                      return (
                        <div key={member.id} className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{medals[index] || '🏅'}</span>
                            <Avatar className="h-9 w-9 border border-white/10">
                              <AvatarFallback className="bg-orange-500/10 text-orange-500 font-bold text-sm">
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium leading-none">{member.name}</p>
                              <p className="text-xs text-white/50 mt-1">{member.steps.toLocaleString()} steps</p>
                            </div>
                            <Zap className="h-4 w-4 text-yellow-500" />
                          </div>
                          {/* Progress bar */}
                          <div className="w-full bg-white/5 rounded-full h-1.5 ml-11">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Messages Table */}
            <Card className="bg-zinc-900 border-white/10 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Latest Client Inquiries</CardTitle>
                    <CardDescription className="text-white/60 mt-1">New leads from your website</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10"
                    onClick={() => navigate('/admin/inbox')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-white/60">Client</TableHead>
                      <TableHead className="text-white/60">Fitness Goal</TableHead>
                      <TableHead className="text-white/60">Status</TableHead>
                      <TableHead className="text-right text-white/60">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.recent_messages?.slice(0, 5).map((msg: any) => (
                      <TableRow
                        key={msg.id}
                        className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => navigate('/admin/inbox')}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-orange-500/10 text-orange-500 text-xs">
                                {msg.first_name?.charAt(0)}{msg.last_name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm">{msg.first_name} {msg.last_name}</div>
                              <div className="text-xs text-white/40">{msg.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white/70">
                          <Badge variant="outline" className="border-white/10 text-white/60">
                            {msg.goal}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={msg.is_read
                            ? "bg-zinc-800 text-white/50 border-white/10"
                            : "bg-orange-500 text-white"
                          }>
                            {msg.is_read ? 'Read' : 'New'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-white/60 text-xs">
                          {getRelativeTime(msg.created_at)}
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

function StatsCard({ title, value, trend, subtext, icon: Icon, trendPositive }: any) {
  return (
    <Card className="bg-zinc-900 border-white/10 text-white hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/70">{title}</CardTitle>
        <div className="bg-orange-500/10 p-2.5 rounded-lg">
          <Icon className="h-4 w-4 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-white/50 flex items-center mt-2">
          <span className={`flex items-center mr-1 font-medium ${trendPositive ? 'text-green-500' : 'text-white/60'}`}>
            {trendPositive && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
            {trend}
          </span>
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({ title, icon: Icon, badge, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="relative bg-zinc-900 border border-white/10 rounded-lg p-4 hover:border-orange-500/50 hover:bg-white/5 transition-all group"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="bg-orange-500/10 p-3 rounded-lg group-hover:bg-orange-500/20 transition-colors">
          <Icon className="h-5 w-5 text-orange-500" />
        </div>
        <span className="text-sm font-medium text-white/80">{title}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}