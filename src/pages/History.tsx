import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Truck, CheckCircle, XCircle, Clock } from "lucide-react"

export default function History() {
  const historyItems = [
    {
      id: "H001",
      date: "2024-01-25",
      time: "14:30",
      type: "Entrega",
      company: "Distribuidora Norte Ltda",
      description: "Entrega concluída - Cereais Premium 2.5t",
      status: "Concluído",
      statusColor: "bg-success",
      icon: CheckCircle,
      iconColor: "text-success"
    },
    {
      id: "H002",
      date: "2024-01-25",
      time: "13:15",
      type: "Agendamento",
      company: "SuperMercado Central",
      description: "Novo agendamento criado - Laticínios Fresh 1.8t",
      status: "Agendado",
      statusColor: "bg-primary",
      icon: Calendar,
      iconColor: "text-primary"
    },
    {
      id: "H003",
      date: "2024-01-25",
      time: "11:45",
      type: "Entrega",
      company: "Atacadão Sul",
      description: "Saída para entrega - Bebidas Fresh 3.2t",
      status: "Em Andamento",
      statusColor: "bg-warning",
      icon: Truck,
      iconColor: "text-warning"
    },
    {
      id: "H004",
      date: "2024-01-24",
      time: "16:20",
      type: "Entrega",
      company: "Rede Mais Supermercados",
      description: "Entrega concluída - Produtos Diversos 4.1t",
      status: "Concluído",
      statusColor: "bg-success",
      icon: CheckCircle,
      iconColor: "text-success"
    },
    {
      id: "H005",
      date: "2024-01-24",
      time: "14:15",
      type: "Problema",
      company: "Distribuidora Norte Ltda",
      description: "Atraso na entrega devido ao trânsito intenso",
      status: "Resolvido",
      statusColor: "bg-destructive",
      icon: XCircle,
      iconColor: "text-destructive"
    },
    {
      id: "H006",
      date: "2024-01-24",
      time: "09:30",
      type: "Agendamento",
      company: "SuperMercado Central",
      description: "Agendamento cancelado pelo cliente",
      status: "Cancelado",
      statusColor: "bg-muted",
      icon: XCircle,
      iconColor: "text-muted-foreground"
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Entrega":
        return Truck
      case "Agendamento":
        return Calendar
      case "Problema":
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Histórico</h1>
        <p className="text-muted-foreground">Acompanhe todas as atividades do sistema</p>
      </div>

      <div className="space-y-4">
        {historyItems.map((item) => {
          const IconComponent = item.icon
          
          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <IconComponent className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-foreground">{item.company}</h3>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge className={`${item.statusColor} text-white text-xs`}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('pt-BR')} às {item.time}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    
                    <div className="mt-3 flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        Ver Detalhes
                      </Button>
                      {item.type === "Problema" && item.status !== "Resolvido" && (
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Resolver
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-center pt-6">
        <Button variant="outline">
          Carregar Mais Histórico
        </Button>
      </div>
    </div>
  )
}