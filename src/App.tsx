import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-background p-5">
      <header className="bg-card p-5 mb-5 rounded-lg shadow-md">
        <h1 className="text-primary text-2xl font-bold m-0">
          🏢 Línea Alimentos - Sistema de Logística
        </h1>
        <p className="text-muted-foreground mt-1 mb-0">
          Sistema Integrado de Agendamento e Monitoramento
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <div className="bg-card p-5 rounded-lg shadow-md text-center">
          <div className="text-3xl text-primary mb-3">📅</div>
          <h3 className="text-3xl font-bold m-0 mb-1 text-foreground">12</h3>
          <p className="m-0 text-muted-foreground">Agendamentos Hoje</p>
        </div>

        <div className="bg-card p-5 rounded-lg shadow-md text-center">
          <div className="text-3xl text-secondary mb-3">📦</div>
          <h3 className="text-3xl font-bold m-0 mb-1 text-foreground">8</h3>
          <p className="m-0 text-muted-foreground">Entregas Ativas</p>
        </div>

        <div className="bg-card p-5 rounded-lg shadow-md text-center">
          <div className="text-3xl text-warning mb-3">⏳</div>
          <h3 className="text-3xl font-bold m-0 mb-1 text-foreground">5</h3>
          <p className="m-0 text-muted-foreground">Pendentes</p>
        </div>

        <div className="bg-card p-5 rounded-lg shadow-md text-center">
          <div className="text-3xl text-success mb-3">📈</div>
          <h3 className="text-3xl font-bold m-0 mb-1 text-foreground">94%</h3>
          <p className="m-0 text-muted-foreground">Eficiência</p>
        </div>
      </div>

      <div className="bg-card p-5 rounded-lg shadow-md">
        <h2 className="m-0 mb-5 text-foreground text-xl font-semibold">
          📋 Agendamentos de Hoje
        </h2>
        
        <div className="mb-4 p-4 border border-border rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="m-0 mb-1 text-foreground font-medium">🏪 Distribuidora Norte Ltda</h4>
              <p className="m-0 text-muted-foreground text-sm">Cereais Premium - 2.5 toneladas</p>
            </div>
            <div className="text-right">
              <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs block mb-1">
                ✅ Confirmado
              </span>
              <span className="text-lg font-bold text-primary">14:00</span>
            </div>
          </div>
        </div>

        <div className="mb-4 p-4 border border-border rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="m-0 mb-1 text-foreground font-medium">🛒 SuperMercado Central</h4>
              <p className="m-0 text-muted-foreground text-sm">Laticínios Fresh - 1.8 toneladas</p>
            </div>
            <div className="text-right">
              <span className="bg-warning text-warning-foreground px-2 py-1 rounded text-xs block mb-1">
                ⏳ Pendente
              </span>
              <span className="text-lg font-bold text-primary">15:30</span>
            </div>
          </div>
        </div>

        <div className="p-4 border border-border rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="m-0 mb-1 text-foreground font-medium">🏢 Atacadão Sul</h4>
              <p className="m-0 text-muted-foreground text-sm">Bebidas Fresh - 3.2 toneladas</p>
            </div>
            <div className="text-right">
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs block mb-1">
                🚛 Em Rota
              </span>
              <span className="text-lg font-bold text-primary">16:00</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5 text-center text-muted-foreground text-sm">
        <p>© 2024 Línea Alimentos - Sistema de Logística v1.0</p>
      </footer>
    </div>
  );
};

export default App;