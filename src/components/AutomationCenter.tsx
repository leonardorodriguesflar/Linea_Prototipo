import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  Mail,
  MessageSquare,
  FileText,
  Phone,
  Activity,
  Settings,
  Play,
  Pause,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";

export const AutomationCenter = () => {
  const { toast } = useToast();
  const [robots, setRobots] = useState([
    {
      id: 1,
      name: "Email Auto-Responder",
      description: "Responde automaticamente e-mails de agendamento",
      status: "active",
      type: "email",
      efficiency: 95,
      processed: 247,
      savings: "8h/dia"
    },
    {
      id: 2,
      name: "WhatsApp Bot Línea",
      description: "Atende clientes via WhatsApp Business",
      status: "active",
      type: "whatsapp",
      efficiency: 89,
      processed: 156,
      savings: "6h/dia"
    },
    {
      id: 3,
      name: "Agenda Smart Sync",
      description: "Sincroniza agendamentos com sistemas externos",
      status: "paused",
      type: "integration",
      efficiency: 78,
      processed: 89,
      savings: "4h/dia"
    },
    {
      id: 4,
      name: "Document Generator",
      description: "Gera automaticamente confirmações e relatórios",
      status: "active",
      type: "document",
      efficiency: 92,
      processed: 312,
      savings: "5h/dia"
    }
  ]);

  const toggleRobot = (id: number) => {
    setRobots(robots.map(robot => {
      if (robot.id === id) {
        const newStatus = robot.status === 'active' ? 'paused' : 'active';
        const statusText = newStatus === 'active' ? 'ativado' : 'pausado';
        
        toast({
          title: `Robô ${statusText}!`,
          description: `${robot.name} foi ${statusText} com sucesso.`,
          variant: newStatus === 'active' ? 'default' : 'destructive',
        });
        
        return { ...robot, status: newStatus };
      }
      return robot;
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-5 w-5" />;
      case 'whatsapp': return <MessageSquare className="h-5 w-5" />;
      case 'integration': return <Activity className="h-5 w-5" />;
      case 'document': return <FileText className="h-5 w-5" />;
      default: return <Bot className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-success' : 'bg-warning';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-gradient-automation rounded-lg shadow-automation">
              <Bot className="h-8 w-8 text-white" />
            </div>
            Centro de Automação Línea
          </h1>
          <p className="text-muted-foreground mt-2">
            Robôs inteligentes trabalhando 24/7 para otimizar seus processos
          </p>
        </div>
        <Button variant="hero" className="shadow-automation">
          <Settings className="h-4 w-4 mr-2" />
          Configurar Novos Robôs
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary shadow-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Robôs Ativos</p>
                <p className="text-2xl font-bold text-primary-foreground">
                  {robots.filter(r => r.status === 'active').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-primary-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-foreground/80 text-sm">Processos Automatizados</p>
                <p className="text-2xl font-bold text-secondary-foreground">804</p>
              </div>
              <BarChart3 className="h-8 w-8 text-secondary-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/80 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground/80 text-sm">Tempo Economizado</p>
                <p className="text-2xl font-bold text-success-foreground">23h/dia</p>
              </div>
              <Clock className="h-8 w-8 text-success-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent to-warning shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Eficiência Média</p>
                <p className="text-2xl font-bold text-accent-foreground">91%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent-foreground/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="robots" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="robots">Robôs Ativos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="robots" className="space-y-4">
          <div className="grid gap-4">
            {robots.map((robot) => (
              <Card key={robot.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        {getTypeIcon(robot.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{robot.name}</CardTitle>
                        <CardDescription>{robot.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={`${getStatusColor(robot.status)} text-white`}
                      >
                        {robot.status === 'active' ? 'Ativo' : 'Pausado'}
                      </Badge>
                      <Switch
                        checked={robot.status === 'active'}
                        onCheckedChange={() => toggleRobot(robot.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Eficiência</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={robot.efficiency} className="flex-1" />
                        <span className="text-sm font-medium">{robot.efficiency}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Processados Hoje</p>
                      <p className="text-xl font-bold text-foreground">{robot.processed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tempo Economizado</p>
                      <p className="text-xl font-bold text-success">{robot.savings}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Config
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Stats
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance dos Robôs</CardTitle>
                <CardDescription>Últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Email Auto-Responder', 'WhatsApp Bot', 'Document Generator'].map((name, index) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="text-sm">{name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85 + index * 5} className="w-20" />
                        <span className="text-sm font-medium">{85 + index * 5}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impacto na Produtividade</CardTitle>
                <CardDescription>Comparativo mensal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tempo Manual (Antes)</span>
                    <span className="text-lg font-bold text-destructive">40h/dia</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tempo Automatizado (Agora)</span>
                    <span className="text-lg font-bold text-success">17h/dia</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Economia Total</span>
                      <span className="text-xl font-bold text-primary">23h/dia</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-dashed border-2 hover:border-primary transition-colors">
              <CardContent className="p-8 text-center">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">WhatsApp Business API</h3>
                <p className="text-muted-foreground mb-4">
                  Conecte robôs ao WhatsApp para atendimento 24/7
                </p>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 hover:border-primary transition-colors">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Outlook Integration</h3>
                <p className="text-muted-foreground mb-4">
                  Sincronize agendamentos com calendário corporativo
                </p>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Integrar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 hover:border-primary transition-colors">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">CRM External</h3>
                <p className="text-muted-foreground mb-4">
                  Integre com sistemas de CRM externos
                </p>
                <Button variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Conectar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 hover:border-primary transition-colors">
              <CardContent className="p-8 text-center">
                <Phone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Voice Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  Assistente de voz para agendamentos por telefone
                </p>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Em Breve
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};