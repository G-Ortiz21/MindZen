export const GRUPOS = [
  { nombre: 'Ansiedad', emoji: '🌬️' },
  { nombre: 'Estrés', emoji: '🌧️' },
  { nombre: 'Ejercicio', emoji: '🏃' },
  { nombre: 'Sueño', emoji: '🌙' },
  { nombre: 'Motivación', emoji: '🔥' },
  { nombre: 'Gratitud', emoji: '🌱' },
] as const;

export type Grupo = (typeof GRUPOS)[number]['nombre'];

export const ANIMOS = [
  { emoji: '😊', etiqueta: 'Bien' },
  { emoji: '😌', etiqueta: 'Tranquilo' },
  { emoji: '😐', etiqueta: 'Normal' },
  { emoji: '😟', etiqueta: 'Preocupado' },
  { emoji: '😢', etiqueta: 'Triste' },
] as const;

// Clases completas (Uniwind/Tailwind necesitan verlas escritas tal cual)
export const COLOR_GRUPO: Record<Grupo, { fondo: string; texto: string; acento: string }> = {
  Ansiedad: {
    fondo: 'bg-lavanda-100 dark:bg-lavanda-600/30',
    texto: 'text-lavanda-600 dark:text-lavanda-200',
    acento: 'bg-lavanda-400',
  },
  Estrés: {
    fondo: 'bg-alerta-50 dark:bg-alerta-900/70',
    texto: 'text-alerta-700 dark:text-alerta-300',
    acento: 'bg-alerta-600',
  },
  Ejercicio: {
    fondo: 'bg-salvia-100 dark:bg-salvia-500/25',
    texto: 'text-bosque-700 dark:text-salvia-200',
    acento: 'bg-salvia-500',
  },
  Sueño: {
    fondo: 'bg-bosque-800 dark:bg-bosque-900',
    texto: 'text-crema-50 dark:text-salvia-200',
    acento: 'bg-bosque-700',
  },
  Motivación: {
    fondo: 'bg-lima/40 dark:bg-lima/25',
    texto: 'text-bosque-800 dark:text-lima',
    acento: 'bg-lima',
  },
  Gratitud: {
    fondo: 'bg-durazno-200 dark:bg-durazno/25',
    texto: 'text-bosque-800 dark:text-durazno-200',
    acento: 'bg-durazno',
  },
};
