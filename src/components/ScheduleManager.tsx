import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ScheduleManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const schedules = [
    {
      id: "AG001",
      client: "Distribuidora Norte Ltda",
      transportadora: "TransLog Express",
      date: "2024-01-22",
      time: "14:00",
      status: "confirmado",
      products: "Cereais e Grãos - 2 toneladas",
      priority: "alta",
      contact: "João Silva - (11) 99999-9999",
    },
    {
      id: "AG002",
      client: "SuperMercado Central",
      transportadora: "Rápido Entregas",
      date: "2024-01-22",
      time: "15:30",
      status: "pendente",
      products: "Laticínios - 1.5 toneladas",
      priority: "média",
      contact: "Maria Santos - (11) 88888-8888",
    },
    {
      id: "AG003",
      client: "Atacadão Sul",
      transportadora: "LogTrans",
      date: "2024-01-23",
      time: "09:00",
      status: "aguardando",
      products: "Bebidas - 3 toneladas",
      priority: "alta",
      contact: "Pedro Costa - (11) 77777-7777",
    },
    {
      id: "AG004",
      client: "Mercado Express",
      transportadora: "Entrega Rápida",
      date: "2024-01-23",
      time: "11:30",
      status: "cancelado",
      products: "Congelados - 1 tonelada",
      priority: "baixa",
      contact: "Ana Lima - (11) 66666-6666",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmado: { variant: "success", label: "Confirmado" },
      pendente: { variant: "warning", label: "Pendente" },
      aguardando: { variant: "outline", label: "Aguardando" },
      cancelado: { variant: "destructive", label: "Cancelado" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: "secondary", label: status };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      alta: { color: "bg-destructive", label: "Alta" },
      média: { color: "bg-warning", label: "Média" },
      baixa: { color: "bg-muted", label: "Baixa" },
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || { color: "bg-muted", label: priority };
    return (
      <span className={`px-2 py-1 text-xs rounded-full text-white ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = 
      schedule.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.transportadora.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || schedule.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleConfirmSchedule = (id: string) => {
    toast({
      title: "Agendamento Confirmado",
      description: `Agendamento ${id} foi confirmado com sucesso.`,
    });
  };

  const handleCancelSchedule = (id: string) => {
    toast({
      title: "Agendamento Cancelado",
      description: `Agendamento ${id} foi cancelado.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciar Agendamentos</h1>
          <p className="text-muted-foreground">Visualize e gerencie todos os agendamentos de entrega</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="client">Cliente</Label>
                <Input id="client" placeholder="Nome do cliente" />
              </div>
              <div>
                <Label htmlFor="transportadora">Transportadora</Label>
                <Input id="transportadora" placeholder="Nome da transportadora" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div>
                <Label htmlFor="products">Produtos</Label>
                <Textarea id="products" placeholder="Descrição dos produtos" />
              </div>
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="média">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Criar Agendamento</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por cliente, transportadora ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="aguardando">Aguardando</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedules List */}
      <div className="grid gap-4">
        {filteredSchedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{schedule.client}</h3>
                    {getStatusBadge(schedule.status)}
                    {getPriorityBadge(schedule.priority)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Transportadora:</p>
                      <p className="font-medium text-foreground">{schedule.transportadora}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data e Horário:</p>
                      <p className="font-medium text-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {schedule.date} às {schedule.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Produtos:</p>
                      <p className="font-medium text-foreground">{schedule.products}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contato:</p>
                      <p className="font-medium text-foreground">{schedule.contact}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 lg:w-48">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleConfirmSchedule(schedule.id)}
                    disabled={schedule.status === "confirmado"}
                  >
                    Confirmar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCancelSchedule(schedule.id)}
                  >
                    Cancelar
                  </Button>
                  <span className="text-xs text-muted-foreground text-center">#{schedule.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou criar um novo agendamento.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};