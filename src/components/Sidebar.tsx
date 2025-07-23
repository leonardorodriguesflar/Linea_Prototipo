import { Calendar, BarChart3, Package, Settings, Users, Clock, Bot, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "schedule", label: "Agendamentos", icon: Calendar },
  { id: "automation", label: "Automação & Robôs", icon: Bot },
  { id: "powerapps-flow", label: "Fluxo Power Apps", icon: Activity },
  { id: "deliveries", label: "Entregas", icon: Package },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "history", label: "Histórico", icon: Clock },
  { id: "settings", label: "Configurações", icon: Settings },
];

export const Sidebar = ({ activeTab, setActiveTab, isOpen }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-card border-r border-border h-full transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-0 md:w-64",
        "fixed md:relative z-40 md:z-auto"
      )}
    >
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                isActive && "shadow-lg"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};