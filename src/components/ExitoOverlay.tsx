import { Text, View } from 'react-native';
import { Animacion } from './Animacion';

type Props = { mensaje: string; onFin: () => void };

/** Capa a pantalla completa con la animación de éxito; llama onFin al terminar. */
export function ExitoOverlay({ mensaje, onFin }: Props) {
  return (
    <View className="absolute inset-0 items-center justify-center bg-zend-50/95 dark:bg-noche/95">
      <Animacion nombre="exito" size={170} loop={false} onFin={onFin} />
      <Text className="mt-2 text-xl font-bold text-zend-700 dark:text-zend-200">{mensaje}</Text>
    </View>
  );
}
