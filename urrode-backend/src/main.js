import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simulación de Base de Datos en Memoria para pruebas del MVP
// Garantiza la consistencia exigida por el core del negocio
let mockVehicles = [
  { id: 1, vin: 'WVWZZZ3CZGP100201', marca: 'Volkswagen', modelo: 'Golf GTI', anio: 2021, kilometraje: 24000, precio_compra: 28000, precio_lista: 35000, estado: 'DISPONIBLE' },
  { id: 2, vin: 'WBA8C3C5XGG099402', marca: 'BMW', modelo: '330i Sport', anio: 2020, kilometraje: 35000, precio_compra: 38000, precio_lista: 48000, estado: 'RESERVADO' },
  { id: 3, vin: '1C4PJLCB8KD129847', marca: 'Jeep', modelo: 'Compass Longitude', anio: 2022, kilometraje: 15000, precio_compra: 22000, precio_lista: 29000, estado: 'DISPONIBLE' },
  { id: 4, vin: 'ZARFBAEV2K7192837', marca: 'Alfa Romeo', modelo: 'Giulia Veloce', anio: 2019, kilometraje: 42000, precio_compra: 31000, precio_lista: 42000, estado: 'VENDIDO' },
  { id: 5, vin: 'SALWR2VF5JA839281', marca: 'Land Rover', modelo: 'Defender 110', anio: 2023, kilometraje: 8000, precio_compra: 75000, precio_lista: 98000, estado: 'DISPONIBLE' }
];

let mockReservas = [
  { id: 1, vehiculo_id: 2, cliente_id: 101, vendedor_id: 5, monto_reserva: 2000, fecha_inicio: '2026-05-20', fecha_expiracion: '2026-05-25', estado: 'ACTIVA' }
];

let mockClientes = [
  { id: 101, identificacion: '20-38491823-9', nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '+54 11 9832-1234', intereses: 'Sedanes deportivos, BMW' },
  { id: 102, identificacion: '27-40291834-4', nombre: 'María Rodríguez', email: 'maria.rod@email.com', telefono: '+54 9 261 456-7890', intereses: 'SUV familiar' }
];

let mockVentas = [
  { id: 1, vehiculo_id: 4, cliente_id: 102, vendedor_id: 5, monto_total: 41000, metodo_pago: 'Toma Usado + Transferencia', fecha_venta: '2026-05-10', factura_nro: 'A-0001-00000042' }
];

let mockLogsAuditoria = [
  { id: 1, usuario_id: 5, tabla_afectada: 'Vehiculos', registro_id: 4, accion: 'UPDATE', valor_anterior: '{"estado":"DISPONIBLE"}', valor_nuevo: '{"estado":"VENDIDO"}', fecha: '2026-05-10T14:35:00Z', ip_address: '192.168.1.52' }
];

// Endpoint de Salud del Backend
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    service: 'UrRode Backend API',
    environment: process.env.NODE_ENV || 'development'
  });
});

// GET /api/v1/vehiculos - Listado global con filtros
app.get('/api/v1/vehiculos', (req, res) => {
  const { estado, marca } = req.query;
  let filtered = [...mockVehicles];

  if (estado) {
    filtered = filtered.filter(v => v.estado.toUpperCase() === estado.toUpperCase());
  }
  if (marca) {
    filtered = filtered.filter(v => v.marca.toLowerCase().includes(marca.toLowerCase()));
  }

  res.json(filtered);
});

// POST /api/v1/reservas - Crear Reserva con Control de Concurrencia
app.post('/api/v1/reservas', (req, res) => {
  const { vehiculoId, clienteId, montoReserva, vendedorId } = req.body;

  if (!vehiculoId || !clienteId || !montoReserva) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para registrar la reserva' });
  }

  // Buscar el vehículo en nuestra "base de datos"
  const vehiculo = mockVehicles.find(v => v.id === parseInt(vehiculoId));

  if (!vehiculo) {
    return res.status(404).json({ error: 'El vehículo especificado no existe' });
  }

  // Regla de Negocio 2: Bloqueo de concurrencia e invariantes de estado
  if (vehiculo.estado !== 'DISPONIBLE') {
    return res.status(409).json({
      error: `Conflicto transaccional: El vehículo ya se encuentra en estado ${vehiculo.estado} y no puede ser reservado.`
    });
  }

  // Transacción atómica simulada
  vehiculo.estado = 'RESERVADO';
  
  const nuevaReserva = {
    id: mockReservas.length + 1,
    vehiculo_id: parseInt(vehiculoId),
    cliente_id: parseInt(clienteId),
    vendedor_id: parseInt(vendedorId || 1),
    monto_reserva: parseFloat(montoReserva),
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_expiracion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 días de expiración
    estado: 'ACTIVA'
  };

  mockReservas.push(nuevaReserva);

  // Registro de Auditoría Crítica
  const logAuditoria = {
    id: mockLogsAuditoria.length + 1,
    usuario_id: parseInt(vendedorId || 1),
    tabla_afectada: 'Vehiculos',
    registro_id: vehiculo.id,
    accion: 'UPDATE',
    valor_anterior: JSON.stringify({ estado: 'DISPONIBLE' }),
    valor_nuevo: JSON.stringify({ estado: 'RESERVADO' }),
    fecha: new Date().toISOString(),
    ip_address: req.ip || '127.0.0.1'
  };
  mockLogsAuditoria.push(logAuditoria);

  res.status(201).json({
    message: 'Reserva creada exitosamente y vehículo bloqueado.',
    reserva: nuevaReserva,
    vehiculo
  });
});

// GET /api/v1/dashboard/summary - Métricas e Inteligencia de Negocio del MVP
app.get('/api/v1/dashboard/summary', (req, res) => {
  const stockDisponible = mockVehicles.filter(v => v.estado === 'DISPONIBLE').length;
  const stockReservado = mockVehicles.filter(v => v.estado === 'RESERVADO').length;
  const stockVendido = mockVehicles.filter(v => v.estado === 'VENDIDO').length;
  
  const totalVentasMonto = mockVentas.reduce((sum, v) => sum + v.monto_total, 0);

  // Rendimiento simple por vendedor
  const performanceVendedores = [
    { vendedor: 'Sofía Rossi', ventas: 4, monto: 135000, conversion: '82%' },
    { vendedor: 'Carlos Giménez', ventas: 2, monto: 78000, conversion: '65%' },
    { vendedor: 'Martín Silva (Tú)', ventas: 1, monto: 41000, conversion: '50%' }
  ];

  res.json({
    kpis: {
      disponibles: stockDisponible,
      reservados: stockReservado,
      vendidos: stockVendido,
      total_stock: mockVehicles.length,
      facturado_mes: totalVentasMonto
    },
    autos_mas_vendidos: [
      { modelo: 'Golf GTI', unidades: 3, marca: 'Volkswagen' },
      { modelo: 'Compass', unidades: 2, marca: 'Jeep' }
    ],
    rendimiento_vendedores: performanceVendedores
  });
});

app.listen(PORT, () => {
  console.log(`🚀 UrRode Backend levantado exitosamente en http://localhost:${PORT}`);
});
