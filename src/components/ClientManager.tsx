import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Building, Phone, Mail, MapPin, Search, UserPlus, Edit, Trash2 } from "lucide-react"

interface Client {
  id: number
  name: string
  cnpj: string
  email: string
  phone: string
  address: string
  status: 'Ativo' | 'Inativo'
  type: 'Distribuidor' | 'Varejo' | 'Atacado' | 'Supermercado'
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "Distribuidora Norte Ltda",
    cnpj: "12.345.678/0001-90",
    email: "contato@distribuicoranorte.com.br",
    phone: "(11) 99999-1234",
    address: "Rua das Industrias, 123 - São Paulo/SP",
    status: "Ativo",
    type: "Distribuidor"
  }
]

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    status: 'Ativo',
    type: 'Distribuidor'
  })
  const { toast } = useToast()

  const handleAddClient = () => {
    if (!newClient.name || !newClient.cnpj || !newClient.phone) {
      toast({ title: "Erro", description: "Preencha os campos obrigatórios!" })
      return
    }

    const client: Client = {
      id: clients.length + 1,
      name: newClient.name!,
      cnpj: newClient.cnpj!,
      email: newClient.email!,
      phone: newClient.phone!,
      address: newClient.address!,
      status: newClient.status as 'Ativo' | 'Inativo',
      type: newClient.type as 'Distribuidor' | 'Varejo' | 'Atacado' | 'Supermercado'
    }

    setClients(prev => [...prev, client])
    resetForm()
    toast({ title: "Cliente Adicionado", description: "Cliente cadastrado com sucesso!" })
  }

  const handleEditClient = () => {
    if (!editingClient || !newClient.name || !newClient.cnpj || !newClient.phone) {
      toast({ title: "Erro", description: "Preencha os campos obrigatórios!" })
      return
    }

    setClients(prev => prev.map(client => 
      client.id === editingClient.id 
        ? { ...client, ...newClient } as Client
        : client
    ))
    resetForm()
    toast({ title: "Cliente Atualizado", description: "Dados do cliente atualizados com sucesso!" })
  }

  const handleDeleteClient = (id: number) => {
    setClients(prev => prev.filter(client => client.id !== id))
    toast({ title: "Cliente Removido", description: "Cliente removido com sucesso!" })
  }

  const openEditDialog = (client: Client) => {
    setEditingClient(client)
    setNewClient({ ...client })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setNewClient({
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      address: '',
      status: 'Ativo',
      type: 'Distribuidor'
    })
    setEditingClient(null)
    setIsDialogOpen(false)
  }

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Client['status']) => {
    const variants = { 'Ativo': 'bg-green-500', 'Inativo': 'bg-gray-500' }
    return <Badge className={`${variants[status]} text-white`}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua base de clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground" onClick={() => setEditingClient(null)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  value={newClient.cnpj}
                  onChange={(e) => setNewClient({...newClient, cnpj: e.target.value})}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  placeholder="Endereço completo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newClient.status} onValueChange={(value) => setNewClient({...newClient, status: value as 'Ativo' | 'Inativo'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={newClient.type} onValueChange={(value) => setNewClient({...newClient, type: value as 'Distribuidor' | 'Varejo' | 'Atacado' | 'Supermercado'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Distribuidor">Distribuidor</SelectItem>
                      <SelectItem value="Varejo">Varejo</SelectItem>
                      <SelectItem value="Atacado">Atacado</SelectItem>
                      <SelectItem value="Supermercado">Supermercado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
              <Button onClick={editingClient ? handleEditClient : handleAddClient}>
                {editingClient ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">CNPJ: {client.cnpj}</p>
                </div>
                {getStatusBadge(client.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-medium">Contato:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  <p className="text-sm text-muted-foreground">{client.phone}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">Endereço:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{client.address}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button size="sm" variant="outline" onClick={() => window.open(`tel:${client.phone}`)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(`mailto:${client.email}`)}>
                  <Mail className="h-4 w-4 mr-2" />
                  E-mail
                </Button>
                <Button size="sm" variant="outline" onClick={() => openEditDialog(client)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteClient(client.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}