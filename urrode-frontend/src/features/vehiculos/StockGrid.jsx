import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function StockGrid() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Estados del Modal de Reserva
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteDni, setClienteDni] = useState('');
  const [montoSeña, setMontoSeña] = useState('');
  const [transacting, setTransacting] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }

  const loadVehicles = () => {
    setLoading(true);
    let url = 'http://localhost:5000/api/v1/vehiculos';
    const params = [];
    if (statusFilter) params.push(`estado=${statusFilter}`);
    if (searchTerm) params.push(`marca=${searchTerm}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stock data', err);
        // Fallback en caso de que falte inicializar el backend
        const fallbackStock = [
          { id: 1, vin: 'WVWZZZ3CZGP100201', marca: 'Volkswagen', modelo: 'Golf GTI', anio: 2021, kilometraje: 24000, precio_compra: 28000, precio_lista: 35000, estado: 'DISPONIBLE' },
          { id: 2, vin: 'WBA8C3C5XGG099402', marca: 'BMW', modelo: '330i Sport', anio: 2020, kilometraje: 35000, precio_compra: 38000, precio_lista: 48000, estado: 'RESERVADO' },
          { id: 3, vin: '1C4PJLCB8KD129847', marca: 'Jeep', modelo: 'Compass Longitude', anio: 2022, kilometraje: 15000, precio_compra: 22000, precio_lista: 29000, estado: 'DISPONIBLE' },
          { id: 4, vin: 'ZARFBAEV2K7192837', marca: 'Alfa Romeo', modelo: 'Giulia Veloce', anio: 2019, kilometraje: 42000, precio_compra: 31000, precio_lista: 42000, estado: 'VENDIDO' },
          { id: 5, vin: 'SALWR2VF5JA839281', marca: 'Land Rover', modelo: 'Defender 110', anio: 2023, kilometraje: 8000, precio_compra: 75000, precio_lista: 98000, estado: 'DISPONIBLE' }
        ];
        
        let filtered = fallbackStock;
        if (statusFilter) {
          filtered = filtered.filter(v => v.estado.toUpperCase() === statusFilter.toUpperCase());
        }
        if (searchTerm) {
          filtered = filtered.filter(v => v.marca.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setVehicles(filtered);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadVehicles();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadVehicles();
  };

  const openReservaModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setClienteNombre('');
    setClienteDni('');
    setMontoSeña(Math.round(vehicle.precio_lista * 0.05)); // 5% sugerido por defecto
    setMessage(null);
  };

  const closeReservaModal = () => {
    if (!transacting) {
      setSelectedVehicle(null);
      setMessage(null);
    }
  };

  const submitReserva = (e) => {
    e.preventDefault();
    if (!clienteNombre || !clienteDni || !montoSeña) {
      setMessage({ type: 'error', text: 'Por favor complete todos los datos obligatorios.' });
      return;
    }

    setTransacting(true);
    setMessage(null);

    // Llamar a la API REST de Reservas
    fetch('http://localhost:5000/api/v1/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vehiculoId: selectedVehicle.id,
        clienteId: 101, // Simulado ID de cliente registrado
        montoReserva: parseFloat(montoSeña),
        vendedorId: 5 // Vendedor simulado (Martín Silva)
      })
    })
      .then(async (res) => {
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || 'Error al procesar la reserva en el servidor');
        }
        return result;
      })
      .then((data) => {
        setMessage({
          type: 'success',
          text: `🎉 ¡Reserva exitosa! El vehículo ha quedado bloqueado. Nro de Reserva: #${data.reserva.id}.`
        });
        setTransacting(false);
        // Recargar inventario para ver reflejado el cambio de estado
        loadVehicles();
        setTimeout(() => {
          setSelectedVehicle(null);
        }, 2500);
      })
      .catch((err) => {
        console.error('Error procesando reserva', err);
        setMessage({
          type: 'error',
          text: err.message || 'Error de conexión con el servidor. Verifique si el backend está encendido.'
        });
        setTransacting(false);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1>Control Global de Inventario</h1>
        <p className="subtitle">Consulta de stock, estado en tiempo real y asignación de reservas de forma consistente.</p>
      </div>

      {/* Barra de Filtros y Buscador */}
      <form onSubmit={handleSearchSubmit} className="filters-bar">
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <input 
            type="text" 
            placeholder="Buscar por marca o modelo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-search"
            style={{ paddingLeft: '2.75rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)} 
          className="select-filter"
        >
          <option value="">Todos los estados</option>
          <option value="DISPONIBLE">Disponibles</option>
          <option value="RESERVADO">Reservados</option>
          <option value="VENDIDO">Vendidos</option>
        </select>

        <button type="submit" className="btn-secondary">Buscar</button>
      </form>

      {/* Grilla de Stock en Formato Tabla Premium */}
      <div className="card-glass" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textDisplay: 'center', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Cargando inventario consolidado...
          </div>
        ) : vehicles.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No se encontraron vehículos que coincidan con la búsqueda.
          </div>
        ) : (
          <div className="table-container" style={{ margin: 0, border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Vehículo</th>
                  <th>Chasis (VIN)</th>
                  <th>Kilometraje</th>
                  <th>Año</th>
                  <th>Precio de Lista</th>
                  <th style={{ textAlign: 'center' }}>Estado</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '1rem' }}>{v.marca} {v.modelo}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {v.vin}
                    </td>
                    <td>{v.kilometraje.toLocaleString()} km</td>
                    <td>{v.anio}</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      ${v.precio_lista.toLocaleString()} USD
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${v.estado.toLowerCase()}`}>
                        {v.estado}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {v.estado === 'DISPONIBLE' ? (
                        <button 
                          className="btn-primary" 
                          style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                          onClick={() => openReservaModal(v)}
                        >
                          Reservar (Seña)
                        </button>
                      ) : v.estado === 'RESERVADO' ? (
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-reservado)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 500 }}>
                          <Clock size={14} /> Reservado
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle size={14} /> Vendido
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Glassmorphism de Reserva (Garantía Transaccional) */}
      {selectedVehicle && (
        <div className="modal-overlay" onClick={closeReservaModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 700 }}>Registrar Reserva Comercial</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Bloqueará el vehículo <strong>{selectedVehicle.marca} {selectedVehicle.modelo}</strong> (ID: {selectedVehicle.id}) para evitar la doble venta.
            </p>

            {message && (
              <div 
                className="alert-info" 
                style={{ 
                  backgroundColor: message.type === 'success' ? 'var(--color-disponible-bg)' : 'var(--color-vendido-bg)',
                  borderColor: message.type === 'success' ? 'var(--color-disponible)' : 'var(--color-vendido)',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {message.type === 'success' ? <CheckCircle size={20} style={{ color: 'var(--color-disponible)' }} /> : <AlertTriangle size={20} style={{ color: 'var(--color-vendido)' }} />}
                <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>{message.text}</span>
              </div>
            )}

            <form onSubmit={submitReserva} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Nombre del Cliente (DNI/ID Requerido)
                </label>
                <input 
                  type="text" 
                  placeholder="Juan Pérez" 
                  value={clienteNombre} 
                  onChange={(e) => setClienteNombre(e.target.value)}
                  disabled={transacting || (message && message.type === 'success')}
                  className="input-search"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Cédula / DNI / Identificación Fiscal
                </label>
                <input 
                  type="text" 
                  placeholder="20-38491823-9" 
                  value={clienteDni} 
                  onChange={(e) => setClienteDni(e.target.value)}
                  disabled={transacting || (message && message.type === 'success')}
                  className="input-search"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Monto de Reserva / Seña (USD)
                </label>
                <input 
                  type="number" 
                  value={montoSeña} 
                  onChange={(e) => setMontoSeña(e.target.value)}
                  disabled={transacting || (message && message.type === 'success')}
                  className="input-search"
                  style={{ width: '100%', fontWeight: 700, color: 'var(--primary)' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                  * El valor mínimo sugerido es el 5% del valor de lista (${(selectedVehicle.precio_lista * 0.05).toLocaleString()} USD).
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={closeReservaModal}
                  disabled={transacting}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={transacting || (message && message.type === 'success')}
                >
                  {transacting ? 'Bloqueando stock...' : 'Confirmar Reserva'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
