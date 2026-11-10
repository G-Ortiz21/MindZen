import { Text, View } from 'react-native';
import { Animacion, type NombreAnimacion } from './Animacion';

type Props = { mensaje: string; onFin: () => void; animacion?: NombreAnimacion };

/** Capa a pantalla completa con la animación de éxito; llama onFin al terminar. */
export function ExitoOverlay({ mensaje, onFin, animacion = 'exito' }: Props) {
  return (
    <View className="absolute inset-0 items-center justify-center bg-crema-50/95 dark:bg-bosque-900/95">
      <Animacion nombre={animacion} size={170} loop={false} onFin={onFin} />
      <Text className="mt-2 px-6 text-center font-titular text-xl text-accion">{mensaje}</Text>
    </View>
  );
}
