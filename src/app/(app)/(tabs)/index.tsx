import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animacion } from '../../../components/Animacion';
import { Boton } from '../../../components/Boton';
import { Chip } from '../../../components/Chip';
import { TarjetaExperiencia } from '../../../components/TarjetaExperiencia';
import { useSession } from '../../../contexts/SessionContext';
import { GRUPOS, type Grupo } from '../../../lib/constantes';
import { mensajeError, nombreDeUsuario } from '../../../lib/errores';
import { eliminarExperiencia, listarExperiencias, type Experiencia } from '../../../services/experiencias';

export default function Comunidad() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useSession();

  const [items, setItems] = useState<Experiencia[]>([]);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const primeraCarga = useRef(true);

  const cargar = useCallback(
    async (esRefresco = false) => {
      if (esRefresco) setRefrescando(true);
      try {
        setItems(await listarExperiencias(grupo));
        setError(null);
      } catch (e) {
        setError(mensajeError(e));
      } finally {
        primeraCarga.current = false;
        setCargando(false);
        setRefrescando(false);
      }
    },
    [grupo]
  );

  // Recarga al entrar a la pantalla y al cambiar el filtro
  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  const confirmarEliminar = (item: Experiencia) => {
    Alert.alert('Eliminar experiencia', `¿Quieres eliminar "${item.titulo}"? Esta acción no se puede deshacer.`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await eliminarExperiencia(item.id);
            setItems((previas) => previas.filter((x) => x.id !== item.id));
          } catch (e) {
            Alert.alert('No se pudo eliminar', mensajeError(e));
          }
        },
      },
    ]);
  };

  const encabezado = (
    <View className="mb-4">
      <Text className="text-3xl font-bold text-zend-700 dark:text-zend-200">
        Hola, {nombreDeUsuario(user).split(' ')[0]} 👋
      </Text>
      <Text className="mt-1 text-base text-tinta/70 dark:text-zend-100/70">
        Lee, comparte y acompaña a otras personas de la comunidad.
      </Text>

      <View className="mb-4 mt-4 rounded-2xl bg-lavanda-100 px-4 py-3 dark:bg-lavanda-600/20">
        <Text className="text-xs leading-5 text-lavanda-600 dark:text-lavanda-100">
          MindZend es una comunidad de apoyo entre personas. No reemplaza la ayuda de un profesional de la salud.
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        <Chip texto="Todas" activo={grupo === null} onPress={() => setGrupo(null)} />
        {GRUPOS.map((g) => (
          <Chip
            key={g.nombre}
            texto={`${g.emoji} ${g.nombre}`}
            activo={grupo === g.nombre}
            onPress={() => setGrupo(grupo === g.nombre ? null : g.nombre)}
          />
        ))}
      </ScrollView>
    </View>
  );

  if (cargando && primeraCarga.current) {
    return (
      <View className="flex-1 items-center justify-center bg-zend-50 dark:bg-noche">
        <Animacion nombre="respirar" size={180} />
        <Text className="text-base text-tinta/70 dark:text-zend-100/70">Cargando la comunidad…</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-zend-50 dark:bg-noche">
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        refreshing={refrescando}
        onRefresh={() => cargar(true)}
        ListHeaderComponent={encabezado}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TarjetaExperiencia
            item={item}
            esMia={item.user_id === user?.id}
            onEditar={() => router.push({ pathname: '/editar/[id]', params: { id: item.id } })}
            onEliminar={() => confirmarEliminar(item)}
          />
        )}
        ListEmptyComponent={
          error ? (
            <View className="items-center py-10">
              <Animacion nombre="alerta" size={120} />
              <Text className="mb-4 mt-2 text-center text-base text-red-600 dark:text-red-400">{error}</Text>
              <Boton texto="Reintentar" variante="secundario" onPress={() => cargar()} />
            </View>
          ) : (
            <View className="items-center py-8">
              <Animacion nombre="flotar" size={200} />
              <Text className="text-center text-xl font-bold text-zend-700 dark:text-zend-200">
                {grupo ? `Aún no hay experiencias en ${grupo}` : 'Aún no hay experiencias'}
              </Text>
              <Text className="mb-5 mt-1 text-center text-base text-tinta/70 dark:text-zend-100/70">
                Sé la primera persona en compartir la tuya.
              </Text>
              <Boton texto="Compartir experiencia" onPress={() => router.push('/nueva')} />
            </View>
          )
        }
      />

      <Pressable
        onPress={() => router.push('/nueva')}
        className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-zend-600 shadow-lg active:bg-zend-700"
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </Pressable>
    </View>
  );
}
