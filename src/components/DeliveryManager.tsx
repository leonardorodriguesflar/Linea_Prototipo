import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Truck, MapPin, Package, Phone, Search } from "lucide-react"

interface Delivery {
  id: number
  client: string
  address: string
  products: string
  driver: string
  vehicle: string
  status: 'Em Preparação' | 'Em Trânsito' | 'Entregue' | 'Atrasado'
  estimatedTime: string
  contact: string
}

const mockDeliveries: Delivery[] = [
  {
    id: 1,
    client: "Distribuidora Norte Ltda",
    address: "Rua das Industrias, 123 - São Paulo/SP",
    products: "Cereais Premium - 2.5 toneladas",
    driver: "João Silva",
    vehicle: "Mercedes Axor 2544 - ABC-1234",
    status: "Em Trânsito",
    estimatedTime: "14:30",
    contact: "(11) 99999-1234"
  }
]

export default function DeliveryManager() {
  const [deliveries] = useState<Delivery[]>(mockDeliveries)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const filteredDeliveries = deliveries.filter(delivery => 
    delivery.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Delivery['status']) => {
    const variants = {
      'Em Preparação': 'bg-yellow-500',
      'Em Trânsito': 'bg-blue-500',
      'Entregue': 'bg-green-500',
      'Atrasado': 'bg-red-500'
    }
    return <Badge className={`${variants[status]} text-white`}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Entregas em Andamento</h1>
        <p className="text-muted-foreground">Monitoramento de entregas em tempo real</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar entregas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Entrega #{delivery.id}</CardTitle>
                  <p className="text-lg font-medium text-primary">{delivery.client}</p>
                </div>
                {getStatusBadge(delivery.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                      <MapPin className="h-4 w-4" />
                      Endereço de Entrega
                    </div>
                    <p className="text-sm text-muted-foreground">{delivery.address}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                      <Package className="h-4 w-4" />
                      Produtos
                    </div>
                    <p className="text-sm text-muted-foreground">{delivery.products}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                      <Truck className="h-4 w-4" />
                      Motorista e Veículo
                    </div>
                    <p className="text-sm text-muted-foreground">{delivery.driver}</p>
                    <p className="text-sm text-muted-foreground">{delivery.vehicle}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Contatar
                </Button>
                <Button size="sm" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Rastrear
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}