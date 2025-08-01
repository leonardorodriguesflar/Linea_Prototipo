import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Truck, Users, Clock, Package, TrendingUp, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const stats = [
    { 
      title: "Agendamentos Hoje", 
      value: "12", 
      icon: Calendar, 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+15%"
    },
    { 
      title: "Entregas Ativas", 
      value: "8", 
      icon: Truck, 
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+8%"
    },
    { 
      title: "Clientes Ativos", 
      value: "47", 
      icon: Users, 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+23%"
    },
    { 
      title: "Taxa de Sucesso", 
      value: "94%", 
      icon: TrendingUp, 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "+2%"
    }
  ]

  const schedules = [
    {
      id: 1,
      company: "Distribuidora Norte Ltda",
      cargo: "Cereais Premium - 2.5 toneladas",
      status: "Confirmado",
      time: "14:00",
      statusColor: "bg-green-500",
      urgency: "high"
    },
    {
      id: 2,
      company: "SuperMercado Central",
      cargo: "Laticínios Fresh - 1.8 toneladas",
      status: "Pendente",
      time: "15:30",
      statusColor: "bg-yellow-500",
      urgency: "medium"
    },
    {
      id: 3,
      company: "Atacadão Sul",
      cargo: "Bebidas Fresh - 3.2 toneladas",
      status: "Em Rota",
      time: "16:00",
      statusColor: "bg-blue-500",
      urgency: "low"
    },
    {
      id: 4,
      company: "Rede FastFood Express",
      cargo: "Produtos Congelados - 1.2 toneladas",
      status: "Atrasado",
      time: "12:15",
      statusColor: "bg-red-500",
      urgency: "high"
    }
  ]

  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Entrega #004 está atrasada",
      time: "5 min atrás"
    },
    {
      id: 2,
      type: "info",
      message: "3 novos agendamentos confirmados",
      time: "10 min atrás"
    },
    {
      id: 3,
      type: "success",
      message: "Entrega #002 finalizada com sucesso",
      time: "15 min atrás"
    }
  ]

  const getUrgencyIndicator = (urgency: string) => {
    if (urgency === 'high') return <div className="w-2 h-2 bg-red-500 rounded-full"></div>
    if (urgency === 'medium') return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
    return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">🏢 Línea Alimentos</h1>
          <p className="text-muted-foreground">Painel de Controle - Sistema de Logística</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Hoje: {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.trend}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Schedules */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Agendamentos de Hoje
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => navigate('/agendamentos')}>
                  Ver Todos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {getUrgencyIndicator(schedule.urgency)}
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{schedule.company}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {schedule.cargo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`${schedule.statusColor} text-white`}>
                        {schedule.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-lg font-bold text-primary">
                        <Clock className="h-4 w-4" />
                        {schedule.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Notifications */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Alertas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => toast({ title: "Alertas", description: "Funcionalidade em desenvolvimento" })}
              >
                Ver Todos os Alertas
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/agendamentos')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Novo Agendamento
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/entregas')}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Rastrear Entrega
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/clientes')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Cadastrar Cliente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}