import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Settings, User, Bell, Shield, Database, Palette } from "lucide-react"

interface SettingsState {
  companyName: string
  email: string
  phone: string
  address: string
  notifications: boolean
  emailAlerts: boolean
  smsAlerts: boolean
  theme: string
  language: string
  autoBackup: boolean
  backupFrequency: string
}

export default function SettingsManager() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<SettingsState>({
    companyName: "Línea Alimentos",
    email: "contato@lineaalimentos.com",
    phone: "(11) 99999-0000",
    address: "Rua da Logística, 123 - São Paulo/SP",
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    theme: "system",
    language: "pt-BR",
    autoBackup: true,
    backupFrequency: "daily"
  })

  const handleSave = () => {
    toast({
      title: "Configurações Salvas",
      description: "Suas configurações foram atualizadas com sucesso!"
    })
  }

  const handleReset = () => {
    setSettings({
      companyName: "Línea Alimentos",
      email: "contato@lineaalimentos.com",
      phone: "(11) 99999-0000",
      address: "Rua da Logística, 123 - São Paulo/SP",
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
      theme: "system",
      language: "pt-BR",
      autoBackup: true,
      backupFrequency: "daily"
    })
    toast({
      title: "Configurações Restauradas",
      description: "As configurações foram restauradas para o padrão."
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid gap-6">
        {/* Informações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                />
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
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">Receber notificações do sistema</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas por E-mail</Label>
                <p className="text-sm text-muted-foreground">Receber alertas importantes por e-mail</p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => setSettings({...settings, emailAlerts: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas por SMS</Label>
                <p className="text-sm text-muted-foreground">Receber alertas urgentes por SMS</p>
              </div>
              <Switch
                checked={settings.smsAlerts}
                onCheckedChange={(checked) => setSettings({...settings, smsAlerts: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup e Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Backup e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">Fazer backup automático dos dados</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
              />
            </div>
            {settings.autoBackup && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Frequência do Backup</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <Separator />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Database className="h-4 w-4 mr-2" />
                Fazer Backup Agora
              </Button>
              <Button variant="outline" className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                Restaurar Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button onClick={handleSave} className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Restaurar Padrão
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}