import { Pressable, Text } from 'react-native';

type Props = { texto: string; activo: boolean; onPress: () => void };

export function Chip({ texto, activo, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: activo }}
      accessibilityLabel={texto}
      className={`min-h-11 items-center justify-center rounded-pastilla border px-4 py-2.5 active:scale-95 ${
        activo
          ? 'border-accion bg-accion active:bg-accion-alto'
          : 'border-borde bg-superficie shadow-relieve active:bg-crema-100 dark:border-bosque-700 dark:bg-bosque-800 dark:shadow-relieve-oscuro dark:active:bg-bosque-700'
      }`}
    >
      <Text
        className={`font-cuerpo-semi text-sm ${
          activo ? 'text-texto-invertido' : 'text-texto-suave dark:text-salvia-300'
        }`}
      >
        {texto}
      </Text>
    </Pressable>
  );
}
