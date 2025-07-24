import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Truck, Package, MapPin, Clock, Phone, Search, Plus, Eye, CheckCircle, XCircle } from "lucide-react";

interface Delivery {
  id: string;
  client: string;
  address: string;
  products: string[];
  driver: string;
  vehicle: string;
  status: "pending" | "in-transit" | "delivered" | "cancelled";
  estimatedTime: string;
  contact: string;
  priority: "high" | "medium" | "low";
}

const mockDeliveries: Delivery[] = [
  {
    id: "DEL001",
    client: "Supermercado Central",
    address: "Av. Principal 123, Centro",
    products: ["Arroz 5kg", "Feijão 1kg", "Óleo 900ml"],
    driver: "João Silva",
    vehicle: "Caminhão - ABC-1234",
    status: "in-transit",
    estimatedTime: "14:30",
    contact: "(11) 98765-4321",
    priority: "high"
  },
  {
    id: "DEL002",
    client: "Mercadinho São José",
    address: "Rua das Flores 456, Bairro Novo",
    products: ["Açúcar 1kg", "Sal 1kg"],
    driver: "Maria Santos",
    vehicle: "Van - XYZ-5678",
    status: "pending",
    estimatedTime: "15:00",
    contact: "(11) 97654-3210",
    priority: "medium"
  },
  {
    id: "DEL003",
    client: "Distribuidora Norte",
    address: "Rua Industrial 789, Distrito",
    products: ["Macarrão 500g", "Molho de tomate"],
    driver: "Carlos Lima",
    vehicle: "Caminhão - DEF-9012",
    status: "delivered",
    estimatedTime: "13:45",
    contact: "(11) 96543-2109",
    priority: "low"
  }
];

export const DeliveryManager = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-500 text-white">Em Trânsito</Badge>;
      case "delivered":
        return <Badge className="bg-green-500 text-white">Entregue</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>;
      case "medium":
        return <Badge variant="secondary">Média</Badge>;
      case "low":
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const handleStatusUpdate = (deliveryId: string, newStatus: string) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === deliveryId ? { ...delivery, status: newStatus as any } : delivery
    ));
    
    toast({
      title: "Status atualizado",
      description: `Entrega ${deliveryId} marcada como ${newStatus === "delivered" ? "entregue" : newStatus === "in-transit" ? "em trânsito" : newStatus}`,
    });
  };

  const handleCall = (contact: string, client: string) => {
    toast({
      title: "Ligando...",
      description: `Iniciando ligação para ${client} - ${contact}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gestão de Entregas</h1>
          <p className="text-muted-foreground">Controle e monitore todas as entregas</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Entrega
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por cliente, endereço ou motorista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="in-transit">Em Trânsito</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries List */}
      <div className="grid gap-4">
        {filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{delivery.client}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    {delivery.address}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(delivery.status)}
                  {getPriorityBadge(delivery.priority)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Products */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Produtos
                </h4>
                <div className="flex flex-wrap gap-1">
                  {delivery.products.map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Driver and Vehicle */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Motorista & Veículo
                  </h4>
                  <p className="text-sm">{delivery.driver}</p>
                  <p className="text-xs text-muted-foreground">{delivery.vehicle}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Previsão de Entrega
                  </h4>
                  <p className="text-sm">{delivery.estimatedTime}</p>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex flex-wrap gap-2 justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCall(delivery.contact, delivery.client)}
                    className="gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Contato
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Rastrear
                  </Button>
                </div>

                {delivery.status !== "delivered" && delivery.status !== "cancelled" && (
                  <div className="flex gap-2">
                    {delivery.status === "pending" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusUpdate(delivery.id, "in-transit")}
                        className="gap-2"
                      >
                        <Truck className="h-4 w-4" />
                        Enviar
                      </Button>
                    )}
                    {delivery.status === "in-transit" && (
                      <Button 
                        className="bg-green-500 hover:bg-green-600 text-white gap-2" 
                        size="sm" 
                        onClick={() => handleStatusUpdate(delivery.id, "delivered")}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Confirmar Entrega
                      </Button>
                    )}
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleStatusUpdate(delivery.id, "cancelled")}
                      className="gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeliveries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma entrega encontrada</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Tente ajustar os filtros de busca"
                : "Não há entregas cadastradas no momento"
              }
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Nova Entrega
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};