import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package, Download, Search, Eye } from "lucide-react"

interface HistoryItem {
  id: number
  date: string
  client: string
  status: 'Entregue' | 'Cancelado' | 'Não Compareceu'
  products: string
  value: number
}

const mockHistory: HistoryItem[] = [
  {
    id: 1,
    date: "2024-01-19",
    client: "Distribuidora Norte Ltda",
    status: "Entregue",
    products: "Cereais Premium - 2.5 toneladas",
    value: 25750.00
  }
]

export default function HistoryManager() {
  const [history] = useState<HistoryItem[]>(mockHistory)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHistory = history.filter(item => 
    item.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: HistoryItem['status']) => {
    const variants = {
      'Entregue': 'bg-green-500',
      'Cancelado': 'bg-red-500',
      'Não Compareceu': 'bg-yellow-500'
    }
    return <Badge className={`${variants[status]} text-white`}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Histórico de Entregas</h1>
          <p className="text-muted-foreground">Consulte o histórico completo</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar histórico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredHistory.map((item) => (
          <Card key={item.id} className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{item.client}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-primary mb-1">
                    <Package className="h-4 w-4" />
                    <span className="font-medium">Produtos</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.products}</p>
                </div>

                {item.value > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm text-primary mb-1">
                      <span className="font-medium">Valor</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}