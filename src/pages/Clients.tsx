import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Building, Phone, Mail, MapPin } from "lucide-react"

export default function Clients() {
  const clients = [
    {
      id: 1,
      name: "Distribuidora Norte Ltda",
      contact: "Roberto Silva",
      phone: "(11) 99999-9999",
      email: "contato@dnorte.com.br",
      address: "Rua das Flores, 123 - Centro",
      city: "São Paulo - SP",
      status: "Ativo",
      statusColor: "bg-success",
      totalOrders: 45,
      lastOrder: "2024-01-25"
    },
    {
      id: 2,
      name: "SuperMercado Central",
      contact: "Ana Costa",
      phone: "(11) 88888-8888",
      email: "compras@central.com.br",
      address: "Av. Principal, 456 - Bairro Sul",
      city: "São Paulo - SP",
      status: "Ativo",
      statusColor: "bg-success",
      totalOrders: 32,
      lastOrder: "2024-01-24"
    },
    {
      id: 3,
      name: "Atacadão Sul",
      contact: "Pedro Santos",
      phone: "(11) 77777-7777",
      email: "pedro@atacadaosul.com.br",
      address: "Rod. BR-101, km 15 - Industrial",
      city: "São Bernardo - SP",
      status: "Pendente",
      statusColor: "bg-warning",
      totalOrders: 28,
      lastOrder: "2024-01-20"
    },
    {
      id: 4,
      name: "Rede Mais Supermercados",
      contact: "Carla Lima",
      phone: "(11) 66666-6666",
      email: "suprimentos@redemais.com.br",
      address: "Rua Comercial, 789 - Centro",
      city: "Santo André - SP",
      status: "Ativo",
      statusColor: "bg-success",
      totalOrders: 67,
      lastOrder: "2024-01-25"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua base de clientes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                    <Badge className={`${client.statusColor} text-white`}>
                      {client.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Contato:</span>
                        <span className="text-muted-foreground">{client.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{client.email}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-muted-foreground">{client.address}</div>
                          <div className="text-muted-foreground">{client.city}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-4 pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-medium">Total de Pedidos: </span>
                      <span className="text-primary font-semibold">{client.totalOrders}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Último Pedido: </span>
                      <span className="text-muted-foreground">
                        {new Date(client.lastOrder).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Histórico
                  </Button>
                  <Button variant="outline" size="sm">
                    Novo Pedido
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}