import { Pressable, Text, View } from 'react-native';
import { COLOR_GRUPO } from '../lib/constantes';
import type { Experiencia } from '../services/experiencias';

type Props = {
  item: Experiencia;
  esMia: boolean;
  onEditar: () => void;
  onEliminar: () => void;
};

function fechaCorta(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function TarjetaExperiencia({ item, esMia, onEditar, onEliminar }: Props) {
  const color = COLOR_GRUPO[item.grupo];
  return (
    <View className="mb-4 rounded-3xl bg-white p-5 shadow-sm dark:bg-noche-card">
      <View className="mb-3 flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-lavanda-100 dark:bg-lavanda-600/30">
          <Text className="text-base font-bold text-lavanda-600 dark:text-lavanda-100">
            {item.autor_nombre.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-tinta dark:text-zend-50">
            {item.autor_nombre}
            {esMia ? ' (tú)' : ''}
          </Text>
          <Text className="text-xs text-zend-600 dark:text-zend-400">{fechaCorta(item.created_at)}</Text>
        </View>
        {item.estado_animo ? <Text className="text-2xl">{item.estado_animo}</Text> : null}
      </View>

      <View className={`mb-2 self-start rounded-full px-3 py-1 ${color.fondo}`}>
        <Text className={`text-xs font-semibold ${color.texto}`}>{item.grupo}</Text>
      </View>

      <Text className="mb-1 text-lg font-bold text-tinta dark:text-zend-50">{item.titulo}</Text>
      <Text className="text-base leading-6 text-tinta/80 dark:text-zend-100/80" numberOfLines={5}>
        {item.contenido}
      </Text>

      {esMia ? (
        <View className="mt-4 flex-row gap-3">
          <Pressable
            onPress={onEditar}
            className="flex-1 items-center rounded-xl bg-zend-100 py-2.5 active:bg-zend-200 dark:bg-zend-700/30"
          >
            <Text className="text-sm font-semibold text-zend-700 dark:text-zend-200">Editar</Text>
          </Pressable>
          <Pressable
            onPress={onEliminar}
            className="flex-1 items-center rounded-xl bg-red-50 py-2.5 active:bg-red-100 dark:bg-red-950"
          >
            <Text className="text-sm font-semibold text-red-700 dark:text-red-300">Eliminar</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
