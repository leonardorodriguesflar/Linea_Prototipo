import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/pages/Dashboard";
import Schedules from "@/pages/Schedules";
import Deliveries from "@/pages/Deliveries";
import Clients from "@/pages/Clients";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
function App() {
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          

          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agendamentos" element={<Schedules />} />
              <Route path="/entregas" element={<Deliveries />} />
              <Route path="/clientes" element={<Clients />} />
              <Route path="/historico" element={<History />} />
              <Route path="/configuracoes" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>;
}
export default App;