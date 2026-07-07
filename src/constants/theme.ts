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
  fontSize: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
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