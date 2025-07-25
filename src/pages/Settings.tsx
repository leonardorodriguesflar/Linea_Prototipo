import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Bell, Mail, Smartphone, Shield } from "lucide-react"

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid gap-6">
        {/* Configurações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Informações da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input id="company-name" defaultValue="Línea Alimentos" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-cnpj">CNPJ</Label>
                <Input id="company-cnpj" defaultValue="12.345.678/0001-90" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Endereço</Label>
                <Input id="company-address" defaultValue="Rua Principal, 123 - Centro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Telefone</Label>
                <Input id="company-phone" defaultValue="(11) 99999-9999" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receba atualizações sobre entregas e agendamentos
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações em tempo real no navegador
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">SMS Críticos</Label>
                <p className="text-sm text-muted-foreground">
                  SMS apenas para problemas críticos nas entregas
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Configurações de Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-server">Servidor SMTP</Label>
                <Input id="smtp-server" defaultValue="smtp.gmail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Porta SMTP</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-from">Email Remetente</Label>
                <Input id="email-from" defaultValue="sistema@lineaalimentos.com.br" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-reply">Email para Resposta</Label>
                <Input id="email-reply" defaultValue="suporte@lineaalimentos.com.br" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Alterne entre tema claro e escuro
                </p>
              </div>
              <Switch />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Atualização Automática</Label>
                <p className="text-sm text-muted-foreground">
                  Atualize dados automaticamente a cada 30 segundos
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Backup Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Realizar backup diário dos dados às 02:00
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Salvar Configurações */}
        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}