import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LA</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Línea Alimentos</h1>
              <p className="text-xs text-muted-foreground">Sistema de Agendamento</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-xs text-white">3</span>
            </span>
          </Button>
          
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Matheus Ferreira</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};