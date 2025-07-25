import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Building, Phone, Mail, MapPin, Search, UserPlus } from "lucide-react"

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
  const [clients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState('')

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
        <Button className="bg-primary text-primary-foreground">
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
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

              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  E-mail
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}