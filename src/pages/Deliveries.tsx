import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Truck, Clock } from "lucide-react"

export default function Deliveries() {
  const deliveries = [
    {
      id: "D001",
      company: "Distribuidora Norte Ltda",
      driver: "João Silva",
      vehicle: "Caminhão - ABC-1234",
      cargo: "Cereais Premium - 2.5t",
      origin: "Depósito Central",
      destination: "Rua das Flores, 123 - Centro",
      status: "Em Rota",
      statusColor: "bg-secondary",
      progress: 65,
      estimatedTime: "14:30",
      distance: "12.5 km"
    },
    {
      id: "D002",
      company: "SuperMercado Central",
      driver: "Maria Santos",
      vehicle: "Van - XYZ-5678",
      cargo: "Laticínios Fresh - 1.8t",
      origin: "Depósito Norte",
      destination: "Av. Principal, 456 - Bairro Sul",
      status: "Saiu para Entrega",
      statusColor: "bg-warning",
      progress: 25,
      estimatedTime: "15:45",
      distance: "8.2 km"
    },
    {
      id: "D003",
      company: "Atacadão Sul",
      driver: "Carlos Oliveira",
      vehicle: "Caminhão - DEF-9012",
      cargo: "Bebidas Fresh - 3.2t",
      origin: "Depósito Sul",
      destination: "Rod. BR-101, km 15 - Industrial",
      status: "Entregue",
      statusColor: "bg-success",
      progress: 100,
      estimatedTime: "Concluído",
      distance: "25.7 km"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Entregas</h1>
        <p className="text-muted-foreground">Monitore todas as entregas em tempo real</p>
      </div>

      <div className="grid gap-6">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {delivery.company} - #{delivery.id}
                </CardTitle>
                <Badge className={`${delivery.statusColor} text-white`}>
                  {delivery.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Motorista:</strong> {delivery.driver}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Veículo:</strong> {delivery.vehicle}</span>
                  </div>
                  <div className="text-sm">
                    <strong>Carga:</strong> {delivery.cargo}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Origem:</strong> {delivery.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Destino:</strong> {delivery.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Previsão:</strong> {delivery.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {delivery.status !== "Entregue" && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso da Entrega</span>
                    <span>{delivery.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${delivery.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  Rastrear
                </Button>
                <Button variant="outline" size="sm">
                  Contatar Motorista
                </Button>
                <Button variant="outline" size="sm">
                  Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}