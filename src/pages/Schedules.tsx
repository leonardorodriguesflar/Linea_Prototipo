import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Clock } from "lucide-react"

export default function Schedules() {
  const schedules = [
    {
      id: 1,
      company: "Distribuidora Norte Ltda",
      cargo: "Cereais Premium",
      weight: "2.5 toneladas",
      date: "2024-01-25",
      time: "14:00",
      status: "Confirmado",
      statusColor: "bg-success",
      priority: "Normal"
    },
    {
      id: 2,
      company: "SuperMercado Central",
      cargo: "Laticínios Fresh",
      weight: "1.8 toneladas",
      date: "2024-01-25",
      time: "15:30",
      status: "Pendente",
      statusColor: "bg-warning",
      priority: "Alta"
    },
    {
      id: 3,
      company: "Atacadão Sul",
      cargo: "Bebidas Fresh",
      weight: "3.2 toneladas",
      date: "2024-01-25",
      time: "16:00",
      status: "Em Análise",
      statusColor: "bg-secondary",
      priority: "Normal"
    },
    {
      id: 4,
      company: "Rede Mais Supermercados",
      cargo: "Produtos Diversos",
      weight: "4.1 toneladas",
      date: "2024-01-26",
      time: "08:00",
      status: "Agendado",
      statusColor: "bg-primary",
      priority: "Alta"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie todos os agendamentos de entrega</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{schedule.company}</h3>
                    <Badge className={`${schedule.statusColor} text-white`}>
                      {schedule.status}
                    </Badge>
                    {schedule.priority === "Alta" && (
                      <Badge variant="destructive">Prioridade Alta</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Carga:</strong> {schedule.cargo} - {schedule.weight}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(schedule.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {schedule.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Detalhes
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