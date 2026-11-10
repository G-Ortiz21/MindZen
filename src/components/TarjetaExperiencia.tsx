import { Pressable, Text, View } from 'react-native';
import { COLOR_GRUPO, GRUPOS } from '../lib/constantes';
import type { Experiencia } from '../services/experiencias';

type Props = {
  item: Experiencia;
  esMia: boolean;
  onEditar: () => void;
  onEliminar: () => void;
};

function fechaRelativa(iso: string) {
  const fecha = new Date(iso);
  const min = Math.floor((Date.now() - fecha.getTime()) / 60000);
  if (min < 1) return 'ahora';
  if (min < 60) return `hace ${min} min`;
  const horas = Math.floor(min / 60);
  if (horas < 24) return horas === 1 ? 'hace 1 h' : `hace ${horas} h`;
  const dias = Math.floor(horas / 24);
  if (dias < 7) return dias === 1 ? 'ayer' : `hace ${dias} días`;
  return fecha.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' });
}

// Grupos "contemplativos" → tarjeta con subrayado de acento;
// el resto → tarjeta con marca de agua del emoji del grupo (composición distinta)
const CONTENPLATIVOS: readonly string[] = ['Ansiedad', 'Sueño', 'Gratitud'];

export function TarjetaExperiencia({ item, esMia, onEditar, onEliminar }: Props) {
  const color = COLOR_GRUPO[item.grupo];
  const emojiGrupo = GRUPOS.find((g) => g.nombre === item.grupo)?.emoji ?? '';
  const contemplativo = CONTENPLATIVOS.includes(item.grupo);

  return (
    <View className="mb-4 overflow-hidden rounded-tarjeta border border-borde bg-superficie shadow-tarjeta dark:border-bosque-700 dark:bg-bosque-800">
      {/* cinta de color del grupo */}
      <View className={`h-1.5 w-full ${color.acento}`} />

      <View className="p-5">
        <View className="mb-3 flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-lavanda-100 dark:bg-lavanda-600/30">
            <Text className="font-cuerpo-bold text-base text-lavanda-600 dark:text-lavanda-200">
              {item.autor_nombre.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-cuerpo-bold text-sm text-texto">
              {item.autor_nombre}
              {esMia ? ' (tú)' : ''}
            </Text>
            <Text className="font-cuerpo text-xs text-texto-suave">{fechaRelativa(item.created_at)}</Text>
          </View>
          {item.estado_animo ? (
            <View className="h-9 w-9 items-center justify-center rounded-full bg-crema-100 dark:bg-bosque-700">
              <Text className="text-lg">{item.estado_animo}</Text>
            </View>
          ) : null}
        </View>

        <View className={`mb-3 self-start rounded-pastilla px-3 py-1 ${color.fondo}`}>
          <Text className={`font-cuerpo-semi text-xs ${color.texto}`}>
            {emojiGrupo} {item.grupo}
          </Text>
        </View>

        <View className="flex-row items-end justify-between gap-3">
          <Text className="flex-1 font-titular text-xl text-texto" numberOfLines={2}>
            {item.titulo}
          </Text>
          {!contemplativo ? <Text className="text-3xl opacity-70">{emojiGrupo}</Text> : null}
        </View>

        {contemplativo ? <View className={`mt-1 mb-2 h-1 w-12 rounded-full ${color.acento}`} /> : null}

        <Text className="mb-1 font-cuerpo text-base leading-6 text-texto-suave" numberOfLines={5}>
          {item.contenido}
        </Text>

        {esMia ? (
          <View className="mt-4 flex-row gap-3">
            <Pressable
              onPress={onEditar}
              accessibilityRole="button"
              accessibilityLabel={`Editar ${item.titulo}`}
              className="min-h-11 flex-1 items-center justify-center rounded-pastilla border border-borde bg-crema-100 py-2.5 active:scale-95 active:bg-crema-200 dark:border-bosque-700 dark:bg-bosque-700 dark:active:bg-bosque-600"
            >
              <Text className="font-cuerpo-semi text-sm text-accion dark:text-salvia-300">Editar</Text>
            </Pressable>
            <Pressable
              onPress={onEliminar}
              accessibilityRole="button"
              accessibilityLabel={`Eliminar ${item.titulo}`}
              className="min-h-11 flex-1 items-center justify-center rounded-pastilla bg-alerta-50 py-2.5 active:scale-95 active:bg-alerta-200 dark:bg-alerta-900 dark:active:bg-alerta-700"
            >
              <Text className="font-cuerpo-semi text-sm text-alerta-700 dark:text-alerta-300">Eliminar</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}
