import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Truck, Users, History, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
const items = [{
  title: "Dashboard",
  url: "/",
  icon: LayoutDashboard
}, {
  title: "Agendamentos",
  url: "/agendamentos",
  icon: Calendar
}, {
  title: "Entregas",
  url: "/entregas",
  icon: Truck
}, {
  title: "Clientes",
  url: "/clientes",
  icon: Users
}, {
  title: "Histórico",
  url: "/historico",
  icon: History
}, {
  title: "Configurações",
  url: "/configuracoes",
  icon: Settings
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  return <Sidebar collapsible="icon">
      <SidebarContent className="bg-slate-800">
        <SidebarGroup>
          <SidebarGroupLabel className="bg-slate-500">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={({
                  isActive
                }) => isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50"}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}