import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  LayoutDashboard, Car, Users, ClipboardList, TrendingUp, Settings, 
  Menu, X, Search, Plus, Edit2, Trash2, CheckCircle2, AlertTriangle, 
  Info, DollarSign, ArrowUpRight, BarChart3, Activity, UserPlus, 
  Briefcase, Calendar, ChevronRight, User, Phone, Mail, Award, Clock, Sparkles
} from 'lucide-react';

// ==========================================
// MOCK DATA INICIAL (25 Autos y 20 Clientes)
// ==========================================
const INITIAL_VEHICLES = [
  { id: 1, vin: 'TOY-100201-HLX', marca: 'Toyota', modelo: 'Hilux SRX 4x4', anio: 2022, kilometraje: 18000, precio: 42000, estado: 'DISPONIBLE', vendedor: 'Carlos Giménez', fechaIngreso: '2026-02-15', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400' },
  { id: 2, vin: 'TOY-392812-CRL', marca: 'Toyota', modelo: 'Corolla SEG Hybrid', anio: 2021, kilometraje: 25000, precio: 26000, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-03-10', imagen: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400' },
  { id: 3, vin: 'FOR-099402-RPT', marca: 'Ford', modelo: 'Ranger Raptor', anio: 2023, kilometraje: 8500, precio: 68000, estado: 'RESERVADO', vendedor: 'Martín Silva', fechaIngreso: '2026-04-01', imagen: 'https://images.unsplash.com/photo-1533599422139-00dd791d7d8e?auto=format&fit=crop&q=80&w=400' },
  { id: 4, vin: 'FOR-291823-MST', marca: 'Ford', modelo: 'Mustang GT Premium', anio: 2020, kilometraje: 32000, precio: 55000, estado: 'VENDIDO', vendedor: 'Martín Silva', fechaIngreso: '2026-01-12', imagen: 'https://images.unsplash.com/photo-1612462274051-fc655848e6c8?auto=format&fit=crop&q=80&w=400' },
  { id: 5, vin: 'CHV-129847-CRZ', marca: 'Chevrolet', modelo: 'Cruze LTZ Sedan', anio: 2021, kilometraje: 41000, precio: 19500, estado: 'DISPONIBLE', vendedor: 'Carlos Giménez', fechaIngreso: '2026-04-18', imagen: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400' },
  { id: 6, vin: 'CHV-719283-CMR', marca: 'Chevrolet', modelo: 'Camaro SS V8', anio: 2019, kilometraje: 28000, precio: 49000, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-03-22', imagen: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=400' },
  { id: 7, vin: 'VLK-839281-AMR', marca: 'Volkswagen', modelo: 'Amarok V6 Extreme', anio: 2022, kilometraje: 15000, precio: 48000, estado: 'RESERVADO', vendedor: 'Carlos Giménez', fechaIngreso: '2026-05-02', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400' },
  { id: 8, vin: 'VLK-100201-GLF', marca: 'Volkswagen', modelo: 'Golf GTI mk8', anio: 2021, kilometraje: 24000, precio: 35000, estado: 'DISPONIBLE', vendedor: 'Martín Silva', fechaIngreso: '2026-05-15', imagen: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400' },
  { id: 9, vin: 'VLK-291834-TAO', marca: 'Volkswagen', modelo: 'Taos Highline', anio: 2023, kilometraje: 6000, precio: 32000, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-05-19', imagen: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400' },
  { id: 10, vin: 'HON-384918-CVC', marca: 'Honda', modelo: 'Civic EX Sedan', anio: 2020, kilometraje: 35000, precio: 22000, estado: 'DISPONIBLE', vendedor: 'Carlos Giménez', fechaIngreso: '2026-03-29', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400' },
  { id: 11, vin: 'HON-402918-CRV', marca: 'Honda', modelo: 'CR-V Touring AWD', anio: 2021, kilometraje: 22000, precio: 36500, estado: 'VENDIDO', vendedor: 'Sofía Rossi', fechaIngreso: '2026-02-12', imagen: 'https://images.unsplash.com/photo-1533599422139-00dd791d7d8e?auto=format&fit=crop&q=80&w=400' },
  { id: 12, vin: 'BMW-8C3C5X-M3C', marca: 'BMW', modelo: 'M3 Competition', anio: 2022, kilometraje: 4200, precio: 125000, estado: 'DISPONIBLE', vendedor: 'Martín Silva', fechaIngreso: '2026-05-01', imagen: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400' },
  { id: 13, vin: 'BMW-928371-330', marca: 'BMW', modelo: '330i Sport Pro', anio: 2020, kilometraje: 35000, precio: 48000, estado: 'RESERVADO', vendedor: 'Martín Silva', fechaIngreso: '2026-04-20', imagen: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400' },
  { id: 14, vin: 'AUD-ZARFBA-R8V', marca: 'Audi', modelo: 'R8 V10 Plus Coupe', anio: 2018, kilometraje: 18500, precio: 165000, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-04-28', imagen: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400' },
  { id: 15, vin: 'AUD-SALWR2-Q5T', marca: 'Audi', modelo: 'Q5 TFSI S-Line', anio: 2021, kilometraje: 29000, precio: 52000, estado: 'DISPONIBLE', vendedor: 'Carlos Giménez', fechaIngreso: '2026-04-05', imagen: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400' },
  { id: 16, vin: 'MER-SALWR2-C30', marca: 'Mercedes-Benz', modelo: 'C300 Coupe AMG', anio: 2022, kilometraje: 12000, precio: 58000, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-05-10', imagen: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400' },
  { id: 17, vin: 'MER-839281-GLC', marca: 'Mercedes-Benz', modelo: 'GLC 300 Offroad', anio: 2020, kilometraje: 45000, precio: 46000, estado: 'VENDIDO', vendedor: 'Carlos Giménez', fechaIngreso: '2026-01-20', imagen: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400' },
  { id: 18, vin: 'NIS-1C4PJL-FRN', marca: 'Nissan', modelo: 'Frontier PRO-4X', anio: 2022, kilometraje: 16000, precio: 38500, estado: 'DISPONIBLE', vendedor: 'Carlos Giménez', fechaIngreso: '2026-05-14', imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400' },
  { id: 19, vin: 'NIS-ZARFBA-SNT', marca: 'Nissan', modelo: 'Sentra Exclusive', anio: 2021, kilometraje: 22000, precio: 21000, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-05-18', imagen: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400' },
  { id: 20, vin: 'TOY-ZARFBA-SW4', marca: 'Toyota', modelo: 'SW4 Diamond V6', anio: 2023, kilometraje: 9200, precio: 62000, estado: 'DISPONIBLE', vendedor: 'Martín Silva', fechaIngreso: '2026-04-12', imagen: 'https://images.unsplash.com/photo-1533599422139-00dd791d7d8e?auto=format&fit=crop&q=80&w=400' },
  { id: 21, vin: 'FOR-SALWR2-TRT', marca: 'Ford', modelo: 'Territory Titanium', anio: 2022, kilometraje: 14000, precio: 31500, estado: 'DISPONIBLE', vendedor: 'Carlos Giménez', fechaIngreso: '2026-05-08', imagen: 'https://images.unsplash.com/photo-1533599422139-00dd791d7d8e?auto=format&fit=crop&q=80&w=400' },
  { id: 22, vin: 'AUD-839281-ASL', marca: 'Audi', modelo: 'A4 S-Line Sedan', anio: 2020, kilometraje: 36000, precio: 38000, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-03-15', imagen: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400' },
  { id: 23, vin: 'BMW-8C3C5X-X5D', marca: 'BMW', modelo: 'X5 xDrive Premium', anio: 2021, kilometraje: 24000, precio: 85000, estado: 'VENDIDO', vendedor: 'Martín Silva', fechaIngreso: '2026-02-28', imagen: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400' },
  { id: 24, vin: 'HON-SALWR2-ACD', marca: 'Honda', modelo: 'Accord 2.0T Touring', anio: 2019, kilometraje: 52000, precio: 27000, estado: 'DISPONIBLE', vendedor: 'Carlos Giménez', fechaIngreso: '2026-04-30', imagen: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400' },
  { id: 25, vin: 'NIS-839281-KCK', marca: 'Nissan', modelo: 'Kicks Exclusive', anio: 2022, kilometraje: 15000, precio: 18500, estado: 'DISPONIBLE', vendedor: 'Sofía Rossi', fechaIngreso: '2026-05-12', imagen: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400' }
];

const INITIAL_CLIENTES = [
  { id: 1, identificacion: '20-38491823-9', nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '+54 11 9832-1234', intereses: 'Toyota Corolla SEG', vendedor: 'Sofía Rossi', probabilidad_cierre: 85, estado_comercial: 'Negociando', notas: 'Cliente muy interesado en híbridos. Hizo test drive y quedó conforme.', timeline: [{ fecha: '2026-05-20', accion: 'Test Drive', detalle: 'Completó test drive de Corolla Hybrid con éxito.' }, { fecha: '2026-05-18', accion: 'Contacto inicial', detalle: 'Ingresó por recomendación web.' }] },
  { id: 2, identificacion: '27-40291834-4', nombre: 'María Rodríguez', email: 'maria.rod@email.com', telefono: '+54 9 261 456-7890', intereses: 'Volkswagen Taos', vendedor: 'Carlos Giménez', probabilidad_cierre: 60, estado_comercial: 'Contactado', notas: 'Duda entre Taos y Honda CR-V. Requiere financiación prendaria.', timeline: [{ fecha: '2026-05-21', accion: 'Llamada', detalle: 'Se enviaron planes de cuota fija.' }] },
  { id: 3, identificacion: '20-11234984-2', nombre: 'Carlos Giménez', email: 'carlos.gim@email.com', telefono: '+5 Argent. 483-9281', intereses: 'Ford Ranger Raptor', vendedor: 'Martín Silva', probabilidad_cierre: 75, estado_comercial: 'Negociando', notas: 'Busca pickup para trabajo y ocio. Espera tasar su auto usado.', timeline: [{ fecha: '2026-05-22', accion: 'Tasación', detalle: 'Se agendó tasación para el sábado.' }] },
  { id: 4, identificacion: '27-98374829-1', nombre: 'Sofía Rossi', email: 'sofia.rossi@email.com', telefono: '+54 9 11 3849-2819', intereses: 'Audi R8 V10', vendedor: 'Sofía Rossi', probabilidad_cierre: 40, estado_comercial: 'Nuevo Lead', notas: 'Coleccionista de autos de alta gama. Requiere discreción corporativa.', timeline: [{ fecha: '2026-05-21', accion: 'Email', detalle: 'Se envió catálogo VIP.' }] },
  { id: 5, identificacion: '20-48291039-3', nombre: 'Andrés Gómez', email: 'andres.gomez@email.com', telefono: '+54 11 2837-4928', intereses: 'Chevrolet Cruze LTZ', vendedor: 'Carlos Giménez', probabilidad_cierre: 50, estado_comercial: 'Contactado', notas: 'Busca entrega inmediata. Color indiferente.', timeline: [{ fecha: '2026-05-19', accion: 'WhatsApp', detalle: 'Consultó disponibilidad de stock.' }] },
  { id: 6, identificacion: '27-28394829-9', nombre: 'Lucía Fernández', email: 'lucia.f@email.com', telefono: '+54 9 341 982-3849', intereses: 'Volkswagen Golf GTI', vendedor: 'Martín Silva', probabilidad_cierre: 65, estado_comercial: 'Negociando', notas: 'Fanática de la marca. Quiere color gris oscuro de ser posible.', timeline: [{ fecha: '2026-05-22', accion: 'Cotización', detalle: 'Se envió proforma de Golf GTI.' }] },
  { id: 7, identificacion: '20-92817263-2', nombre: 'Javier López', email: 'j.lopez@email.com', telefono: '+54 9 261 983-2918', intereses: 'Ford Ranger Raptor', vendedor: 'Martín Silva', probabilidad_cierre: 90, estado_comercial: 'Reservado', notas: 'Dejó seña de $5,000 USD. Preparando contrato prendario.', timeline: [{ fecha: '2026-05-20', accion: 'Reserva', detalle: 'Señaló Ford Ranger Raptor en sucursal.' }] },
  { id: 8, identificacion: '27-38492819-4', nombre: 'Florencia Diaz', email: 'florencia.diaz@email.com', telefono: '+54 11 8374-2918', intereses: 'Toyota SW4 Diamond', vendedor: 'Carlos Giménez', probabilidad_cierre: 95, estado_comercial: 'Reservado', notas: 'Vehículo en preparación de entrega física.', timeline: [{ fecha: '2026-05-22', accion: 'Papeleo', detalle: 'Se completaron formularios de transferencia fiscal.' }] },
  { id: 9, identificacion: '20-29182394-8', nombre: 'Diego Martínez', email: 'diego.mtz@email.com', telefono: '+54 9 11 2938-4928', intereses: 'Ford Mustang GT', vendedor: 'Martín Silva', probabilidad_cierre: 30, estado_comercial: 'Perdido', notas: 'Desiste de la compra temporalmente por cambio de radicación fiscal.', timeline: [{ fecha: '2026-05-18', accion: 'Cierre fallido', detalle: 'Confirmó que no avanzará por el momento.' }] },
  { id: 10, identificacion: '27-10293849-5', nombre: 'Valentina Ruiz', email: 'valen.ruiz@email.com', telefono: '+54 9 351 283-9182', intereses: 'Honda Civic EX', vendedor: 'Sofía Rossi', probabilidad_cierre: 70, estado_comercial: 'Negociando', notas: 'Espera aprobación de crédito bancario.', timeline: [{ fecha: '2026-05-20', accion: 'Pre-Aprobación', detalle: 'Banco pre-aprobó línea prendaria.' }] },
  { id: 11, identificacion: '20-91823948-4', nombre: 'Bruno Castro', email: 'b.castro@email.com', telefono: '+54 11 9876-5432', intereses: 'Mercedes-Benz C300', vendedor: 'Sofía Rossi', probabilidad_cierre: 55, estado_comercial: 'Contactado', notas: 'Interesado en toma de usado (Audi A3 2018).', timeline: [{ fecha: '2026-05-21', accion: 'Llamada', detalle: 'Se coordinó visita presencial al salón.' }] },
  { id: 12, identificacion: '27-29384928-1', nombre: 'Camila Romero', email: 'cami.romero@email.com', telefono: '+54 9 11 2837-9182', intereses: 'Volkswagen Amarok V6', vendedor: 'Carlos Giménez', probabilidad_cierre: 85, estado_comercial: 'Reservado', notas: 'Dejó seña por Amarok V6 id #7. Listo para patentar.', timeline: [{ fecha: '2026-05-22', accion: 'Acreditación', detalle: 'Seña de $4,000 USD acreditada.' }] },
  { id: 13, identificacion: '20-38492837-2', nombre: 'Esteban Sosa', email: 'esteban.sosa@email.com', telefono: '+54 9 261 384-9182', intereses: 'Audi Q5 TFSI', vendedor: 'Carlos Giménez', probabilidad_cierre: 45, estado_comercial: 'Nuevo Lead', notas: 'Consultó por cotización y planes de leasing corporativo.', timeline: [{ fecha: '2026-05-22', accion: 'Cotización', detalle: 'Enviada propuesta comercial por email.' }] },
  { id: 14, identificacion: '27-91827364-3', nombre: 'Paula Benítez', email: 'paula.benitez@email.com', telefono: '+54 11 2839-4827', intereses: 'Nissan Frontier PRO-4X', vendedor: 'Carlos Giménez', probabilidad_cierre: 60, estado_comercial: 'Contactado', notas: 'Espera test-drive del modelo Frontier.', timeline: [{ fecha: '2026-05-21', accion: 'Agendado', detalle: 'Test drive agendado para el lunes.' }] },
  { id: 15, identificacion: '20-19283746-5', nombre: 'Gabriel Medina', email: 'gabriel.medina@email.com', telefono: '+54 9 11 3849-2811', intereses: 'BMW 330i Sport', vendedor: 'Martín Silva', probabilidad_cierre: 85, estado_comercial: 'Reservado', notas: 'Bloqueó BMW 330i. Cierre previsto para fin de mes.', timeline: [{ fecha: '2026-05-20', accion: 'Reserva', detalle: 'Recibido depósito de garantía.' }] },
  { id: 16, identificacion: '27-28391827-4', nombre: 'Victoria Herrera', email: 'v.herrera@email.com', telefono: '+54 9 351 982-3819', intereses: 'Volkswagen Taos Highline', vendedor: 'Sofía Rossi', probabilidad_cierre: 75, estado_comercial: 'Negociando', notas: 'Analiza permuta por auto menor valor.', timeline: [{ fecha: '2026-05-22', accion: 'Tasación', detalle: 'Se evaluaron fotos de su unidad usada.' }] },
  { id: 17, identificacion: '20-92837482-1', nombre: 'Nicolás Flores', email: 'nflores@email.com', telefono: '+54 11 3849-1928', intereses: 'Ford Ranger Raptor', vendedor: 'Martín Silva', probabilidad_cierre: 90, estado_comercial: 'Cerrado', notas: 'Venta concretada del auto id #4 (Ford Mustang GT).', timeline: [{ fecha: '2026-05-10', accion: 'Venta', detalle: 'Se entregaron llaves físicas de Mustang.' }] },
  { id: 18, identificacion: '27-83928192-3', nombre: 'Juana Torres', email: 'juana.torres@email.com', telefono: '+54 9 341 283-9182', intereses: 'Audi A4 S-Line', vendedor: 'Sofía Rossi', probabilidad_cierre: 50, estado_comercial: 'Contactado', notas: 'Consultó por planes de financiación a largo plazo.', timeline: [{ fecha: '2026-05-21', accion: 'Llamada', detalle: 'Primer llamada de contacto completada.' }] },
  { id: 19, identificacion: '20-28391823-9', nombre: 'Lautaro Silva', email: 'l.silva@email.com', telefono: '+54 11 9283-4819', intereses: 'Honda Accord 2.0T', vendedor: 'Carlos Giménez', probabilidad_cierre: 65, estado_comercial: 'Negociando', notas: 'Quiere coordinar videollamada para revisión técnica remota.', timeline: [{ fecha: '2026-05-22', accion: 'Coordinación', detalle: 'Coordinado meet técnico.' }] },
  { id: 20, identificacion: '27-38491283-1', nombre: 'Macarena Gómez', email: 'maca.g@email.com', telefono: '+54 9 261 483-9281', intereses: 'Nissan Kicks Exclusive', vendedor: 'Sofía Rossi', probabilidad_cierre: 80, estado_comercial: 'Negociando', notas: 'Evaluando opción color rojo bi-tono.', timeline: [{ fecha: '2026-05-22', accion: 'Cotización', detalle: 'Se envió proforma bonificada.' }] }
];

const INITIAL_ACTIVIDAD = [
  { id: 1, usuario: 'Martín Silva', descripcion: 'Venta cerrada de Ford Mustang GT (#4)', tipo: 'venta', timestamp: 'Hace 5 minutos' },
  { id: 2, usuario: 'Sofía Rossi', descripcion: 'Registró seguimiento de Juan Pérez', tipo: 'seguimiento', timestamp: 'Hace 15 minutos' },
  { id: 3, usuario: 'Carlos Giménez', descripcion: 'Acreditó reserva de Amarok V6 (#7) por $4,000 USD', tipo: 'reserva', timestamp: 'Hace 45 minutos' },
  { id: 4, usuario: 'Martín Silva', descripcion: 'Cargó tasación para pickup de Carlos Giménez', tipo: 'CRM', timestamp: 'Hace 2 horas' },
  { id: 5, usuario: 'Sofía Rossi', descripcion: 'Creó nuevo Lead: Esteban Sosa interesado en Audi Q5', tipo: 'lead', timestamp: 'Hace 4 horas' },
  { id: 6, usuario: 'Sistema', descripcion: 'Alerta inteligente: Volkswagen Golf GTI cumple 60 días inmovilizado', tipo: 'alerta', timestamp: 'Hace 6 horas' }
];

const KANBAN_STAGES = ['Nuevo Lead', 'Contactado', 'Negociando', 'Reservado', 'Cerrado', 'Perdido'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
};

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);

  // ==========================================
  // ESTADO PERSISTENTE EN LOCAL STORAGE
  // ==========================================
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('messi_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('messi_clientes');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTES;
  });

  const [actividad, setActividad] = useState(() => {
    const saved = localStorage.getItem('messi_actividad');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVIDAD;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('messi_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('messi_clientes', JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem('messi_actividad', JSON.stringify(actividad));
  }, [actividad]);

  // Toast premium minimalista
  const showToast = (text, type = 'success') => {
    const newToast = { id: Date.now(), text, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const addActividad = (usuario, descripcion, tipo) => {
    const newAct = {
      id: Date.now(),
      usuario,
      descripcion,
      tipo,
      timestamp: 'Hace unos instantes'
    };
    setActividad((prev) => [newAct, ...prev]);
  };

  // ==========================================
  // ESTADOS DE INVENTARIO
  // ==========================================
  const [stockSearch, setStockSearch] = useState('');
  const [stockFilterBrand, setStockFilterBrand] = useState('');
  const [stockFilterStatus, setStockFilterStatus] = useState('');
  const [stockSortField, setStockSortField] = useState('marca');
  const [stockSortOrder, setStockSortOrder] = useState('asc');

  // Modal Alta/Edición
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehFormData, setVehFormData] = useState({
    vin: '', marca: 'Toyota', modelo: '', anio: 2023, kilometraje: 0, precio: 20000, estado: 'DISPONIBLE', vendedor: 'Martín Silva', imagen: ''
  });

  const handleOpenVehicleModal = (veh = null) => {
    if (veh) {
      setEditingVehicle(veh);
      setVehFormData({ ...veh });
    } else {
      setEditingVehicle(null);
      setVehFormData({
        vin: `VIN-${Math.floor(100000 + Math.random() * 900000)}`,
        marca: 'Toyota', modelo: '', anio: 2023, kilometraje: 0, precio: 25000, estado: 'DISPONIBLE', vendedor: 'Martín Silva', imagen: ''
      });
    }
    setIsVehicleModalOpen(true);
  };

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    if (!vehFormData.modelo || !vehFormData.marca || !vehFormData.precio) {
      showToast('Por favor, complete todos los campos obligatorios', 'error');
      return;
    }

    const defaultImages = {
      Toyota: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400',
      Ford: 'https://images.unsplash.com/photo-1533599422139-00dd791d7d8e?auto=format&fit=crop&q=80&w=400',
      Chevrolet: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
      Volkswagen: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400',
      BMW: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400',
      Audi: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400',
      Mercedes: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400',
      Nissan: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400',
      Honda: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400'
    };
    const finalImage = vehFormData.imagen || defaultImages[vehFormData.marca] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400';

    if (editingVehicle) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === editingVehicle.id ? { ...v, ...vehFormData, imagen: finalImage } : v))
      );
      addActividad('Martín Silva', `Editó ficha técnica de ${vehFormData.marca} ${vehFormData.modelo}`, 'editar');
      showToast(`Vehículo ${vehFormData.marca} editado con éxito.`);
    } else {
      const newVeh = {
        ...vehFormData,
        id: Date.now(),
        fechaIngreso: new Date().toISOString().split('T')[0],
        imagen: finalImage
      };
      setVehicles((prev) => [newVeh, ...prev]);
      addActividad('Martín Silva', `Ingresó al stock: ${vehFormData.marca} ${vehFormData.modelo}`, 'alta');
      showToast(`Vehículo ${vehFormData.marca} ingresado al stock.`);
    }
    setIsVehicleModalOpen(false);
  };

  const handleDeleteVehicle = (id, label) => {
    if (window.confirm(`¿Seguro que desea eliminar del stock: ${label}?`)) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      addActividad('Martín Silva', `Eliminó el auto ${label}`, 'eliminar');
      showToast(`Vehículo eliminado con éxito`, 'error');
    }
  };

  // ==========================================
  // ESTADOS DE CLIENTES (CRM)
  // ==========================================
  const [expandedClienteId, setExpandedClienteId] = useState(null);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [followUpForm, setFollowUpForm] = useState({ accion: 'Llamada', detalle: '', probabilidad: 50 });

  const handleOpenFollowUp = (cliente) => {
    setSelectedCliente(cliente);
    setFollowUpForm({ accion: 'Llamada', detalle: '', probabilidad: cliente.probabilidad_cierre });
    setIsFollowUpModalOpen(true);
  };

  const handleSaveFollowUp = (e) => {
    e.preventDefault();
    if (!followUpForm.detalle) {
      showToast('Por favor, agregue notas del contacto comercial', 'error');
      return;
    }

    setClientes((prev) =>
      prev.map((c) => {
        if (c.id === selectedCliente.id) {
          const newTimeline = [
            {
              fecha: new Date().toISOString().split('T')[0],
              accion: followUpForm.accion,
              detalle: followUpForm.detalle
            },
            ...c.timeline
          ];
          return {
            ...c,
            probabilidad_cierre: parseInt(followUpForm.probabilidad),
            timeline: newTimeline,
            notas: followUpForm.detalle
          };
        }
        return c;
      })
    );

    addActividad('Martín Silva', `Seguimiento de CRM registrado para ${selectedCliente.nombre}`, 'CRM');
    showToast(`Historial actualizado para ${selectedCliente.nombre}`);
    setIsFollowUpModalOpen(false);
  };

  // ==========================================
  // ESTADOS DE KANBAN (CON DRAG AND DROP NATIVO)
  // ==========================================
  const handleMoveKanbanCard = (clientId, newStage) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, estado_comercial: newStage } : c))
    );
    const client = clientes.find((c) => c.id === clientId);
    addActividad('Martín Silva', `Movió lead de ${client.nombre} a columna ${newStage}`, 'Kanban');
    showToast(`Pipeline: ${client.nombre} promovido a ${newStage}`);
  };

  // Drag and drop HTML5
  const [draggingCardId, setDraggingCardId] = useState(null);

  const handleDragStart = (e, cardId) => {
    setDraggingCardId(cardId);
    e.dataTransfer.setData('text/plain', cardId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageName) => {
    e.preventDefault();
    const cardId = parseInt(e.dataTransfer.getData('text/plain'));
    if (cardId) {
      handleMoveKanbanCard(cardId, stageName);
    }
    setDraggingCardId(null);
  };

  // ==========================================
  // REGISTRO DE VENTAS REACTIVO
  // ==========================================
  const [saleForm, setSaleForm] = useState({
    clienteId: '', vehiculoId: '', vendedor: 'Martín Silva', metodoPago: 'Transferencia Bancaria', observaciones: ''
  });

  const handleRegisterSale = (e) => {
    e.preventDefault();
    if (!saleForm.clienteId || !saleForm.vehiculoId) {
      showToast('Por favor, complete todos los campos obligatorios del registro de venta', 'error');
      return;
    }

    const veh = vehicles.find((v) => v.id === parseInt(saleForm.vehiculoId));
    const client = clientes.find((c) => c.id === parseInt(saleForm.clienteId));

    if (!veh || !client) return;

    if (veh.estado === 'VENDIDO') {
      showToast('Este vehículo ya figura como vendido', 'error');
      return;
    }

    // Update vehicle to sold
    setVehicles((prev) =>
      prev.map((v) => (v.id === veh.id ? { ...v, estado: 'VENDIDO' } : v))
    );

    // Promote in Kanban to Closed and 100%
    setClientes((prev) =>
      prev.map((c) =>
        c.id === client.id
          ? {
              ...c,
              estado_comercial: 'Cerrado',
              probabilidad_cierre: 100,
              timeline: [
                {
                  fecha: new Date().toISOString().split('T')[0],
                  accion: 'Venta Cerrada',
                  detalle: `Adquirió ${veh.marca} ${veh.modelo} por $${veh.precio.toLocaleString()} USD.`
                },
                ...c.timeline
              ]
            }
          : c
      )
    );

    addActividad(
      saleForm.vendedor,
      `Venta facturada: ${client.nombre} adquirió ${veh.marca} ${veh.modelo}`,
      'venta'
    );

    showToast(`Operación de venta registrada. Flota y CRM actualizados.`, 'success');

    // Reset form
    setSaleForm({
      clienteId: '', vehiculoId: '', vendedor: 'Martín Silva', metodoPago: 'Transferencia Bancaria', observaciones: ''
    });

    // Move to Dashboard to see updated metrics
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 600);
  };

  // ==========================================
  // CÁLCULOS MÉTRICOS GENERALES DEL NEGOCIO (DASHBOARD REACTIVO)
  // ==========================================
  const vehDisp = vehicles.filter((v) => v.estado === 'DISPONIBLE').length;
  const vehRes = vehicles.filter((v) => v.estado === 'RESERVADO').length;
  const vehVend = vehicles.filter((v) => v.estado === 'VENDIDO').length;
  
  const totalFacturado = vehicles
    .filter((v) => v.estado === 'VENDIDO')
    .reduce((sum, v) => sum + v.precio, 0);

  const ticketPromedio = vehVend > 0 ? Math.round(totalFacturado / vehVend) : 0;
  const conversCommercial = clientes.length > 0 ? Math.round(
    (clientes.filter((c) => c.estado_comercial === 'Cerrado').length / clientes.length) * 100
  ) : 0;

  const leadsActivos = clientes.filter(
    (c) => c.estado_comercial !== 'Cerrado' && c.estado_comercial !== 'Perdido'
  ).length;

  const getAlertas = () => {
    const alerts = [];
    const brandsMap = {};
    vehicles.filter(v => v.estado === 'DISPONIBLE').forEach(v => {
      brandsMap[v.marca] = (brandsMap[v.marca] || 0) + 1;
    });
    
    Object.keys(brandsMap).forEach(brand => {
      if (brandsMap[brand] <= 2) {
        alerts.push({ type: 'warning', text: `Stock bajo de ${brand}: Solo quedan ${brandsMap[brand]} unidades listas para entrega.` });
      }
    });

    clientes.forEach(c => {
      if (c.probabilidad_cierre >= 80 && c.estado_comercial !== 'Cerrado' && c.estado_comercial !== 'Reservado') {
        alerts.push({ type: 'danger', text: `Lead Caliente: ${c.nombre} presenta scoring de conversión del ${c.probabilidad_cierre}% sin concretar cierre.` });
      }
    });

    if (vehRes > 0) {
      alerts.push({ type: 'info', text: `Seguimiento de Reserva: Se detectan ${vehRes} reservas activas con bloqueo transaccional.` });
    }

    return alerts.slice(0, 3);
  };

  const activeAlerts = getAlertas();

  // Recharts aggregation
  const getBrandDistribution = () => {
    const brands = {};
    vehicles.forEach(v => {
      brands[v.marca] = (brands[v.marca] || 0) + 1;
    });
    return Object.keys(brands).map(b => ({
      name: b,
      cantidad: brands[b]
    })).sort((a,b) => b.cantidad - a.cantidad).slice(0, 6);
  };

  const brandData = getBrandDistribution();

  const salesTrendData = [
    { name: 'Ene', facturacion: 85000, ventas: 2 },
    { name: 'Feb', facturacion: 145000, ventas: 3 },
    { name: 'Mar', facturacion: 110000, ventas: 2 },
    { name: 'Abr', facturacion: 195000, ventas: 4 },
    { name: 'May', facturacion: totalFacturado > 0 ? totalFacturado : 230000, ventas: vehVend > 0 ? vehVend : 5 },
  ];

  const stockStatusData = [
    { name: 'Disponible', value: vehDisp, color: '#0891b2' }, // Cyan
    { name: 'Reservado', value: vehRes, color: '#d97706' },  // Amber
    { name: 'Vendido', value: vehVend, color: '#7c3aed' },    // Violet
  ];

  const insights = [
    { id: 1, text: "Toyota Corolla es el vehículo más consultado por canales de contacto web.", icon: "🔥", color: "rgba(124, 58, 237, 0.06)" },
    { id: 2, text: "Las reservas del salón aumentaron un 18% esta semana en comparación con el promedio general.", icon: "📈", color: "rgba(8, 145, 178, 0.06)" },
    { id: 3, text: `${clientes.filter(c => c.probabilidad_cierre >= 80 && c.estado_comercial !== 'Cerrado' && c.estado_comercial !== 'Reservado').length} clientes altamente calificados sin seguimiento comercial en las últimas 24 horas.`, icon: "⚠️", color: "rgba(225, 29, 72, 0.06)" }
  ];

  const sidebarTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventario', label: 'Inventario', icon: Car },
    { id: 'clientes', label: 'Clientes CRM', icon: Users },
    { id: 'kanban', label: 'Pipeline CRM', icon: ClipboardList },
    { id: 'ventas', label: 'Registrar Venta', icon: DollarSign },
    { id: 'reportes', label: 'Reportes', icon: TrendingUp },
    { id: 'configuracion', label: 'Configuración', icon: Settings }
  ];

  return (
    <div className="app-shell">
      {/* Toast Flotante minimalista al estilo Vercel / Linear */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className={`toast ${t.type === 'error' ? 'error' : 'success'}`}
            >
              {t.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
              <span>{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <div 
          className="modal-backdrop" 
          style={{ zIndex: 199 }} 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ==========================================
          SIDEBAR APP-LIKE (LINEAR / STRIPE STYLE)
          ========================================== */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-mark">
            <Sparkles size={16} style={{ color: '#FFFFFF' }} />
          </div>
          <span className="sidebar-logo-text">Messi Concesionaria</span>
        </div>

        <button 
          className="sidebar-collapse-btn sr-only" 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Plataforma</div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {sidebarTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <div 
                  key={tab.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileOpen(false);
                  }}
                  style={{ position: 'relative' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="active-bg-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--blue-subtle)',
                        borderRadius: 'var(--r-md)',
                        zIndex: -1
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="nav-icon"><IconComp size={18} /></span>
                  <span className="nav-label">{tab.label}</span>
                </div>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="sidebar-collapse-btn" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ display: 'flex', gap: '8px', padding: '8px 10px', width: '100%', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
          >
            <Menu size={16} />
            {!sidebarCollapsed && <span style={{ fontSize: '12px', fontWeight: 500 }}>Contraer panel</span>}
          </button>
          <div className="sidebar-user">
            <div className="sidebar-avatar">MS</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Martín Silva</div>
              <div className="sidebar-user-role">Director de Ventas</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ==========================================
          ÁREA DE CONTENIDO CENTRAL VIVA
          ========================================== */}
      <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        
        {/* Mobile Header Bar */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }} className="mobile-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '30px', height: '30px', borderRadius: '7px', 
              background: 'linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sparkles size={14} style={{ color: '#FFFFFF' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em' }}>Concesionaria de Messi</span>
          </div>
          <button 
            onClick={() => setMobileOpen(true)}
            style={{ padding: '6px', color: 'var(--text-2)' }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="page-wrapper"
          >
            
            {/* ==========================================
                TAB: DASHBOARD PREMIUM
                ========================================== */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="page-header">
                  <h1 className="page-title">Panel de Control General</h1>
                  <p className="page-subtitle">Indicadores comerciales clave, análisis del mercado de vehículos y control del CRM en tiempo real.</p>
                </div>

                {/* KPIs Premium Grid */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="kpi-grid"
                >
                  <motion.div variants={itemVariants} className="kpi-card">
                    <div className="kpi-accent-bar" style={{ background: 'var(--blue)' }} />
                    <div className="kpi-label">
                      <span>Ventas del Mes</span>
                      <Award size={14} style={{ color: 'var(--blue)' }} />
                    </div>
                    <div className="kpi-value colored-blue">{vehVend} <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>unidades</span></div>
                    <div className="kpi-delta up">
                      <ArrowUpRight size={10} />
                      <span>+12.4% vs. mes ant.</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="kpi-card">
                    <div className="kpi-accent-bar" style={{ background: 'var(--violet)' }} />
                    <div className="kpi-label">
                      <span>Facturación Total</span>
                      <DollarSign size={14} style={{ color: 'var(--violet)' }} />
                    </div>
                    <div className="kpi-value">${totalFacturado.toLocaleString()}</div>
                    <div className="kpi-delta up">
                      <ArrowUpRight size={10} />
                      <span>+18.1% efectividad</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="kpi-card">
                    <div className="kpi-accent-bar" style={{ background: 'var(--cyan)' }} />
                    <div className="kpi-label">
                      <span>Autos Disponibles</span>
                      <Car size={14} style={{ color: 'var(--cyan)' }} />
                    </div>
                    <div className="kpi-value colored-blue">{vehDisp}</div>
                    <div className="kpi-delta neutral">
                      <span>Stock listo para entrega</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="kpi-card">
                    <div className="kpi-accent-bar" style={{ background: 'var(--emerald)' }} />
                    <div className="kpi-label">
                      <span>Conversión Comercial</span>
                      <TrendingUp size={14} style={{ color: 'var(--emerald)' }} />
                    </div>
                    <div className="kpi-value colored-emerald">{conversCommercial}%</div>
                    <div className="kpi-delta up">
                      <ArrowUpRight size={10} />
                      <span>Optimización CRM</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="kpi-card">
                    <div className="kpi-accent-bar" style={{ background: 'var(--amber)' }} />
                    <div className="kpi-label">
                      <span>Leads Activos</span>
                      <Users size={14} style={{ color: 'var(--amber)' }} />
                    </div>
                    <div className="kpi-value colored-amber">{leadsActivos}</div>
                    <div className="kpi-delta up">
                      <span>3 listos para cierre</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="kpi-card">
                    <div className="kpi-accent-bar" style={{ background: 'var(--rose)' }} />
                    <div className="kpi-label">
                      <span>Reservas Pendientes</span>
                      <Clock size={14} style={{ color: 'var(--rose)' }} />
                    </div>
                    <div className="kpi-value">{vehRes}</div>
                    <div className="kpi-delta neutral">
                      <span>Garantía de seña activa</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* GRÁFICOS REALES Y PREMIUM */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }} className="grid-charts-wrapper">
                  <div className="chart-card">
                    <div className="chart-title">Volumen de Facturación & Tendencia Mensual</div>
                    <div style={{ width: '100%', height: '240px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorFacturacion" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.12}/>
                              <stop offset="95%" stopColor="var(--blue)" stopOpacity={0.0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" stroke="var(--text-4)" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis stroke="var(--text-4)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                          <Tooltip 
                            contentStyle={{ 
                              background: 'var(--bg-surface)', 
                              border: '1px solid var(--border)', 
                              borderRadius: 'var(--r-md)', 
                              fontSize: '12px',
                              boxShadow: 'var(--shadow-md)' 
                            }} 
                            formatter={(value) => [`$${value.toLocaleString()} USD`, 'Facturación']}
                          />
                          <Area type="monotone" dataKey="facturacion" stroke="var(--blue)" strokeWidth={2} fillOpacity={1} fill="url(#colorFacturacion)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="chart-card">
                    <div className="chart-title">Distribución de Flota en Salón</div>
                    <div style={{ width: '100%', height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100%', height: '180px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={stockStatusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={75}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {stockStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                background: 'var(--bg-surface)', 
                                border: '1px solid var(--border)', 
                                borderRadius: 'var(--r-sm)', 
                                fontSize: '11px' 
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 500, color: 'var(--text-2)', marginTop: '8px' }}>
                        {stockStatusData.map((d, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: d.color }} />
                            <span>{d.name} ({d.value})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN DETALLADA: INSIGHTS & FEED */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-details-wrapper">
                  <div className="card">
                    <div className="section-header">
                      <div className="section-title">
                        <Sparkles size={16} style={{ color: 'var(--violet)' }} />
                        <span>Insights Inteligentes y Sugerencias</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {insights.map((ins) => (
                        <div key={ins.id} className="insight-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
                          <div className="insight-icon" style={{ background: ins.color, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', fontSize: '16px' }}>
                            {ins.icon}
                          </div>
                          <span style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.4 }}>{ins.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <div className="section-header">
                      <div className="section-title">
                        <Activity size={16} style={{ color: 'var(--cyan)' }} />
                        <span>Monitoreo de Actividad Comercial</span>
                      </div>
                    </div>
                    <div className="activity-feed">
                      {actividad.slice(0, 4).map((act) => (
                        <div key={act.id} className="activity-item">
                          <div className="activity-avatar">
                            {act.usuario.substring(0, 2).toUpperCase()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div className="activity-text">
                              <strong>{act.usuario}</strong> {act.descripcion}
                            </div>
                            <div className="activity-time">{act.timestamp}</div>
                          </div>
                          <span className={`badge ${
                            act.tipo === 'venta' ? 'disponible' : act.tipo === 'reserva' ? 'reservado' : 'neutral'
                          }`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                            {act.tipo.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                TAB: INVENTARIO DE EXPOSICIÓN
                ========================================== */}
            {activeTab === 'inventario' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h1 className="page-title">Flota & Catálogo de Exposición</h1>
                    <p className="page-subtitle">Buscador unificado, control técnico del stock de unidades de alta gama.</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => handleOpenVehicleModal()}>
                    <Plus size={16} />
                    <span>Agregar Unidad</span>
                  </button>
                </div>

                {/* Barra de Filtros Premium */}
                <div className="filters-bar">
                  <div className="search-wrap">
                    <input 
                      type="text" 
                      placeholder="Buscar por marca o versión..."
                      value={stockSearch}
                      onChange={(e) => setStockSearch(e.target.value)}
                      className="form-input"
                    />
                    <Search size={15} className="search-icon" />
                  </div>

                  <select className="form-select" style={{ width: '160px' }} value={stockFilterBrand} onChange={(e) => setStockFilterBrand(e.target.value)}>
                    <option value="">Todas las marcas</option>
                    {['Toyota', 'Ford', 'Chevrolet', 'Volkswagen', 'Honda', 'BMW', 'Audi', 'Mercedes-Benz', 'Nissan'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>

                  <select className="form-select" style={{ width: '160px' }} value={stockFilterStatus} onChange={(e) => setStockFilterStatus(e.target.value)}>
                    <option value="">Todos los estados</option>
                    <option value="DISPONIBLE">Disponibles</option>
                    <option value="RESERVADO">Reservados</option>
                    <option value="VENDIDO">Vendidos</option>
                  </select>

                  <div style={{ display: 'flex', gap: '6px', width: '180px' }}>
                    <select className="form-select" style={{ flex: 1 }} value={stockSortField} onChange={(e) => setStockSortField(e.target.value)}>
                      <option value="marca">Marca</option>
                      <option value="precio">Precio</option>
                      <option value="anio">Año</option>
                      <option value="kilometraje">Km</option>
                    </select>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{ padding: '8px 10px' }}
                      onClick={() => setStockSortOrder(stockSortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                      {stockSortOrder === 'asc' ? '▲' : '▼'}
                    </button>
                  </div>
                </div>

                {/* Tabla de Inventario de alta gama */}
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>FOTO</th>
                        <th>VEHÍCULO</th>
                        <th>CHASIS (VIN)</th>
                        <th>AÑO / KILÓMETROS</th>
                        <th>PRECIO DE LISTA</th>
                        <th style={{ textAlign: 'center' }}>ESTADO</th>
                        <th>ASESOR</th>
                        <th style={{ textAlign: 'right' }}>ACCIONES</th>
                      </tr>
                    </thead>
                    <motion.tbody 
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {vehicles
                        .filter((v) => {
                          const matchesSearch = (v.marca + ' ' + v.modelo).toLowerCase().includes(stockSearch.toLowerCase());
                          const matchesBrand = stockFilterBrand ? v.marca === stockFilterBrand : true;
                          const matchesStatus = stockFilterStatus ? v.estado === stockFilterStatus : true;
                          return matchesSearch && matchesBrand && matchesStatus;
                        })
                        .sort((a, b) => {
                          let mult = stockSortOrder === 'asc' ? 1 : -1;
                          if (stockSortField === 'precio') return (a.precio - b.precio) * mult;
                          if (stockSortField === 'anio') return (a.anio - b.anio) * mult;
                          if (stockSortField === 'kilometraje') return (a.kilometraje - b.kilometraje) * mult;
                          return a.marca.localeCompare(b.marca) * mult;
                        })
                        .map((v) => (
                          <motion.tr variants={itemVariants} key={v.id}>
                            <td>
                              <img 
                                src={v.imagen} 
                                alt={`${v.marca} ${v.modelo}`}
                                className="vehicle-thumb"
                              />
                            </td>
                            <td>
                              <div style={{ fontWeight: 700, color: 'var(--text-1)' }}>{v.marca} {v.modelo}</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-4)', marginTop: '2px' }}>Ingreso: {v.fechaIngreso}</div>
                            </td>
                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-3)' }}>{v.vin}</td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{v.anio}</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px' }}>{v.kilometraje.toLocaleString()} km</div>
                            </td>
                            <td style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '14px' }}>
                              ${v.precio.toLocaleString()} USD
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span className={`badge ${v.estado.toLowerCase()}`}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: v.estado === 'DISPONIBLE' ? 'var(--emerald)' : v.estado === 'RESERVADO' ? 'var(--amber)' : 'var(--rose)' }} />
                                {v.estado}
                              </span>
                            </td>
                            <td style={{ fontSize: '12px', fontWeight: 500 }}>{v.vendedor}</td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '4px' }}>
                                <button className="btn btn-secondary btn-icon" onClick={() => handleOpenVehicleModal(v)}>
                                  <Edit2 size={12} />
                                </button>
                                <button className="btn btn-secondary btn-icon" style={{ color: 'var(--rose)' }} onClick={() => handleDeleteVehicle(v.id, `${v.marca} ${v.modelo}`)}>
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                    </motion.tbody>
                  </table>
                </div>

                {/* Modal de Alta e Ingreso de Vehículos */}
                <AnimatePresence>
                  {isVehicleModalOpen && (
                    <div className="modal-backdrop" onClick={() => setIsVehicleModalOpen(false)}>
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.3 }}
                        className="modal-panel" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="modal-header">
                          <h2 className="modal-title">
                            {editingVehicle ? 'Editar Ficha Técnica' : 'Ingresar Nueva Unidad'}
                          </h2>
                          <button onClick={() => setIsVehicleModalOpen(false)} style={{ color: 'var(--text-3)' }}>
                            <X size={18} />
                          </button>
                        </div>

                        <form onSubmit={handleSaveVehicle} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <div className="form-group">
                            <label className="form-label">Marca *</label>
                            <select 
                              className="form-select" 
                              value={vehFormData.marca} 
                              onChange={(e) => setVehFormData({ ...vehFormData, marca: e.target.value })}
                            >
                              {['Toyota', 'Ford', 'Chevrolet', 'Volkswagen', 'Honda', 'BMW', 'Audi', 'Mercedes-Benz', 'Nissan'].map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Modelo / Versión *</label>
                            <input 
                              type="text" 
                              placeholder="Ej. Hilux SRX"
                              value={vehFormData.modelo}
                              onChange={(e) => setVehFormData({ ...vehFormData, modelo: e.target.value })}
                              className="form-input"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">VIN (Chasis)</label>
                            <input 
                              type="text" 
                              value={vehFormData.vin}
                              onChange={(e) => setVehFormData({ ...vehFormData, vin: e.target.value })}
                              className="form-input"
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Año fabricación *</label>
                            <input 
                              type="number" 
                              value={vehFormData.anio}
                              onChange={(e) => setVehFormData({ ...vehFormData, anio: parseInt(e.target.value) })}
                              className="form-input"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Odómetro (Km) *</label>
                            <input 
                              type="number" 
                              value={vehFormData.kilometraje}
                              onChange={(e) => setVehFormData({ ...vehFormData, kilometraje: parseInt(e.target.value) })}
                              className="form-input"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Precio USD *</label>
                            <input 
                              type="number" 
                              value={vehFormData.precio}
                              onChange={(e) => setVehFormData({ ...vehFormData, precio: parseInt(e.target.value) })}
                              className="form-input"
                              style={{ color: 'var(--blue)', fontWeight: 700 }}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Estado</label>
                            <select 
                              className="form-select"
                              value={vehFormData.estado}
                              onChange={(e) => setVehFormData({ ...vehFormData, estado: e.target.value })}
                            >
                              <option value="DISPONIBLE">DISPONIBLE</option>
                              <option value="RESERVADO">RESERVADO</option>
                              <option value="VENDIDO">VENDIDO</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Asesor Asignado</label>
                            <select 
                              className="form-select"
                              value={vehFormData.vendedor}
                              onChange={(e) => setVehFormData({ ...vehFormData, vendedor: e.target.value })}
                            >
                              <option value="Martín Silva">Martín Silva</option>
                              <option value="Sofía Rossi">Sofía Rossi</option>
                              <option value="Carlos Giménez">Carlos Giménez</option>
                            </select>
                          </div>

                          <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">URL de Imagen</label>
                            <input 
                              type="text" 
                              placeholder="https://images.unsplash.com/photo-..."
                              value={vehFormData.imagen}
                              onChange={(e) => setVehFormData({ ...vehFormData, imagen: e.target.value })}
                              className="form-input"
                            />
                          </div>

                          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsVehicleModalOpen(false)}>
                              Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Guardar cambios
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ==========================================
                TAB: CLIENTES CRM 360
                ========================================== */}
            {activeTab === 'clientes' && (
              <div>
                <div className="page-header">
                  <h1 className="page-title">Clientes & Fichas CRM 360</h1>
                  <p className="page-subtitle">Monitoreo de scoring predictivo de conversión, canales de contacto directo e historial Notion-style.</p>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  {clientes.map((c) => {
                    const isExpanded = expandedClienteId === c.id;
                    return (
                      <motion.div 
                        variants={itemVariants} 
                        key={c.id} 
                        className="card" 
                        style={{ borderLeft: c.probabilidad_cierre >= 85 ? '3px solid var(--violet)' : '1px solid var(--border)' }}
                      >
                        <div 
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', flexWrap: 'wrap', gap: '12px' }}
                          onClick={() => setExpandedClienteId(isExpanded ? null : c.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--blue-glow)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: 'var(--blue)'
                            }}>
                              {c.nombre.split(' ').map(n=>n[0]).join('')}
                            </div>
                            <div>
                              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-1)' }}>{c.nombre}</h3>
                              <span style={{ fontSize: '11px', color: 'var(--text-4)' }}>ID: {c.identificacion}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                            <div className="hide-on-mobile">
                              <span style={{ fontSize: '11px', color: 'var(--text-3)', display: 'block' }}>Interés Comercial</span>
                              <span style={{ fontSize: '13px', fontWeight: 600 }}>{c.intereses}</span>
                            </div>

                            <div className="hide-on-mobile">
                              <span style={{ fontSize: '11px', color: 'var(--text-3)', display: 'block' }}>Scoring predictivo</span>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: c.probabilidad_cierre >= 80 ? 'var(--emerald)' : 'var(--violet)' }}>
                                {c.probabilidad_cierre}%
                              </span>
                            </div>

                            <span className={`badge ${
                              c.estado_comercial === 'Cerrado' ? 'disponible' : c.estado_comercial === 'Reservado' ? 'reservado' : 'neutral'
                            }`} style={{ fontSize: '11px' }}>
                              {c.estado_comercial}
                            </span>

                            <ChevronRight size={16} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'var(--t-fast)', color: 'var(--text-3)' }} />
                          </div>
                        </div>

                        {isExpanded && (
                          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="grid-crm-details">
                            <div>
                              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Notas de Seguimiento</h4>
                              <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: '1.5', backgroundColor: 'var(--bg-raised)', padding: '12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', marginBottom: '12px' }}>
                                {c.notes || c.notas || 'Sin notas del prospecto.'}
                              </p>

                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <a href={`tel:${c.telefono}`} className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
                                  <Phone size={12} /> <span>Llamar</span>
                                </a>
                                <a href={`mailto:${c.email}`} className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
                                  <Mail size={12} /> <span>Email</span>
                                </a>
                                <button className="btn btn-primary btn-sm" onClick={() => handleOpenFollowUp(c)}>
                                  Registrar Acción
                                </button>
                              </div>
                            </div>

                            <div>
                              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--violet)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Timeline Comercial</h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto', paddingRight: '4px' }}>
                                {c.timeline.map((t, i) => (
                                  <div key={i} style={{ display: 'flex', gap: '6px', fontSize: '12px' }}>
                                    <span style={{ color: 'var(--text-3)', fontWeight: 600 }}>{t.fecha}</span>
                                    <span style={{ color: 'var(--violet)', fontWeight: 700 }}>[{t.accion}]</span>
                                    <span style={{ color: 'var(--text-2)' }}>{t.detalle}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Modal para Registrar Seguimiento */}
                <AnimatePresence>
                  {isFollowUpModalOpen && (
                    <div className="modal-backdrop" onClick={() => setIsFollowUpModalOpen(false)}>
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="modal-panel" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="modal-header">
                          <h2 className="modal-title">Seguimiento: {selectedCliente?.nombre}</h2>
                          <button onClick={() => setIsFollowUpModalOpen(false)} style={{ color: 'var(--text-3)' }}>
                            <X size={18} />
                          </button>
                        </div>

                        <form onSubmit={handleSaveFollowUp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <div className="form-group">
                            <label className="form-label">Acción Comercial</label>
                            <select 
                              className="form-select"
                              value={followUpForm.accion}
                              onChange={(e) => setFollowUpForm({ ...followUpForm, accion: e.target.value })}
                            >
                              <option value="Llamada">Llamada telefónica</option>
                              <option value="WhatsApp">Mensaje de WhatsApp</option>
                              <option value="Email">Correo electrónico</option>
                              <option value="Reunión">Test Drive / Visita</option>
                              <option value="Cotización">Cotización Oficial</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Scoring de Conversión ({followUpForm.probabilidad}%)</label>
                            <input 
                              type="range" 
                              min="10" 
                              max="100"
                              value={followUpForm.probabilidad}
                              onChange={(e) => setFollowUpForm({ ...followUpForm, probabilidad: parseInt(e.target.value) })}
                              style={{ cursor: 'pointer', height: '6px', background: 'var(--border)' }}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Notas e interacción comercial *</label>
                            <textarea 
                              rows="3"
                              placeholder="Escriba los detalles de la conversación..."
                              value={followUpForm.detalle}
                              onChange={(e) => setFollowUpForm({ ...followUpForm, detalle: e.target.value })}
                              className="form-input"
                              style={{ resize: 'none' }}
                              required
                            />
                          </div>

                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsFollowUpModalOpen(false)}>
                              Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Registrar
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ==========================================
                TAB: KANBAN PIPELINE
                ========================================== */}
            {activeTab === 'kanban' && (
              <div>
                <div className="page-header">
                  <h1 className="page-title">Pipeline Comercial Kanban</h1>
                  <p className="page-subtitle">Arrastra y organiza tus leads a lo largo del embudo de conversión para agilizar el cierre.</p>
                </div>

                <div className="kanban-board" onDragOver={handleDragOver}>
                  {KANBAN_STAGES.map((stage) => {
                    const stageClients = clientes.filter((c) => c.estado_comercial === stage);
                    return (
                      <div 
                        key={stage} 
                        className="kanban-col"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, stage)}
                      >
                        <div className="kanban-col-header">
                          <span className="kanban-col-title">{stage}</span>
                          <span className="kanban-count">
                            {stageClients.length}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: '400px' }}>
                          {stageClients.map((c) => (
                            <motion.div 
                              key={c.id} 
                              className="kanban-card"
                              draggable
                              onDragStart={(e) => handleDragStart(e, c.id)}
                              whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
                              whileTap={{ scale: 0.98 }}
                              layout
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span className="kanban-card-name">{c.nombre}</span>
                                <span style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 700 }}>{c.probabilidad_cierre}%</span>
                              </div>
                              
                              <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>
                                🚗 {c.intereses}
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-4)', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                                <span>👤 {c.vendedor}</span>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <button 
                                    disabled={KANBAN_STAGES.indexOf(stage) === 0}
                                    onClick={() => handleMoveKanbanCard(c.id, KANBAN_STAGES[KANBAN_STAGES.indexOf(stage) - 1])}
                                    style={{ color: 'var(--text-4)', cursor: 'pointer', fontSize: '10px' }}
                                    aria-label="Move left"
                                  >
                                    ◀
                                  </button>
                                  <button 
                                    disabled={KANBAN_STAGES.indexOf(stage) === KANBAN_STAGES.length - 1}
                                    onClick={() => handleMoveKanbanCard(c.id, KANBAN_STAGES[KANBAN_STAGES.indexOf(stage) + 1])}
                                    style={{ color: 'var(--text-4)', cursor: 'pointer', fontSize: '10px' }}
                                    aria-label="Move right"
                                  >
                                    ▶
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==========================================
                TAB: REGISTRAR VENTA
                ========================================== */}
            {activeTab === 'ventas' && (
              <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                  <h1 className="page-title">Registrar Nueva Venta</h1>
                  <p className="page-subtitle">Liquida la operación, bloquea la unidad vendida en stock y asocia el cierre en el CRM.</p>
                </div>

                <div className="card">
                  <form onSubmit={handleRegisterSale} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group">
                        <label className="form-label">Cliente Comprador *</label>
                        <select 
                          className="form-select"
                          value={saleForm.clienteId}
                          onChange={(e) => setSaleForm({ ...saleForm, clienteId: e.target.value })}
                          required
                        >
                          <option value="">-- Seleccionar CRM --</option>
                          {clientes
                            .filter(c => c.estado_comercial !== 'Cerrado')
                            .map(c => (
                              <option key={c.id} value={c.id}>{c.nombre} (Conversion: {c.probabilidad_cierre}%)</option>
                            ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Vehículo Comprado *</label>
                        <select 
                          className="form-select"
                          value={saleForm.vehiculoId}
                          onChange={(e) => setSaleForm({ ...saleForm, vehiculoId: e.target.value })}
                          required
                        >
                          <option value="">-- Seleccionar Vehículo --</option>
                          {vehicles
                            .filter(v => v.estado !== 'VENDIDO')
                            .map(v => (
                              <option key={v.id} value={v.id}>
                                {v.marca} {v.modelo} (${v.precio.toLocaleString()} USD)
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group">
                        <label className="form-label">Vendedor Asignado</label>
                        <select 
                          className="form-select"
                          value={saleForm.vendedor}
                          onChange={(e) => setSaleForm({ ...saleForm, vendedor: e.target.value })}
                        >
                          <option value="Martín Silva">Martín Silva</option>
                          <option value="Sofía Rossi">Sofía Rossi</option>
                          <option value="Carlos Giménez">Carlos Giménez</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Esquema de Pago</label>
                        <select 
                          className="form-select"
                          value={saleForm.metodoPago}
                          onChange={(e) => setSaleForm({ ...saleForm, metodoPago: e.target.value })}
                        >
                          <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                          <option value="Toma Usado en Parte de Pago">Toma Usado en Parte de Pago</option>
                          <option value="Crédito Prendario Bancario">Crédito Prendario Bancario</option>
                          <option value="Pago Mixto (Efectivo/Usado)">Pago Mixto (Efectivo/Usado)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Observaciones y Notas de la Operación</label>
                      <textarea 
                        rows="3"
                        placeholder="Detalles sobre entrega física, trámites fiscales o bonificaciones..."
                        value={saleForm.observaciones}
                        onChange={(e) => setSaleForm({ ...saleForm, observaciones: e.target.value })}
                        className="form-input"
                        style={{ resize: 'none' }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '8px' }}>
                      Confirmar Operación Comercial
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================
                TAB: REPORTES
                ========================================== */}
            {activeTab === 'reportes' && (
              <div>
                <div className="page-header">
                  <h1 className="page-title">Reportes de Eficiencia & Rendimiento</h1>
                  <p className="page-subtitle">Indicadores macro del volumen neto comercial facturado y conversión de asesores.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }} className="grid-charts-wrapper">
                  <div className="card">
                    <div className="section-header">
                      <div className="section-title">
                        <Award style={{ color: 'var(--blue)' }} />
                        <span>Desempeño y volumen facturado por asesor</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                      {[
                        { nombre: 'Sofía Rossi', facturado: 135000, cant: 4, color: 'var(--violet)' },
                        { nombre: 'Carlos Giménez', facturado: 78000, cant: 2, color: 'var(--cyan)' },
                        { nombre: 'Martín Silva (Tú)', facturado: totalFacturado, cant: vehVend, color: 'var(--blue)' }
                      ].map((v, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                            <span style={{ fontWeight: 600 }}>{v.nombre}</span>
                            <span style={{ fontWeight: 700, color: v.color }}>${v.facturado.toLocaleString()} USD ({v.cant} u.)</span>
                          </div>
                          <div className="progress-bar-wrap">
                            <div className="progress-bar-fill" style={{ width: `${Math.min(100, (v.facturado / 250000) * 100)}%`, backgroundColor: v.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <div className="section-title" style={{ alignSelf: 'flex-start' }}>Conversión Total</div>
                    <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--violet)', margin: '16px 0' }}>{conversCommercial}%</div>
                    <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: '1.4' }}>
                      Porcentaje de efectividad comercial. Representa la proporción de clientes cerrados sobre el total de prospectos del CRM.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                TAB: CONFIGURACIÓN
                ========================================== */}
            {activeTab === 'configuracion' && (
              <div style={{ maxWidth: '580px', margin: '0 auto' }}>
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                  <h1 className="page-title">Configuración del Sistema</h1>
                  <p className="page-subtitle">Ajuste de variables globales y mantenimiento general de la base de datos local.</p>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    Reglas operativas del salón
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Porcentaje de Seña Sugerido</label>
                    <input type="text" className="form-input" value="5% del valor de lista de la unidad" disabled />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Moneda Operativa de Transacciones</label>
                    <input type="text" className="form-input" value="USD - Dólares Estadounidenses" disabled />
                  </div>

                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-raised)', borderRadius: 'var(--r-md)', marginTop: '12px', border: '1px solid var(--border)' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rose)', marginBottom: '4px' }}>Restablecer Base de Datos de Fábrica</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '14px', lineHeight: 1.4 }}>
                      Esto eliminará todos los cambios guardados localmente de vehículos, clientes e historial de actividades, cargando las 25 unidades y 20 clientes iniciales.
                    </p>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{ color: 'var(--rose)', border: '1px solid var(--status-err-border)' }}
                      onClick={() => {
                        if (window.confirm('¿Seguro que desea resetear toda la demostración?')) {
                          localStorage.clear();
                          window.location.reload();
                        }
                      }}
                    >
                      Restaurar Demo de Fábrica
                    </button>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
