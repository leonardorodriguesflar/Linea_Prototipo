import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, Clock, TrendingUp, Menu } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header simples */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Línea Alimentos - Sistema de Logística</h1>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar simples */}
        <aside className={`bg-card border-r border-border h-[calc(100vh-64px)] transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 md:w-64"
        } fixed md:relative z-40 md:z-auto`}>
          <nav className="p-4 space-y-2">
            <Button variant="default" className="w-full justify-start gap-3">
              <Calendar className="h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Package className="h-5 w-5" />
              Agendamentos
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Clock className="h-5 w-5" />
              Entregas
            </Button>
          </nav>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 space-y-6">
          {/* Hero Section */}
          <div className="bg-primary text-primary-foreground p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Central de Logística Línea Alimentos</h2>
            <p className="opacity-90">Sistema Integrado de Agendamento e Monitoramento</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">12</h3>
                <p className="text-sm text-muted-foreground">Agendamentos Hoje</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                    <Package className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">8</h3>
                <p className="text-sm text-muted-foreground">Entregas Ativas</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-warning text-warning-foreground">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">5</h3>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-success text-success-foreground">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">94%</h3>
                <p className="text-sm text-muted-foreground">Eficiência</p>
              </CardContent>
            </Card>
          </div>

          {/* Agendamentos Recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Distribuidora Norte Ltda</h4>
                    <p className="text-sm text-muted-foreground">Cereais Premium - 2.5 toneladas</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-success">Confirmado</Badge>
                    <span className="text-lg font-bold text-primary">14:00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-semibold">SuperMercado Central</h4>
                    <p className="text-sm text-muted-foreground">Laticínios Fresh - 1.8 toneladas</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">Pendente</Badge>
                    <span className="text-lg font-bold text-primary">15:30</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Atacadão Sul</h4>
                    <p className="text-sm text-muted-foreground">Bebidas Fresh - 3.2 toneladas</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-primary">Em Rota</Badge>
                    <span className="text-lg font-bold text-primary">16:00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Index;