import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const stats = [
    { title: "Agendamentos Hoje", value: "12", icon: "📅", color: "text-primary" },
    { title: "Entregas Ativas", value: "8", icon: "📦", color: "text-secondary" },
    { title: "Pendentes", value: "5", icon: "⏳", color: "text-warning" },
    { title: "Eficiência", value: "94%", icon: "📈", color: "text-success" }
  ]

  const schedules = [
    {
      id: 1,
      company: "Distribuidora Norte Ltda",
      cargo: "Cereais Premium - 2.5 toneladas",
      status: "Confirmado",
      time: "14:00",
      statusColor: "bg-success"
    },
    {
      id: 2,
      company: "SuperMercado Central",
      cargo: "Laticínios Fresh - 1.8 toneladas",
      status: "Pendente",
      time: "15:30",
      statusColor: "bg-warning"
    },
    {
      id: 3,
      company: "Atacadão Sul",
      cargo: "Bebidas Fresh - 3.2 toneladas",
      status: "Em Rota",
      time: "16:00",
      statusColor: "bg-secondary"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema de logística</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Schedules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Agendamentos de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{schedule.company}</h4>
                  <p className="text-sm text-muted-foreground">{schedule.cargo}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={`${schedule.statusColor} text-white`}>
                    {schedule.status}
                  </Badge>
                  <span className="text-lg font-bold text-primary">{schedule.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}