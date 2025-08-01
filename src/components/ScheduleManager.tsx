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

  const [newSchedule, setNewSchedule] = useState<Partial<Schedule>>({
    client: '',
    cnpj: '',
    transportadora: '',
    veiculo: '',
    motorista: '',
    telefone: '',
    produto: '',
    quantidade: '',
    endereco: '',
    dataEntrega: '',
    horario: '',
    status: 'Pendente',
    prioridade: 'Média',
    observacoes: ''
  })

  const handleConfirm = (id: number) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, status: 'Confirmado' as const } : schedule
    ))
    toast({ title: "Agendamento Confirmado", description: "O agendamento foi confirmado com sucesso!" })
  }

  const handleCancel = (id: number) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, status: 'Cancelado' as const } : schedule
    ))
    toast({ title: "Agendamento Cancelado", description: "O agendamento foi cancelado." })
  }

  const handleStartRoute = (id: number) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, status: 'Em Rota' as const } : schedule
    ))
    toast({ title: "Rota Iniciada", description: "A entrega está em rota!" })
  }

  const handleComplete = (id: number) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, status: 'Entregue' as const } : schedule
    ))
    toast({ title: "Entrega Concluída", description: "Entrega finalizada com sucesso!" })
  }

  const handleAddSchedule = () => {
    if (!newSchedule.client || !newSchedule.dataEntrega || !newSchedule.horario) {
      toast({ title: "Erro", description: "Preencha os campos obrigatórios!" })
      return
    }

    const schedule: Schedule = {
      id: schedules.length + 1,
      client: newSchedule.client!,
      cnpj: newSchedule.cnpj!,
      transportadora: newSchedule.transportadora!,
      veiculo: newSchedule.veiculo!,
      motorista: newSchedule.motorista!,
      telefone: newSchedule.telefone!,
      produto: newSchedule.produto!,
      quantidade: newSchedule.quantidade!,
      endereco: newSchedule.endereco!,
      dataEntrega: newSchedule.dataEntrega!,
      horario: newSchedule.horario!,
      status: 'Pendente',
      prioridade: newSchedule.prioridade as 'Alta' | 'Média' | 'Baixa',
      observacoes: newSchedule.observacoes!
    }

    setSchedules(prev => [...prev, schedule])
    setNewSchedule({
      client: '',
      cnpj: '',
      transportadora: '',
      veiculo: '',
      motorista: '',
      telefone: '',
      produto: '',
      quantidade: '',
      endereco: '',
      dataEntrega: '',
      horario: '',
      status: 'Pendente',
      prioridade: 'Média',
      observacoes: ''
    })
    setIsDialogOpen(false)
    toast({ title: "Agendamento Criado", description: "Novo agendamento criado com sucesso!" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">🏢 Línea Alimentos</h1>
          <p className="text-muted-foreground">Sistema de Agendamento Logístico</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Agendamento de Entrega</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente *</Label>
                <Input
                  id="client"
                  value={newSchedule.client}
                  onChange={(e) => setNewSchedule({...newSchedule, client: e.target.value})}
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={newSchedule.cnpj}
                  onChange={(e) => setNewSchedule({...newSchedule, cnpj: e.target.value})}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportadora">Transportadora</Label>
                <Input
                  id="transportadora"
                  value={newSchedule.transportadora}
                  onChange={(e) => setNewSchedule({...newSchedule, transportadora: e.target.value})}
                  placeholder="Nome da transportadora"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="veiculo">Veículo</Label>
                <Input
                  id="veiculo"
                  value={newSchedule.veiculo}
                  onChange={(e) => setNewSchedule({...newSchedule, veiculo: e.target.value})}
                  placeholder="Modelo - Placa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motorista">Motorista</Label>
                <Input
                  id="motorista"
                  value={newSchedule.motorista}
                  onChange={(e) => setNewSchedule({...newSchedule, motorista: e.target.value})}
                  placeholder="Nome do motorista"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={newSchedule.telefone}
                  onChange={(e) => setNewSchedule({...newSchedule, telefone: e.target.value})}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="produto">Produto</Label>
                <Input
                  id="produto"
                  value={newSchedule.produto}
                  onChange={(e) => setNewSchedule({...newSchedule, produto: e.target.value})}
                  placeholder="Tipo de produto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  value={newSchedule.quantidade}
                  onChange={(e) => setNewSchedule({...newSchedule, quantidade: e.target.value})}
                  placeholder="Ex: 2.5 toneladas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataEntrega">Data da Entrega *</Label>
                <Input
                  id="dataEntrega"
                  type="date"
                  value={newSchedule.dataEntrega}
                  onChange={(e) => setNewSchedule({...newSchedule, dataEntrega: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horario">Horário *</Label>
                <Input
                  id="horario"
                  type="time"
                  value={newSchedule.horario}
                  onChange={(e) => setNewSchedule({...newSchedule, horario: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select value={newSchedule.prioridade} onValueChange={(value) => setNewSchedule({...newSchedule, prioridade: value as 'Alta' | 'Média' | 'Baixa'})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço de Entrega</Label>
                <Input
                  id="endereco"
                  value={newSchedule.endereco}
                  onChange={(e) => setNewSchedule({...newSchedule, endereco: e.target.value})}
                  placeholder="Endereço completo"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={newSchedule.observacoes}
                  onChange={(e) => setNewSchedule({...newSchedule, observacoes: e.target.value})}
                  placeholder="Observações adicionais"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddSchedule}>
                Criar Agendamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
            <div className="min-w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Confirmado">Confirmado</SelectItem>
                  <SelectItem value="Em Rota">Em Rota</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
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

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {schedule.status === 'Pendente' && (
                  <>
                    <Button size="sm" onClick={() => handleConfirm(schedule.id)} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirmar
                    </Button>
                    <Button size="sm" onClick={() => handleCancel(schedule.id)} variant="destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                )}
                {schedule.status === 'Confirmado' && (
                  <Button size="sm" onClick={() => handleStartRoute(schedule.id)} className="bg-blue-600 hover:bg-blue-700">
                    <Truck className="h-4 w-4 mr-2" />
                    Iniciar Rota
                  </Button>
                )}
                {schedule.status === 'Em Rota' && (
                  <Button size="sm" onClick={() => handleComplete(schedule.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Finalizar
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => window.open(`tel:${schedule.telefone}`)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(schedule.endereco)}`)}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Mapa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}