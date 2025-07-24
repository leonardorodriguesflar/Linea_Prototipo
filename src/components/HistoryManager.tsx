import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Package, User, MapPin, Search, Download, Filter, Eye } from "lucide-react";

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  client: string;
  transportadora: string;
  driver: string;
  status: "completed" | "cancelled" | "no-show";
  products: string[];
  address: string;
  notes?: string;
  completedBy: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: "HIST001",
    date: "2024-01-15",
    time: "14:30",
    client: "Supermercado Central",
    transportadora: "Express Logística",
    driver: "João Silva",
    status: "completed",
    products: ["Arroz 5kg", "Feijão 1kg", "Óleo 900ml"],
    address: "Av. Principal 123, Centro",
    notes: "Entrega realizada no prazo. Cliente satisfeito.",
    completedBy: "Maria Santos"
  },
  {
    id: "HIST002",
    date: "2024-01-14",
    time: "16:00",
    client: "Mercadinho São José",
    transportadora: "Rápida Transportes",
    driver: "Carlos Lima",
    status: "completed",
    products: ["Açúcar 1kg", "Sal 1kg", "Macarrão 500g"],
    address: "Rua das Flores 456, Bairro Novo",
    completedBy: "Ana Costa"
  },
  {
    id: "HIST003",
    date: "2024-01-13",
    time: "10:15",
    client: "Distribuidora Norte",
    transportadora: "TotalLog",
    driver: "Pedro Oliveira",
    status: "cancelled",
    products: ["Molho de tomate", "Extrato de tomate"],
    address: "Rua Industrial 789, Distrito",
    notes: "Cancelado devido a problema no veículo",
    completedBy: "System"
  },
  {
    id: "HIST004",
    date: "2024-01-12",
    time: "09:30",
    client: "Restaurante Sabor & Cia",
    transportadora: "Express Logística",
    driver: "João Silva",
    status: "no-show",
    products: ["Temperos diversos", "Azeite extra virgem"],
    address: "Av. Gastronômica 321, Centro",
    notes: "Cliente não estava presente no local",
    completedBy: "System"
  },
  {
    id: "HIST005",
    date: "2024-01-11",
    time: "15:45",
    client: "Supermercado Central",
    transportadora: "Rápida Transportes",
    driver: "Maria Santos",
    status: "completed",
    products: ["Leite 1L", "Iogurte natural", "Queijo minas"],
    address: "Av. Principal 123, Centro",
    notes: "Entrega antecipada. Produtos refrigerados mantidos na temperatura ideal.",
    completedBy: "Carlos Lima"
  }
];

export const HistoryManager = () => {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.transportadora.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== "all") {
      const today = new Date();
      const itemDate = new Date(item.date);
      
      switch (dateFilter) {
        case "today":
          matchesDate = itemDate.toDateString() === today.toDateString();
          break;
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = itemDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = itemDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white">Concluído</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>;
      case "no-show":
        return <Badge variant="secondary">Ausente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleExport = () => {
    toast({
      title: "Exportando dados",
      description: "Gerando relatório de histórico de agendamentos...",
    });
  };

  const handleViewDetails = (itemId: string) => {
    toast({
      title: "Visualizando detalhes",
      description: `Abrindo detalhes completos do agendamento ${itemId}`,
    });
  };

  const getTotalsByStatus = () => {
    const completed = history.filter(item => item.status === "completed").length;
    const cancelled = history.filter(item => item.status === "cancelled").length;
    const noShow = history.filter(item => item.status === "no-show").length;
    return { completed, cancelled, noShow, total: history.length };
  };

  const stats = getTotalsByStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Histórico de Agendamentos</h1>
          <p className="text-muted-foreground">Consulte o histórico completo de agendamentos</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Concluídos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            <p className="text-sm text-muted-foreground">Cancelados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.noShow}</p>
            <p className="text-sm text-muted-foreground">Ausentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por cliente, transportadora, motorista ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
                <SelectItem value="no-show">Ausente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="grid gap-4">
        {filteredHistory.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {item.client}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(item.date).toLocaleDateString('pt-BR')} às {item.time}
                    </span>
                    <span>ID: {item.id}</span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Transport Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Transporte
                  </h4>
                  <p className="text-sm font-medium">{item.transportadora}</p>
                  <p className="text-xs text-muted-foreground">Motorista: {item.driver}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço
                  </h4>
                  <p className="text-sm">{item.address}</p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Produtos
                </h4>
                <div className="flex flex-wrap gap-1">
                  {item.products.map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {item.notes && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">
                      Observações
                    </h4>
                    <p className="text-sm bg-muted p-2 rounded">{item.notes}</p>
                  </div>
                </>
              )}

              <Separator />

              {/* Footer */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Processado por: {item.completedBy}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(item.id)}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum registro encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Não há histórico de agendamentos no momento"
              }
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setDateFilter("all");
            }}>
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};