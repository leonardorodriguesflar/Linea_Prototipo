import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Truck, MapPin, Package, Phone, CheckCircle, XCircle, Plus, Search, Filter } from "lucide-react"

interface Schedule {
  id: number
  client: string
  cnpj: string
  transportadora: string
  veiculo: string
  motorista: string
  telefone: string
  produto: string
  quantidade: string
  endereco: string
  dataEntrega: string
  horario: string
  status: 'Pendente' | 'Confirmado' | 'Em Rota' | 'Entregue' | 'Cancelado'
  prioridade: 'Alta' | 'Média' | 'Baixa'
  observacoes: string
}

const mockSchedules: Schedule[] = [
  {
    id: 1,
    client: "Distribuidora Norte Ltda",
    cnpj: "12.345.678/0001-90",
    transportadora: "TransLog Express",
    veiculo: "Mercedes Axor 2544 - ABC-1234",
    motorista: "João Silva",
    telefone: "(11) 99999-1234",
    produto: "Cereais Premium",
    quantidade: "2.5 toneladas",
    endereco: "Rua das Industrias, 123 - São Paulo/SP",
    dataEntrega: "2024-01-20",
    horario: "14:00",
    status: "Confirmado",
    prioridade: "Alta",
    observacoes: "Entrega urgente - cliente VIP"
  }
]

export default function ScheduleManager() {
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || schedule.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Schedule['status']) => {
    const variants = {
      'Pendente': 'bg-yellow-500',
      'Confirmado': 'bg-green-500',
      'Em Rota': 'bg-blue-500',
      'Entregue': 'bg-gray-500',
      'Cancelado': 'bg-red-500'
    }
    return <Badge className={`${variants[status]} text-white`}>{status}</Badge>
  }

  const handleConfirm = (id: number) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, status: 'Confirmado' as const } : schedule
    ))
    toast({ title: "Agendamento Confirmado", description: "O agendamento foi confirmado com sucesso!" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">🏢 Línea Alimentos</h1>
          <p className="text-muted-foreground">Sistema de Agendamento Logístico</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar agendamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredSchedules.map((schedule) => (
          <Card key={schedule.id} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{schedule.client}</CardTitle>
                  <p className="text-sm text-muted-foreground">CNPJ: {schedule.cnpj}</p>
                </div>
                {getStatusBadge(schedule.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span className="font-medium">Transporte:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{schedule.transportadora}</p>
                  <p className="text-sm text-muted-foreground">{schedule.veiculo}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-medium">Produto:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{schedule.produto}</p>
                  <p className="text-sm text-muted-foreground">Quantidade: {schedule.quantidade}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">Agendamento:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(schedule.dataEntrega).toLocaleDateString('pt-BR')} - {schedule.horario}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {schedule.status === 'Pendente' && (
                  <Button size="sm" onClick={() => handleConfirm(schedule.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirmar
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}