import { Text, View } from 'react-native';
import { Manos } from './ilustraciones/Manos';
import { Vidrio } from './Vidrio';

/** Aviso en panel de vidrio: comunidad de apoyo, no reemplaza ayuda profesional. */
export function AvisoComunidad() {
  return (
    <Vidrio intensidad={20} className="mb-4 rounded-tarjeta p-4">
      <View className="flex-row items-center gap-3">
        <Manos size={40} />
        <Text className="flex-1 font-cuerpo text-xs leading-5 text-texto-suave dark:text-salvia-300">
          MindZend es una comunidad de apoyo entre personas. No reemplaza la ayuda de un profesional de la
          salud.
        </Text>
      </View>
    </Vidrio>
  );
}
