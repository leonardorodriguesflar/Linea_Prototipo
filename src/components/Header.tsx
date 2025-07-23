import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, 
  Bell, 
  Mail, 
  Settings, 
  Users, 
  Activity,
  Wifi,
  Cloud,
  Shield,
  Zap
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Línea Alimentos</h1>
              <p className="text-xs text-muted-foreground">Power Apps • Agendamento Inteligente</p>
            </div>
          </div>
        </div>

        {/* Microsoft 365 Integration Status */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded-full">
            <Cloud className="h-4 w-4 text-success" />
            <span className="text-xs text-success font-medium">SharePoint Online</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs text-primary font-medium">Power Automate</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
            <Mail className="h-4 w-4 text-secondary" />
            <span className="text-xs text-secondary font-medium">Outlook</span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {currentTime.toLocaleTimeString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentTime.toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3 pl-2 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Matheus Ferreira</p>
              <p className="text-xs text-muted-foreground">Admin • TI Línea</p>
            </div>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Matheus" />
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                MF
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};