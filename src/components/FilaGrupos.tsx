import { Pressable, ScrollView, Text, View } from 'react-native';
import { GRUPOS, type Grupo } from '../lib/constantes';
import { IlustracionGrupo } from './ilustraciones';

type Props = {
  grupoActual: Grupo | null;
  onSeleccionar: (grupo: Grupo | null) => void;
};

const OPCIONES: { nombre: Grupo | null; emoji: string }[] = [
  { nombre: null, emoji: '🌿' },
  ...GRUPOS,
];

/** Fila horizontal de tarjetas ilustradas que filtran el muro. */
export function FilaGrupos({ grupoActual, onSeleccionar }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 pr-4"
      className="mb-4"
    >
      {OPCIONES.map((op) => {
        const activo = grupoActual === op.nombre;
        const etiqueta = op.nombre ?? 'Todas';
        return (
          <Pressable
            key={etiqueta}
            onPress={() => onSeleccionar(grupoActual === op.nombre ? null : op.nombre)}
            accessibilityRole="button"
            accessibilityState={{ selected: activo }}
            accessibilityLabel={`Filtrar por ${etiqueta}`}
            className={`w-24 min-h-11 items-center rounded-tarjeta border px-3 py-3 active:scale-95 ${
              activo
                ? 'border-accion bg-crema-100 dark:bg-bosque-700'
                : 'border-borde bg-superficie shadow-tarjeta dark:border-bosque-700 dark:bg-bosque-800'
            }`}
          >
            <View className="h-10 w-10 items-center justify-center">
              <IlustracionGrupo nombre={op.nombre} size={36} />
            </View>
            <Text
              numberOfLines={1}
              className={`mt-1.5 font-cuerpo-semi text-xs ${
                activo ? 'text-accion dark:text-salvia-300' : 'text-texto-suave dark:text-salvia-300'
              }`}
            >
              {op.emoji} {etiqueta}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
