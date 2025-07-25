import React from 'react';

const App = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <header style={{
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#ff6b35', 
          margin: 0,
          fontSize: '24px'
        }}>
          🏢 Línea Alimentos - Sistema de Logística
        </h1>
        <p style={{ 
          color: '#666', 
          margin: '5px 0 0 0' 
        }}>
          Sistema Integrado de Agendamento e Monitoramento
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#ff6b35', marginBottom: '10px' }}>📅</div>
          <h3 style={{ fontSize: '32px', margin: '0 0 5px 0', color: '#333' }}>12</h3>
          <p style={{ margin: 0, color: '#666' }}>Agendamentos Hoje</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#2196F3', marginBottom: '10px' }}>📦</div>
          <h3 style={{ fontSize: '32px', margin: '0 0 5px 0', color: '#333' }}>8</h3>
          <p style={{ margin: 0, color: '#666' }}>Entregas Ativas</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#FFA726', marginBottom: '10px' }}>⏳</div>
          <h3 style={{ fontSize: '32px', margin: '0 0 5px 0', color: '#333' }}>5</h3>
          <p style={{ margin: 0, color: '#666' }}>Pendentes</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', color: '#4CAF50', marginBottom: '10px' }}>📈</div>
          <h3 style={{ fontSize: '32px', margin: '0 0 5px 0', color: '#333' }}>94%</h3>
          <p style={{ margin: 0, color: '#666' }}>Eficiência</p>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          color: '#333',
          fontSize: '20px'
        }}>
          📋 Agendamentos de Hoje
        </h2>
        
        <div style={{ marginBottom: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>🏪 Distribuidora Norte Ltda</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Cereais Premium - 2.5 toneladas</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px',
                display: 'block',
                marginBottom: '5px'
              }}>
                ✅ Confirmado
              </span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff6b35' }}>14:00</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>🛒 SuperMercado Central</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Laticínios Fresh - 1.8 toneladas</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ 
                backgroundColor: '#FFA726', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px',
                display: 'block',
                marginBottom: '5px'
              }}>
                ⏳ Pendente
              </span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff6b35' }}>15:30</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>🏢 Atacadão Sul</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Bebidas Fresh - 3.2 toneladas</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ 
                backgroundColor: '#2196F3', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px',
                display: 'block',
                marginBottom: '5px'
              }}>
                🚛 Em Rota
              </span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff6b35' }}>16:00</span>
            </div>
          </div>
        </div>
      </div>

      <footer style={{
        marginTop: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>© 2024 Línea Alimentos - Sistema de Logística v1.0</p>
      </footer>
    </div>
  );
};

export default App;