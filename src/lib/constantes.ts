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
export const COLOR_GRUPO: Record<Grupo, { fondo: string; texto: string }> = {
  Ansiedad: { fondo: 'bg-sky-100 dark:bg-sky-950', texto: 'text-sky-700 dark:text-sky-300' },
  Estrés: { fondo: 'bg-rose-100 dark:bg-rose-950', texto: 'text-rose-700 dark:text-rose-300' },
  Ejercicio: { fondo: 'bg-orange-100 dark:bg-orange-950', texto: 'text-orange-700 dark:text-orange-300' },
  Sueño: { fondo: 'bg-indigo-100 dark:bg-indigo-950', texto: 'text-indigo-700 dark:text-indigo-300' },
  Motivación: { fondo: 'bg-amber-100 dark:bg-amber-950', texto: 'text-amber-700 dark:text-amber-300' },
  Gratitud: { fondo: 'bg-emerald-100 dark:bg-emerald-950', texto: 'text-emerald-700 dark:text-emerald-300' },
};
