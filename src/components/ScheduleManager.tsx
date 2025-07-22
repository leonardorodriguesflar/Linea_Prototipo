import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Search, Filter, MapPin, Truck, Package, Clock, Phone, User, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ScheduleManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const schedules = [
    {
      id: "LA001",
      client: "Distribuidora Norte Ltda",
      transportadora: "TransLog Express São Paulo",
      date: "2024-01-22",
      time: "14:00",
      status: "confirmado",
      products: "Cereais Premium Línea - 2.5 toneladas",
      priority: "alta",
      contact: "João Silva - (11) 99999-9999",
      location: "São Paulo - SP",
      driverName: "Carlos Roberto",
      vehiclePlate: "ABC-1234",
      estimatedDuration: "3 horas",
      lineaProducts: "Cereais, Farinhas, Granolas",
    },
    {
      id: "LA002",
      client: "SuperMercado Central Premium",
      transportadora: "Rápido Entregas Rio",
      date: "2024-01-22",
      time: "15:30",
      status: "pendente",
      products: "Laticínios Línea Fresh - 1.8 toneladas",
      priority: "média",
      contact: "Maria Santos - (21) 88888-8888",
      location: "Rio de Janeiro - RJ",
      driverName: "Ana Costa",
      vehiclePlate: "DEF-5678",
      estimatedDuration: "2.5 horas",
      lineaProducts: "Iogurtes, Queijos, Leites",
    },
    {
      id: "LA003",
      client: "Atacadão Sul Distribuidora",
      transportadora: "LogTrans Porto Alegre",
      date: "2024-01-23",
      time: "09:00",
      status: "em_rota",
      products: "Bebidas Línea Fresh - 3.2 toneladas",
      priority: "alta",
      contact: "Pedro Costa - (51) 77777-7777",
      location: "Porto Alegre - RS",
      driverName: "Pedro Santos",
      vehiclePlate: "GHI-9012",
      estimatedDuration: "4 horas",
      lineaProducts: "Sucos, Néctares, Água",
    },
    {
      id: "LA004",
      client: "Mercado Express Premium",
      transportadora: "Entrega Rápida BH",
      date: "2024-01-23",
      time: "11:30",
      status: "aguardando_confirmacao",
      products: "Congelados Línea Premium - 1.5 toneladas",
      priority: "baixa",
      contact: "Ana Lima - (31) 66666-6666",
      location: "Belo Horizonte - MG",
      driverName: "Maria Oliveira",
      vehiclePlate: "JKL-3456",
      estimatedDuration: "2 horas",
      lineaProducts: "Pizzas, Lasanhas, Sorvetes",
    },
    {
      id: "LA005",
      client: "Rede SuperFresh Nacional",
      transportadora: "Expresso Nordeste",
      date: "2024-01-24",
      time: "08:00",
      status: "cancelado",
      products: "Mix Línea Completo - 4.0 toneladas",
      priority: "alta",
      contact: "Rafael Mendes - (85) 55555-5555",
      location: "Fortaleza - CE",
      driverName: "José Almeida",
      vehiclePlate: "MNO-7890",
      estimatedDuration: "5 horas",
      lineaProducts: "Diversos produtos Línea",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmado: { variant: "success", label: "✅ Confirmado", color: "bg-success" },
      pendente: { variant: "warning", label: "⏳ Pendente", color: "bg-warning" },
      em_rota: { variant: "default", label: "🚛 Em Rota", color: "bg-primary" },
      aguardando_confirmacao: { variant: "outline", label: "⏰ Aguardando", color: "bg-muted" },
      cancelado: { variant: "destructive", label: "❌ Cancelado", color: "bg-destructive" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: "secondary", label: status, color: "bg-muted" };
    return <Badge variant={config.variant as any} className={`${config.color} animate-pulse`}>{config.label}</Badge>;
  };

  const getPriorityIndicator = (priority: string) => {
    const priorityConfig = {
      alta: { color: "text-destructive", icon: "🔴", label: "Alta Prioridade" },
      média: { color: "text-warning", icon: "🟡", label: "Média Prioridade" },
      baixa: { color: "text-muted-foreground", icon: "🟢", label: "Baixa Prioridade" },
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || { color: "text-muted", icon: "⚪", label: priority };
    return (
      <div className={`flex items-center gap-1 ${config.color}`} title={config.label}>
        <span>{config.icon}</span>
        <span className="text-xs font-medium">{config.label}</span>
      </div>
    );
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = 
      schedule.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.transportadora.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || schedule.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleConfirmSchedule = (id: string, clientName: string) => {
    toast({
      title: "🎉 Agendamento Confirmado!",
      description: `Entrega para ${clientName} (${id}) confirmada pela Línea Alimentos`,
    });
  };

  const handleCancelSchedule = (id: string, clientName: string) => {
    toast({
      title: "❌ Agendamento Cancelado",
      description: `Entrega para ${clientName} (${id}) foi cancelada`,
      variant: "destructive",
    });
  };

  const handleCreateSchedule = () => {
    toast({
      title: "📝 Novo Agendamento Criado!",
      description: "Agendamento criado com sucesso. Notificações enviadas.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Personalizado para Línea */}
      <div className="bg-gradient-primary p-6 rounded-lg text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">LA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Central de Agendamentos</h1>
              <p className="opacity-90">Línea Alimentos - Gestão Logística Integrada</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" className="gap-2 bg-white/20 hover:bg-white/30 border border-white/30">
                <Plus className="h-4 w-4" />
                Novo Agendamento Línea
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  🏢 Novo Agendamento - Línea Alimentos
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Cliente/Distribuidor</Label>
                    <Input id="client" placeholder="Ex: Distribuidora Norte" />
                  </div>
                  <div>
                    <Label htmlFor="transportadora">Transportadora</Label>
                    <Input id="transportadora" placeholder="Ex: TransLog Express" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Data da Entrega</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Input id="time" type="time" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alta">🔴 Alta</SelectItem>
                        <SelectItem value="média">🟡 Média</SelectItem>
                        <SelectItem value="baixa">🟢 Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="products">Produtos Línea</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os produtos Línea" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cereais">🌾 Cereais Premium</SelectItem>
                      <SelectItem value="laticinios">🥛 Laticínios Fresh</SelectItem>
                      <SelectItem value="bebidas">🥤 Bebidas Naturais</SelectItem>
                      <SelectItem value="congelados">❄️ Congelados Premium</SelectItem>
                      <SelectItem value="mix">📦 Mix Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Destino</Label>
                  <Input id="location" placeholder="Cidade - Estado" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="driver">Motorista</Label>
                    <Input id="driver" placeholder="Nome do motorista" />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contato</Label>
                    <Input id="contact" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea id="observations" placeholder="Observações especiais para a entrega..." />
                </div>

                <Button onClick={handleCreateSchedule} className="w-full">
                  ✅ Criar Agendamento Línea
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filtros Aprimorados */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por cliente, transportadora, localização ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🔍 Todos os Status</SelectItem>
                  <SelectItem value="confirmado">✅ Confirmados</SelectItem>
                  <SelectItem value="pendente">⏳ Pendentes</SelectItem>
                  <SelectItem value="em_rota">🚛 Em Rota</SelectItem>
                  <SelectItem value="aguardando_confirmacao">⏰ Aguardando</SelectItem>
                  <SelectItem value="cancelado">❌ Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Agendamentos Aprimorada */}
      <div className="grid gap-6">
        {filteredSchedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-primary">
            <CardContent className="p-0">
              <div className="p-6">
                {/* Header do Card */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-foreground">{schedule.client}</h3>
                      {getStatusBadge(schedule.status)}
                      {getPriorityIndicator(schedule.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">Agendamento: #{schedule.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{schedule.time}</div>
                    <div className="text-sm text-muted-foreground">{schedule.date}</div>
                  </div>
                </div>

                {/* Informações Detalhadas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Coluna 1: Transporte */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Transportadora:</span>
                    </div>
                    <p className="font-medium pl-6">{schedule.transportadora}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Motorista:</span>
                    </div>
                    <p className="font-medium pl-6">{schedule.driverName}</p>
                    <p className="text-sm text-muted-foreground pl-6">Placa: {schedule.vehiclePlate}</p>
                  </div>

                  {/* Coluna 2: Produtos e Destino */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Produtos Línea:</span>
                    </div>
                    <p className="font-medium pl-6">{schedule.products}</p>
                    <p className="text-xs text-muted-foreground pl-6">{schedule.lineaProducts}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Destino:</span>
                    </div>
                    <p className="font-medium pl-6">{schedule.location}</p>
                  </div>

                  {/* Coluna 3: Contato e Tempo */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Contato:</span>
                    </div>
                    <p className="font-medium pl-6">{schedule.contact}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Duração Estimada:</span>
                    </div>
                    <p className="font-medium pl-6">{schedule.estimatedDuration}</p>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleConfirmSchedule(schedule.id, schedule.client)}
                    disabled={schedule.status === "confirmado" || schedule.status === "cancelado"}
                    className="gap-2"
                  >
                    ✅ Confirmar Entrega
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast({
                      title: "📍 Rastreamento Ativo",
                      description: `Acompanhando entrega ${schedule.id} em tempo real`,
                    })}
                    className="gap-2"
                  >
                    📍 Rastrear ao Vivo
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(`tel:${schedule.contact.split(' - ')[1]}`, '_self')}
                    className="gap-2"
                  >
                    📞 Ligar Contato
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCancelSchedule(schedule.id, schedule.client)}
                    disabled={schedule.status === "cancelado"}
                    className="gap-2 text-destructive hover:text-destructive"
                  >
                    ❌ Cancelar
                  </Button>
                  {schedule.status === "pendente" && (
                    <div className="flex items-center gap-2 text-warning text-sm ml-auto">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Aguardando confirmação há 2 horas</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <Card className="shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              📦
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-muted-foreground mb-4">Tente ajustar os filtros ou criar um novo agendamento para a Línea Alimentos.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              ➕ Criar Primeiro Agendamento
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};