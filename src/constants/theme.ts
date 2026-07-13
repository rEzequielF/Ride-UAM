/* Estilos */

export const COLORS = {
  primary: "#004A99",      // Azul institucional UAM
  background: '#FFFFFF',   // Blanco puro (Minimalismo)
  surface: '#F8F9FA',      // Gris muy claro para contenedores
  text: '#1A1A1A',         // Negro suave para mejor legibilidad
  textSecondary: '#6C757D',// Gris para textos secundarios
  border: '#E9ECEF',       // Bordes sutiles
  danger: '#DC3545',       // Acciones destructivas/cancelaciones
  success: '#28A745',      // Confirmación
  warning: '#FFC107',      // Pendientes o Alertas
  disabled: '#D1D5DB',     // Estados inactivo
  overlay: 'rgba(0, 0, 0, 0.4)', // Fondos de modales
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 20, // Bordes redondeados modernos
} as const;

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyBold: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
} as const; 

export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2, // Para Android
  },
} as const;

export const Z_INDEX = {
  modal: 1000,
  overlay: 900,
} as const;