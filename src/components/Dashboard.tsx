import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Package, Clock, TrendingUp, AlertCircle, CheckCircle2, Truck, Users, MapPin, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-logistics.jpg";

export const Dashboard = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeNotifications, setActiveNotifications] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simular notificações em tempo real
  useEffect(() => {
    const notifications = [
      () => toast({
        title: "📦 Novo Agendamento",
        description: "Distribuidora Norte solicitou agendamento para amanhã às 14:00",
      }),
      () => toast({
        title: "✅ Confirmação Recebida", 
        description: "TransLog Express confirmou entrega AG003",
        variant: "default",
      }),
      () => toast({
        title: "⚠️ Atenção Necessária",
        description: "Agendamento AG002 precisa de confirmação urgente",
      }),
    ];

    const timeouts = [
      setTimeout(notifications[0], 3000),
      setTimeout(notifications[1], 8000),
      setTimeout(notifications[2], 15000),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [toast]);

  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      change: "+3 vs ontem",
      progress: 75,
      icon: Calendar,
      color: "bg-primary",
      trend: "up",
    },
    {
      title: "Entregas Ativas",
      value: "8",
      change: "2 em rota",
      progress: 60,
      icon: Truck,
      color: "bg-secondary",
      trend: "up",
    },
    {
      title: "Confirmações Pendentes",
      value: "5",
      change: "3 urgentes",
      progress: 40,
      icon: Clock,
      color: "bg-warning",
      trend: "down",
    },
    {
      title: "Eficiência Semanal",
      value: "94%",
      change: "+2% vs semana anterior",
      progress: 94,
      icon: TrendingUp,
      color: "bg-success",
      trend: "up",
    },
  ];

  const recentSchedules = [
    {
      id: "AG001",
      client: "Distribuidora Norte Ltda",
      transportadora: "TransLog Express",
      time: "14:00",
      status: "confirmado",
      products: "Cereais Premium Línea - 2.5 toneladas",
      location: "São Paulo - SP",
      priority: "alta",
      driver: "Carlos Silva",
      phone: "(11) 99999-9999",
    },
    {
      id: "AG002", 
      client: "SuperMercado Central",
      transportadora: "Rápido Entregas",
      time: "15:30",
      status: "pendente",
      products: "Laticínios Línea Fresh - 1.8 toneladas",
      location: "Rio de Janeiro - RJ",
      priority: "média",
      driver: "Ana Costa",
      phone: "(21) 88888-8888",
    },
    {
      id: "AG003",
      client: "Atacadão Sul", 
      transportadora: "LogTrans Expressa",
      time: "16:00",
      status: "em_rota",
      products: "Bebidas Línea Fresh - 3.2 toneladas",
      location: "Porto Alegre - RS", 
      priority: "alta",
      driver: "Pedro Santos",
      phone: "(51) 77777-7777",
    },
    {
      id: "AG004",
      client: "Mercado Express Premium",
      transportadora: "Entrega Rápida Pro",
      time: "17:00",
      status: "aguardando",
      products: "Congelados Línea Premium - 1.5 toneladas",
      location: "Belo Horizonte - MG",
      priority: "baixa", 
      driver: "Maria Oliveira",
      phone: "(31) 66666-6666",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-success text-success-foreground animate-pulse">✅ Confirmado</Badge>;
      case "pendente":
        return <Badge className="bg-warning text-warning-foreground">⏳ Pendente</Badge>;
      case "em_rota":
        return <Badge className="bg-primary text-primary-foreground animate-pulse">🚛 Em Rota</Badge>;
      case "aguardando":
        return <Badge variant="outline" className="border-accent text-accent">⏰ Aguardando</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleQuickAction = (action: string, scheduleId?: string) => {
    switch (action) {
      case "confirm":
        toast({
          title: "🎉 Agendamento Confirmado!",
          description: `Entrega ${scheduleId} confirmada com sucesso`,
        });
        break;
      case "track":
        toast({
          title: "📍 Rastreamento Ativo",
          description: `Acompanhando entrega ${scheduleId} em tempo real`,
        });
        break;
      case "new":
        toast({
          title: "📋 Novo Agendamento",
          description: "Formulário de agendamento aberto",
        });
        break;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Status Bar em Tempo Real */}
      <div className="bg-gradient-primary p-4 rounded-lg text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Sistema Online</span>
            </div>
            <div className="text-sm opacity-90">
              {currentTime.toLocaleTimeString('pt-BR')} - {currentTime.toLocaleDateString('pt-BR')}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="text-sm">{activeNotifications} notificações ativas</span>
          </div>
        </div>
      </div>

      {/* Hero Section Personalizada */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-hero p-8 text-white shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">LA</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Central de Logística Línea Alimentos</h1>
              <p className="text-lg opacity-90">Sistema Integrado de Agendamento e Monitoramento</p>
            </div>
          </div>
          <p className="text-base opacity-90 mb-6 max-w-2xl">
            Gerencie toda a operação logística da Línea Alimentos em tempo real. 
            Controle agendamentos, monitore entregas e otimize sua cadeia de distribuição.
          </p>
          <div className="flex gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 border border-white/30"
              onClick={() => handleQuickAction("new")}
            >
              📝 Novo Agendamento
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => handleQuickAction("track")}
            >
              📊 Relatórios
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid Aprimorados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {stat.trend === 'up' ? '↗️' : '↘️'}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mb-3">{stat.title}</p>
                <div className="space-y-2">
                  <Progress value={stat.progress} className="h-2" />
                  <p className="text-xs text-success font-medium">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Agendamentos Ativos - Versão Interativa */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-subtle">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Agendamentos de Hoje - Línea Alimentos
                <Badge className="ml-auto">{recentSchedules.length} ativos</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {recentSchedules.map((schedule, index) => (
                  <div
                    key={schedule.id}
                    className={`p-6 hover:bg-muted/50 transition-all duration-300 border-l-4 ${
                      schedule.status === 'confirmado' ? 'border-l-success' :
                      schedule.status === 'em_rota' ? 'border-l-primary' :
                      schedule.status === 'pendente' ? 'border-l-warning' : 'border-l-muted'
                    } ${index < recentSchedules.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {schedule.status === "confirmado" || schedule.status === "em_rota" ? (
                              <CheckCircle2 className="h-5 w-5 text-success" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-warning" />
                            )}
                            <h4 className="font-semibold text-foreground text-lg">{schedule.client}</h4>
                          </div>
                          {getStatusBadge(schedule.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Transportadora:</span>
                              <span className="font-medium">{schedule.transportadora}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Produtos:</span>
                              <span className="font-medium">{schedule.products}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Destino:</span>
                              <span className="font-medium">{schedule.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Motorista:</span>
                              <span className="font-medium">{schedule.driver}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:w-48">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-primary">{schedule.time}</span>
                          <p className="text-xs text-muted-foreground">#{schedule.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="success"
                            className="flex-1"
                            onClick={() => handleQuickAction("confirm", schedule.id)}
                            disabled={schedule.status === "confirmado"}
                          >
                            ✅ Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleQuickAction("track", schedule.id)}
                          >
                            📍 Rastrear
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                          onClick={() => window.open(`tel:${schedule.phone}`, '_self')}
                        >
                          📞 {schedule.phone}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Painel Lateral - Ações Rápidas */}
        <div className="space-y-6">
          {/* Linha Direta Línea */}
          <Card className="bg-gradient-secondary text-white">
            <CardHeader>
              <CardTitle className="text-white">🏢 Línea Alimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Central de Operações</p>
                  <p className="opacity-90">Segunda à Sexta: 06:00 - 18:00</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-white/30 text-white hover:bg-white/10"
                  onClick={() => window.open('tel:08006440000', '_self')}
                >
                  📞 0800-644-0000
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-white/30 text-white hover:bg-white/10"
                  onClick={() => window.open('mailto:logistica@lineaalimentos.com.br', '_self')}
                >
                  ✉️ logistica@lineaalimentos.com.br
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>⚡ Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full gap-2" 
                onClick={() => handleQuickAction("new")}
              >
                📝 Novo Agendamento
              </Button>
              <Button 
                variant="secondary" 
                className="w-full gap-2"
                onClick={() => toast({
                  title: "📊 Relatório Gerado",
                  description: "Relatório diário de entregas enviado para seu email",
                })}
              >
                📊 Relatório Diário
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => toast({
                  title: "🔄 Sistema Atualizado",
                  description: "Dados sincronizados com sucesso",
                })}
              >
                🔄 Sincronizar Dados
              </Button>
            </CardContent>
          </Card>

          {/* Status da Frota */}
          <Card>
            <CardHeader>
              <CardTitle>🚛 Status da Frota</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Veículos Ativos</span>
                  <Badge className="bg-success">8/12</Badge>
                </div>
                <Progress value={67} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  4 veículos em manutenção
                </div>
                
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>São Paulo</span>
                    <span className="text-success">3 ativos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rio de Janeiro</span>
                    <span className="text-success">2 ativos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Outros Estados</span>
                    <span className="text-success">3 ativos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};