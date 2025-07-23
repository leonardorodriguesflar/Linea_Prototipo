import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { ScheduleManager } from "@/components/ScheduleManager";
import { AutomationCenter } from "@/components/AutomationCenter";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "schedule":
        return <ScheduleManager />;
      case "automation":
        return <AutomationCenter />;
      case "deliveries":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Gestão de Entregas</h2>
            <p className="text-muted-foreground">Funcionalidade em desenvolvimento</p>
          </div>
        );
      case "clients":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Clientes</h2>
            <p className="text-muted-foreground">Funcionalidade em desenvolvimento</p>
          </div>
        );
      case "history":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Histórico de Agendamentos</h2>
            <p className="text-muted-foreground">Funcionalidade em desenvolvimento</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Configurações</h2>
            <p className="text-muted-foreground">Funcionalidade em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
        />
        
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;