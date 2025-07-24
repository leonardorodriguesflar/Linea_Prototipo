import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Mail, Phone, Save } from "lucide-react";

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: "Línea Alimentos",
    cnpj: "12.345.678/0001-90",
    email: "contato@linea.com.br",
    phone: "(11) 98765-4321",
    address: "Av. Principal 123, Centro - São Paulo/SP"
  });

  const [userPreferences, setUserPreferences] = useState({
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    dateFormat: "DD/MM/YYYY",
    theme: "light"
  });

  const { toast } = useToast();

  const handleSaveGeneral = () => {
    toast({
      title: "Configurações salvas",
      description: "As informações da empresa foram atualizadas com sucesso",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notificações atualizadas",
      description: "Suas preferências de notificação foram salvas",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferências salvas",
      description: "Suas preferências de usuário foram atualizadas",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup iniciado",
      description: "O backup dos dados está sendo gerado...",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Gerando arquivo com todos os dados do sistema...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-primary">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações da Empresa
          </CardTitle>
          <CardDescription>
            Atualize os dados básicos da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input
                id="company-name"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo(prev => ({...prev, name: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-cnpj">CNPJ</Label>
              <Input
                id="company-cnpj"
                value={companyInfo.cnpj}
                onChange={(e) => setCompanyInfo(prev => ({...prev, cnpj: e.target.value}))}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-email">E-mail</Label>
              <Input
                id="company-email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo(prev => ({...prev, email: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Telefone</Label>
              <Input
                id="company-phone"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo(prev => ({...prev, phone: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-address">Endereço</Label>
            <Textarea
              id="company-address"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo(prev => ({...prev, address: e.target.value}))}
              rows={2}
            />
          </div>

          <Button onClick={handleSaveGeneral} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Informações
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          <CardDescription>
            Configure como você deseja receber notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Notificações por E-mail
              </Label>
              <p className="text-sm text-muted-foreground">
                Receba atualizações importantes por e-mail
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Notificações por SMS
              </Label>
              <p className="text-sm text-muted-foreground">
                Receba alertas urgentes via SMS
              </p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, sms: checked}))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações Push</Label>
              <p className="text-sm text-muted-foreground">
                Receba notificações no navegador
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>E-mails promocionais</Label>
              <p className="text-sm text-muted-foreground">
                Receba dicas e novidades do sistema
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications(prev => ({...prev, marketing: checked}))}
            />
          </div>

          <Button onClick={handleSaveNotifications} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Notificações
          </Button>
        </CardContent>
      </Card>

      {/* User Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Preferências do Usuário
          </CardTitle>
          <CardDescription>
            Personalize sua experiência no sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={userPreferences.language} onValueChange={(value) => setUserPreferences(prev => ({...prev, language: value}))}>
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

            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select value={userPreferences.timezone} onValueChange={(value) => setUserPreferences(prev => ({...prev, timezone: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                  <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                  <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-format">Formato de Data</Label>
              <Select value={userPreferences.dateFormat} onValueChange={(value) => setUserPreferences(prev => ({...prev, dateFormat: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/AAAA</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/AAAA</SelectItem>
                  <SelectItem value="YYYY-MM-DD">AAAA-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select value={userPreferences.theme} onValueChange={(value) => setUserPreferences(prev => ({...prev, theme: value}))}>
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
          </div>

          <Button onClick={handleSavePreferences} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Preferências
          </Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Gerenciamento de Dados
          </CardTitle>
          <CardDescription>
            Faça backup e gerencie os dados do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleBackup} variant="outline" className="gap-2">
              <Database className="h-4 w-4" />
              Fazer Backup
            </Button>
            <Button onClick={handleExportData} variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Exportar Dados
            </Button>
          </div>
          
          <Separator />
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Informações do Sistema</h4>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <p><span className="font-medium">Versão:</span> 1.0.0</p>
              <p><span className="font-medium">Último backup:</span> 15/01/2024</p>
              <p><span className="font-medium">Espaço usado:</span> 2.3 GB</p>
              <p><span className="font-medium">Uptime:</span> 99.9%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};