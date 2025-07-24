import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Building2, MapPin, Phone, Mail, Search, Plus, Edit, Trash2, Calendar } from "lucide-react";

interface Client {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  type: "supermarket" | "distributor" | "restaurant";
  lastOrder: string;
  totalOrders: number;
}

const mockClients: Client[] = [
  {
    id: "CLI001",
    name: "Supermercado Central",
    cnpj: "12.345.678/0001-90",
    email: "compras@central.com.br",
    phone: "(11) 98765-4321",
    address: "Av. Principal 123, Centro - São Paulo/SP",
    status: "active",
    type: "supermarket",
    lastOrder: "2024-01-15",
    totalOrders: 45
  },
  {
    id: "CLI002",
    name: "Mercadinho São José",
    cnpj: "98.765.432/0001-10",
    email: "pedidos@saojose.com.br",
    phone: "(11) 97654-3210",
    address: "Rua das Flores 456, Bairro Novo - São Paulo/SP",
    status: "active",
    type: "supermarket",
    lastOrder: "2024-01-12",
    totalOrders: 23
  },
  {
    id: "CLI003",
    name: "Distribuidora Norte",
    cnpj: "11.222.333/0001-44",
    email: "vendas@norte.com.br",
    phone: "(11) 96543-2109",
    address: "Rua Industrial 789, Distrito - São Paulo/SP",
    status: "active",
    type: "distributor",
    lastOrder: "2024-01-10",
    totalOrders: 67
  },
  {
    id: "CLI004",
    name: "Restaurante Sabor & Cia",
    cnpj: "55.666.777/0001-88",
    email: "compras@sabor.com.br",
    phone: "(11) 95432-1098",
    address: "Av. Gastronômica 321, Centro - São Paulo/SP",
    status: "inactive",
    type: "restaurant",
    lastOrder: "2023-12-20",
    totalOrders: 12
  }
];

export const ClientManager = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.cnpj.includes(searchTerm) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesType = typeFilter === "all" || client.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Ativo</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "supermarket":
        return <Badge variant="outline">Supermercado</Badge>;
      case "distributor":
        return <Badge variant="outline">Distribuidora</Badge>;
      case "restaurant":
        return <Badge variant="outline">Restaurante</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleStatusToggle = (clientId: string) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, status: client.status === "active" ? "inactive" : "active" as any }
        : client
    ));
    
    const client = clients.find(c => c.id === clientId);
    const newStatus = client?.status === "active" ? "inativo" : "ativo";
    
    toast({
      title: "Status atualizado",
      description: `Cliente ${client?.name} marcado como ${newStatus}`,
    });
  };

  const handleCall = (phone: string, name: string) => {
    toast({
      title: "Ligando...",
      description: `Iniciando ligação para ${name} - ${phone}`,
    });
  };

  const handleEmail = (email: string, name: string) => {
    toast({
      title: "Abrindo e-mail...",
      description: `Enviando e-mail para ${name} - ${email}`,
    });
  };

  const handleEdit = (clientId: string) => {
    toast({
      title: "Editando cliente",
      description: `Abrindo formulário de edição para o cliente ${clientId}`,
    });
  };

  const handleDelete = (clientId: string, clientName: string) => {
    setClients(prev => prev.filter(client => client.id !== clientId));
    toast({
      title: "Cliente removido",
      description: `${clientName} foi removido com sucesso`,
    });
  };

  const handleSchedule = (clientId: string, clientName: string) => {
    toast({
      title: "Novo agendamento",
      description: `Criando agendamento para ${clientName}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gerenciar Clientes</h1>
          <p className="text-muted-foreground">Cadastro e controle de clientes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo cliente abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Nome da empresa" />
              <Input placeholder="CNPJ" />
              <Input placeholder="E-mail" type="email" />
              <Input placeholder="Telefone" />
              <Input placeholder="Endereço completo" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supermarket">Supermercado</SelectItem>
                  <SelectItem value="distributor">Distribuidora</SelectItem>
                  <SelectItem value="restaurant">Restaurante</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Salvar Cliente</Button>
                <DialogTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogTrigger>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, CNPJ ou e-mail..."
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
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="supermarket">Supermercado</SelectItem>
                <SelectItem value="distributor">Distribuidora</SelectItem>
                <SelectItem value="restaurant">Restaurante</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {client.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    CNPJ: {client.cnpj}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(client.status)}
                  {getTypeBadge(client.type)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço
                  </h4>
                  <p className="text-sm">{client.address}</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contato
                    </h4>
                    <p className="text-sm">{client.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      E-mail
                    </h4>
                    <p className="text-sm">{client.email}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">
                    Total de Pedidos
                  </h4>
                  <p className="text-lg font-semibold text-primary">{client.totalOrders}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">
                    Último Pedido
                  </h4>
                  <p className="text-sm">{new Date(client.lastOrder).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex flex-wrap gap-2 justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCall(client.phone, client.name)}
                    className="gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Ligar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEmail(client.email, client.name)}
                    className="gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    E-mail
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSchedule(client.id, client.name)}
                    className="gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(client.id)}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button 
                    variant={client.status === "active" ? "secondary" : "default"}
                    size="sm" 
                    onClick={() => handleStatusToggle(client.id)}
                  >
                    {client.status === "active" ? "Desativar" : "Ativar"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(client.id, client.name)}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum cliente encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Não há clientes cadastrados no momento"
              }
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Primeiro Cliente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do novo cliente abaixo.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input placeholder="Nome da empresa" />
                  <Input placeholder="CNPJ" />
                  <Input placeholder="E-mail" type="email" />
                  <Input placeholder="Telefone" />
                  <Input placeholder="Endereço completo" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supermarket">Supermercado</SelectItem>
                      <SelectItem value="distributor">Distribuidora</SelectItem>
                      <SelectItem value="restaurant">Restaurante</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Salvar Cliente</Button>
                    <DialogTrigger asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogTrigger>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};