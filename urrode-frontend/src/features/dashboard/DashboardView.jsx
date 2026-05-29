import React, { useEffect, useState } from 'react';
import { Car, DollarSign, BookOpen, UserCheck, TrendingUp, BarChart2 } from 'lucide-react';

export default function DashboardView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consumir el endpoint real de salud y dashboard
    fetch('http://localhost:5000/api/v1/dashboard/summary')
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard summary, loading mock data', err);
        // Fallback robusto en caso de que el backend no esté encendido al previsualizar
        setData({
          kpis: { disponibles: 3, reservados: 1, vendidos: 1, total_stock: 5, facturado_mes: 41000 },
          autos_mas_vendidos: [
            { modelo: 'Golf GTI', unidades: 3, marca: 'Volkswagen' },
            { modelo: 'Compass', unidades: 2, marca: 'Jeep' }
          ],
          rendimiento_vendedores: [
            { vendedor: 'Sofía Rossi', ventas: 4, monto: 135000, conversion: '82%' },
            { vendedor: 'Carlos Giménez', ventas: 2, monto: 78000, conversion: '65%' },
            { vendedor: 'Martín Silva (Tú)', ventas: 1, monto: 41000, conversion: '50%' }
          ]
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Cargando analíticas en tiempo real...</p>
      </div>
    );
  }

  const { kpis, autos_mas_vendidos, rendimiento_vendedores } = data;

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1>Panel de Gestión Comercial</h1>
        <p className="subtitle">Métricas clave e inteligencia de negocio para UrRode.</p>
      </div>

      {/* Grid de KPIs */}
      <div className="grid-kpis">
        <div className="card-glass" style={{ borderLeft: '4px solid var(--color-disponible)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Disponibles</span>
            <Car size={20} style={{ color: 'var(--color-disponible)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{kpis.disponibles} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>unidades</span></h2>
        </div>

        <div className="card-glass" style={{ borderLeft: '4px solid var(--color-reservado)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Reservados</span>
            <BookOpen size={20} style={{ color: 'var(--color-reservado)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{kpis.reservados} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>unidades</span></h2>
        </div>

        <div className="card-glass" style={{ borderLeft: '4px solid var(--color-vendido)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Vendidos</span>
            <UserCheck size={20} style={{ color: 'var(--color-vendido)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{kpis.vendidos} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>entregados</span></h2>
        </div>

        <div className="card-glass" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Facturación Mensual</span>
            <DollarSign size={20} style={{ color: 'var(--primary)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
            ${kpis.facturado_mes.toLocaleString()} 
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400, display: 'block', marginTop: '0.2rem' }}>USD ingresados</span>
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Desempeño Comercial por Vendedor */}
        <div className="card-glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Ranking y Conversión de Ventas</h3>
          </div>
          
          <div className="table-container" style={{ marginTop: 0, border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '12px 10px' }}>Vendedor</th>
                  <th style={{ padding: '12px 10px', textAlign: 'center' }}>Ventas</th>
                  <th style={{ padding: '12px 10px', textAlign: 'right' }}>Monto Transaccionado</th>
                  <th style={{ padding: '12px 10px', textAlign: 'center' }}>Conversión</th>
                </tr>
              </thead>
              <tbody>
                {rendimiento_vendedores.map((v, i) => (
                  <tr key={i}>
                    <td style={{ padding: '14px 10px', fontWeight: 500 }}>{v.vendedor}</td>
                    <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                      <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem' }}>
                        {v.ventas}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'right', fontWeight: 600, color: 'var(--primary)' }}>
                      ${v.monto.toLocaleString()} USD
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                      <span style={{ color: 'var(--color-disponible)', fontWeight: 600 }}>{v.conversion}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modelos más Vendidos (Stock Insights) */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <BarChart2 size={22} style={{ color: 'var(--secondary)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Modelos Más Buscados</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {autos_mas_vendidos.map((auto, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ fontWeight: 500 }}>{auto.marca} {auto.modelo}</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{auto.unidades} unidades</span>
                  </div>
                  {/* Barra de progreso interactiva simulada */}
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: index === 0 ? '75%' : '45%', 
                      height: '100%', 
                      background: 'linear-gradient(90deg, var(--secondary) 0%, var(--primary) 100%)',
                      borderRadius: '3px' 
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="alert-info" style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              💡 <strong>Recomendación IA:</strong> Volkswagen Golf GTI presenta una rotación de solo 12 días en inventario. Se sugiere incrementar en un 15% el aprovisionamiento de este modelo para optimizar el capital inmovilizado.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
