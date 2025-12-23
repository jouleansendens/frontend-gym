import { 
  LayoutDashboard, 
  MessageSquareQuote, // Ikon untuk Testimoni
  Settings, 
  Users,
  Trophy,
  DollarSign
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items dashboard Anda
const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Messages", url: "/admin/messages", icon: Users },
  { title: "Manage Pricing", url: "/admin/pricing", icon: DollarSign },
  // ✅ TAMBAHKAN MENU TESTIMONIALS DI SINI
  { 
    title: "Manage Testimonials", 
    url: "/admin/testimonials", 
    icon: MessageSquareQuote 
  },
  { title: "Leaderboard", url: "/admin/leaderboard", icon: Trophy },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}