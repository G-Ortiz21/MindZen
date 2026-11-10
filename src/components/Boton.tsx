import { ActivityIndicator, Pressable, Text } from 'react-native';

type Variante = 'primario' | 'secundario' | 'google' | 'peligro';

const estilos: Record<Variante, { caja: string; texto: string; spinner: string }> = {
  primario: { caja: 'bg-zend-600 active:bg-zend-700', texto: 'text-white', spinner: '#ffffff' },
  secundario: {
    caja: 'bg-zend-100 active:bg-zend-200 dark:bg-noche-card',
    texto: 'text-zend-700 dark:text-zend-200',
    spinner: '#2c7f68',
  },
  google: {
    caja: 'bg-white border border-zend-200 active:bg-zend-50 dark:bg-noche-card dark:border-zend-700',
    texto: 'text-tinta dark:text-zend-50',
    spinner: '#2c7f68',
  },
  peligro: {
    caja: 'bg-red-50 active:bg-red-100 dark:bg-red-950',
    texto: 'text-red-700 dark:text-red-300',
    spinner: '#b91c1c',
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
      className={`h-14 flex-row items-center justify-center gap-2 rounded-2xl px-5 ${e.caja} ${bloqueado ? 'opacity-60' : ''}`}
    >
      {cargando ? (
        <ActivityIndicator color={e.spinner} />
      ) : (
        <>
          {icono ? <Text className={`text-lg font-bold ${e.texto}`}>{icono}</Text> : null}
          <Text className={`text-base font-semibold ${e.texto}`}>{texto}</Text>
        </>
      )}
    </Pressable>
  );
}
