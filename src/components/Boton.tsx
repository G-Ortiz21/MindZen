import { ActivityIndicator, Pressable, Text } from 'react-native';

type Variante = 'primario' | 'secundario' | 'google' | 'peligro';

// Strings completos por variante: Uniwind/Tailwind detectan las clases tal cual
// están escritas (nunca se concatenan fragmentos de nombres).
const estilos: Record<Variante, { caja: string; texto: string; spinner: string }> = {
  primario: {
    caja: 'bg-accion active:bg-accion-alto ios:shadow-tarjeta android:[elevation:4]',
    texto: 'text-texto-invertido',
    spinner: 'accent-crema-50 dark:accent-bosque-900',
  },
  secundario: {
    // Neumorfismo discreto: doble sombra en iOS/web, elevation + borde en Android
    caja: 'border border-borde bg-superficie shadow-relieve active:bg-crema-100 dark:border-bosque-700 dark:bg-bosque-800 dark:shadow-relieve-oscuro dark:active:bg-bosque-700 android:[elevation:2]',
    texto: 'text-accion dark:text-salvia-300',
    spinner: 'accent-accion dark:accent-salvia-300',
  },
  google: {
    caja: 'border border-borde bg-superficie active:bg-crema-100 dark:border-bosque-700 dark:bg-bosque-800 dark:active:bg-bosque-700 android:[elevation:2]',
    texto: 'text-texto',
    spinner: 'accent-accion dark:accent-salvia-300',
  },
  peligro: {
    caja: 'bg-alerta-50 active:bg-alerta-200 dark:bg-alerta-900 dark:active:bg-alerta-700',
    texto: 'text-alerta-700 dark:text-alerta-300',
    spinner: 'accent-alerta-600 dark:accent-alerta-300',
  },
};

type Props = {
  texto: string;
  onPress: () => void;
  variante?: Variante;
  cargando?: boolean;
  deshabilitado?: boolean;
  /** Ej. "G" para el botón de Google */
  icono?: string;
};

export function Boton({ texto, onPress, variante = 'primario', cargando, deshabilitado, icono }: Props) {
  const e = estilos[variante];
  const bloqueado = cargando || deshabilitado;
  return (
    <Pressable
      onPress={onPress}
      disabled={bloqueado}
      accessibilityRole="button"
      accessibilityLabel={texto}
      accessibilityState={{ disabled: !!bloqueado, busy: !!cargando }}
      className={`h-14 flex-row items-center justify-center gap-2 rounded-pastilla px-6 active:scale-[0.97] disabled:opacity-60 ${e.caja}`}
    >
      {cargando ? (
        <ActivityIndicator colorClassName={e.spinner} />
      ) : (
        <>
          {icono ? <Text className={`font-cuerpo-bold text-lg ${e.texto}`}>{icono}</Text> : null}
          <Text className={`font-cuerpo-bold text-base ${e.texto}`}>{texto}</Text>
        </>
      )}
    </Pressable>
  );
}
