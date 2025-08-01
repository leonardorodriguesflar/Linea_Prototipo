import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Truck, MapPin, Package, Phone, Search, Filter, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  const updateDeliveryStatus = (id: number, newStatus: Delivery['status']) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === id ? { ...delivery, status: newStatus } : delivery
    ))
    toast({ 
      title: "Status Atualizado", 
      description: `Entrega #${id} agora está ${newStatus}` 
    })
  }

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar entregas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Em Preparação">Em Preparação</SelectItem>
                  <SelectItem value="Em Trânsito">Em Trânsito</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                  <SelectItem value="Atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {delivery.status === 'Em Preparação' && (
                  <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, 'Em Trânsito')} className="bg-blue-600 hover:bg-blue-700">
                    <Truck className="h-4 w-4 mr-2" />
                    Iniciar Entrega
                  </Button>
                )}
                {delivery.status === 'Em Trânsito' && (
                  <>
                    <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, 'Entregue')} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Finalizar
                    </Button>
                    <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, 'Atrasado')} variant="destructive">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Marcar Atraso
                    </Button>
                  </>
                )}
                {delivery.status === 'Atrasado' && (
                  <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, 'Em Trânsito')} className="bg-blue-600 hover:bg-blue-700">
                    <Clock className="h-4 w-4 mr-2" />
                    Retomar
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => window.open(`tel:${delivery.contact}`)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Contatar
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(delivery.address)}`)}>
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