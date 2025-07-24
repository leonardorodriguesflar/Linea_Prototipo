import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { ScheduleManager } from "@/components/ScheduleManager";
import { DeliveryManager } from "@/components/DeliveryManager";
import { ClientManager } from "@/components/ClientManager";
import { HistoryManager } from "@/components/HistoryManager";
import { Settings } from "@/components/Settings";
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
      case "deliveries":
        return <DeliveryManager />;
      case "clients":
        return <ClientManager />;
      case "history":
        return <HistoryManager />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex h-[calc(100vh-64px)]">
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