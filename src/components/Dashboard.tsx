import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Package, Clock, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-logistics.jpg";

export const Dashboard = () => {
  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      change: "+3 vs ontem",
      icon: Calendar,
      color: "bg-primary",
    },
    {
      title: "Entregas Pendentes",
      value: "8",
      change: "-2 vs ontem",
      icon: Package,
      color: "bg-warning",
    },
    {
      title: "Confirmações Aguardando",
      value: "5",
      change: "+1 vs ontem",
      icon: Clock,
      color: "bg-accent",
    },
    {
      title: "Taxa de Confirmação",
      value: "94%",
      change: "+2% vs semana",
      icon: TrendingUp,
      color: "bg-success",
    },
  ];

  const recentSchedules = [
    {
      id: "AG001",
      client: "Distribuidora Norte",
      time: "14:00",
      status: "confirmado",
      products: "Cereais e Grãos",
    },
    {
      id: "AG002",
      client: "SuperMercado Central",
      time: "15:30",
      status: "pendente",
      products: "Laticínios",
    },
    {
      id: "AG003",
      client: "Atacadão Sul",
      time: "16:00",
      status: "confirmado",
      products: "Bebidas",
    },
    {
      id: "AG004",
      client: "Mercado Express",
      time: "17:00",
      status: "aguardando",
      products: "Congelados",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-success text-success-foreground">Confirmado</Badge>;
      case "pendente":
        return <Badge className="bg-warning text-warning-foreground">Pendente</Badge>;
      case "aguardando":
        return <Badge variant="outline">Aguardando</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-hero p-8 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Sistema de Agendamento</h1>
          <p className="text-lg opacity-90 mb-6">
            Gerencie seus agendamentos de entrega de forma eficiente e organizada
          </p>
          <Button variant="hero" size="lg" className="bg-white/20 hover:bg-white/30 border border-white/30">
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                <p className="text-xs text-success">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Schedules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agendamentos de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {schedule.status === "confirmado" ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-warning" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{schedule.client}</p>
                      <p className="text-sm text-muted-foreground">{schedule.products}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-foreground">{schedule.time}</span>
                  {getStatusBadge(schedule.status)}
                  <span className="text-xs text-muted-foreground">#{schedule.id}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};