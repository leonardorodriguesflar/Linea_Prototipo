import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileSpreadsheet,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  TrendingUp,
  Users,
  Package,
  Truck,
  Target,
  Zap,
  Cloud,
  ArrowRight,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Database,
  Bot,
  MessageSquare
} from "lucide-react";

export const PowerAppsFlow = () => {
  const [activeFlow, setActiveFlow] = useState("email-automation");

  const automationSteps = [
    {
      id: 1,
      title: "Recebimento via E-mail",
      description: "Power Automate monitora caixa de entrada corporativa",
      status: "completed",
      tool: "Outlook",
      time: "Instantâneo",
      icon: Mail,
      color: "bg-secondary"
    },
    {
      id: 2,
      title: "Extração de Dados",
      description: "IA lê e extrai informações do e-mail automaticamente",
      status: "completed",
      tool: "AI Builder",
      time: "15s",
      icon: Bot,
      color: "bg-accent"
    },
    {
      id: 3,
      title: "Atualização SharePoint",
      description: "Dados são inseridos automaticamente na planilha Excel",
      status: "running",
      tool: "SharePoint",
      time: "5s",
      icon: FileSpreadsheet,
      color: "bg-primary"
    },
    {
      id: 4,
      title: "Envio de Confirmação",
      description: "E-mail automático para cliente e transportadora",
      status: "pending",
      tool: "Power Automate",
      time: "10s",
      icon: Zap,
      color: "bg-warning"
    },
    {
      id: 5,
      title: "Agendamento no Power Apps",
      description: "Registro aparece automaticamente no aplicativo",
      status: "pending",
      tool: "Power Apps",
      time: "Instantâneo",
      icon: Calendar,
      color: "bg-success"
    }
  ];

  const integrationData = [
    {
      service: "SharePoint Online",
      status: "Conectado",
      lastSync: "2 min atrás",
      records: "1.247",
      health: 98
    },
    {
      service: "Power Automate",
      status: "Executando",
      lastSync: "Em tempo real",
      records: "45 fluxos",
      health: 95
    },
    {
      service: "Outlook 365",
      status: "Monitorando",
      lastSync: "30s atrás",
      records: "12 novos",
      health: 100
    },
    {
      service: "Power BI",
      status: "Sincronizado",
      lastSync: "5 min atrás",
      records: "Dashboard",
      health: 92
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-success" />;
      case "running": return <RefreshCw className="h-5 w-5 text-primary animate-spin" />;
      case "pending": return <Clock className="h-5 w-5 text-muted-foreground" />;
      default: return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-gradient-automation rounded-lg shadow-automation">
              <Activity className="h-8 w-8 text-white" />
            </div>
            Fluxo de Automação Microsoft 365
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe como o Power Apps elimina o processo manual de agendamentos
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <PlayCircle className="h-4 w-4 mr-2" />
            Executar Teste
          </Button>
          <Button variant="secondary" size="sm">
            <Database className="h-4 w-4 mr-2" />
            Ver SharePoint
          </Button>
        </div>
      </div>

      {/* Real-time Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {integrationData.map((service, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Cloud className="h-6 w-6 text-primary" />
                <Badge variant={service.health > 95 ? "default" : "secondary"} className="text-xs">
                  {service.health}%
                </Badge>
              </div>
              <h3 className="font-semibold text-sm mb-1">{service.service}</h3>
              <p className="text-xs text-muted-foreground mb-2">{service.status}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{service.lastSync}</span>
                <span className="font-medium">{service.records}</span>
              </div>
              <Progress value={service.health} className="mt-3 h-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Flow Visualization */}
      <Tabs value={activeFlow} onValueChange={setActiveFlow} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email-automation">Automação de E-mail</TabsTrigger>
          <TabsTrigger value="data-flow">Fluxo de Dados</TabsTrigger>
          <TabsTrigger value="real-time">Monitoramento Live</TabsTrigger>
        </TabsList>

        <TabsContent value="email-automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Fluxo Automático: E-mail → SharePoint → Power Apps
              </CardTitle>
              <CardDescription>
                Processo completamente automatizado que elimina intervenção manual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`p-3 ${step.color} rounded-lg shadow-md`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold">{step.title}</h3>
                          {getStatusIcon(step.status)}
                          <Badge variant="outline" className="text-xs">
                            {step.tool}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <p className="text-xs text-primary font-medium mt-1">⏱️ {step.time}</p>
                      </div>
                      {index < automationSteps.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-flow" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-success" />
                  Excel/SharePoint Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total de Registros</span>
                    <span className="font-bold">1.247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Adicionados Hoje</span>
                    <span className="font-bold text-success">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pendentes</span>
                    <span className="font-bold text-warning">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Confirmados</span>
                    <span className="font-bold text-primary">15</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Abrir SharePoint
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                  Comunicação Automática
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">E-mails Enviados</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Confirmações Recebidas</span>
                    <span className="font-bold text-success">142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Aguardando Resposta</span>
                    <span className="font-bold text-warning">14</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Taxa de Sucesso</span>
                    <span className="font-bold text-primary">91%</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    <Mail className="h-4 w-4 mr-2" />
                    Ver Outlook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="real-time" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Atividade em Tempo Real</CardTitle>
              <CardDescription>Monitoramento ao vivo dos processos automatizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">14:23:45</TableCell>
                    <TableCell>E-mail Recebido</TableCell>
                    <TableCell>
                      <Badge variant="default">Processado</Badge>
                    </TableCell>
                    <TableCell>Cliente: FastLog Transportes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">14:23:52</TableCell>
                    <TableCell>SharePoint Atualizado</TableCell>
                    <TableCell>
                      <Badge variant="default">Sucesso</Badge>
                    </TableCell>
                    <TableCell>Novo agendamento #LIN-2024-456</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">14:24:01</TableCell>
                    <TableCell>Confirmação Enviada</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Enviando</Badge>
                    </TableCell>
                    <TableCell>Para: cliente@fastlog.com</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">14:24:15</TableCell>
                    <TableCell>Power Apps Sincronizado</TableCell>
                    <TableCell>
                      <Badge variant="default">Concluído</Badge>
                    </TableCell>
                    <TableCell>Visível no dashboard</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Before vs After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">❌ Processo Manual (Antes)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• E-mails chegam e ficam na caixa de entrada</li>
              <li>• Operador precisa ler e interpretar cada e-mail</li>
              <li>• Dados inseridos manualmente no Excel</li>
              <li>• Respostas digitadas individualmente</li>
              <li>• Tempo médio: <strong>15-20 minutos por agendamento</strong></li>
              <li>• Erros humanos frequentes</li>
              <li>• Trabalho apenas em horário comercial</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-success/20">
          <CardHeader>
            <CardTitle className="text-success">✅ Processo Automatizado (Agora)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• E-mails processados automaticamente</li>
              <li>• IA extrai dados com 95% de precisão</li>
              <li>• SharePoint atualizado instantaneamente</li>
              <li>• Respostas automáticas padronizadas</li>
              <li>• Tempo médio: <strong>30 segundos por agendamento</strong></li>
              <li>• Zero erros de digitação</li>
              <li>• Funciona 24/7, fins de semana inclusos</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};