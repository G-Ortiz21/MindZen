import { useFocusEffect, useRouter } from 'expo-router';
import { useBottomTabBarHeight } from 'expo-router/tabs';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AvisoComunidad } from '../../../components/AvisoComunidad';
import { Animacion } from '../../../components/Animacion';
import { Boton } from '../../../components/Boton';
import { BotonFlotante } from '../../../components/BotonFlotante';
import { FilaGrupos } from '../../../components/FilaGrupos';
import { TarjetaExperiencia } from '../../../components/TarjetaExperiencia';
import { Vidrio } from '../../../components/Vidrio';
import { useSession } from '../../../contexts/SessionContext';
import { avisar, confirmar } from '../../../lib/avisos';
import { reservaInferiorMuro } from '../../../lib/barraTabs';
import type { Grupo } from '../../../lib/constantes';
import { mensajeError, nombreDeUsuario } from '../../../lib/errores';
import { eliminarExperiencia, listarExperiencias, type Experiencia } from '../../../services/experiencias';

export default function Comunidad() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const alturaBarra = useBottomTabBarHeight();
  const { user } = useSession();

  const [items, setItems] = useState<Experiencia[]>([]);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [primeraCarga, setPrimeraCarga] = useState(true);

  const cargar = useCallback(
    async (esRefresco = false) => {
      if (esRefresco) setRefrescando(true);
      try {
        setItems(await listarExperiencias(grupo));
        setError(null);
      } catch (e) {
        setError(mensajeError(e));
      } finally {
        setPrimeraCarga(false);
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
    confirmar(
      'Eliminar experiencia',
      `¿Quieres eliminar "${item.titulo}"? Esta acción no se puede deshacer.`,
      async () => {
        try {
          await eliminarExperiencia(item.id);
          setItems((previas) => previas.filter((x) => x.id !== item.id));
        } catch (e) {
          avisar('No se pudo eliminar', mensajeError(e));
        }
      },
      'Eliminar'
    );
  };

  const encabezado = (
    <View>
      {/* Cabecera en panel de vidrio con animación de conexión */}
      <Vidrio intensidad={24} className="mb-4 rounded-tarjeta p-5">
        <View className="flex-row items-center gap-3">
          <View className="flex-1">
            <Text className="font-titular text-3xl text-accion dark:text-salvia-300">
              Hola, {nombreDeUsuario(user).split(' ')[0]} 👋
            </Text>
            <Text className="mt-1 font-cuerpo text-base text-texto-suave dark:text-salvia-300">
              Lee, comparte y acompaña a otras personas de la comunidad.
            </Text>
          </View>
          <Animacion nombre="conexion" size={64} velocidad={0.8} />
        </View>
      </Vidrio>

      <AvisoComunidad />

      <FilaGrupos grupoActual={grupo} onSeleccionar={setGrupo} />
    </View>
  );

  if (cargando && primeraCarga) {
    return (
      <View className="flex-1 items-center justify-center bg-fondo">
        {/* respirar es DEFINITIVA: carga del muro */}
        <Animacion nombre="respirar" size={180} />
        <Text className="font-cuerpo text-base text-texto-suave dark:text-salvia-300">
          Cargando la comunidad…
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-fondo">
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        refreshing={refrescando}
        onRefresh={() => cargar(true)}
        ListHeaderComponent={encabezado}
        contentContainerClassName="px-pantalla"
        // Excepción Uniwind: reservas dinámicas para que la barra y el botón "+" no tapen la lista
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: reservaInferiorMuro(insets.bottom, alturaBarra),
        }}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.duration(400).delay(Math.min(index, 8) * 50)}>
            <TarjetaExperiencia
              item={item}
              esMia={item.user_id === user?.id}
              onEditar={() => router.push({ pathname: '/editar/[id]', params: { id: item.id } })}
              onEliminar={() => confirmarEliminar(item)}
            />
          </Animated.View>
        )}
        ListEmptyComponent={
          error ? (
            <View className="items-center py-10">
              <Animacion nombre="alerta" size={120} />
              <Text className="mb-4 mt-2 text-center font-cuerpo text-base text-alerta-600 dark:text-alerta-300">
                {error}
              </Text>
              <Boton texto="Reintentar" variante="secundario" onPress={() => cargar()} />
            </View>
          ) : (
            <View className="items-center py-8">
              <Animacion nombre="planta" size={200} />
              <Text className="text-center font-titular text-xl text-accion dark:text-salvia-300">
                {grupo ? `Aún no hay experiencias en ${grupo}` : 'Aún no hay experiencias'}
              </Text>
              <Text className="mb-5 mt-1 text-center font-cuerpo text-base text-texto-suave dark:text-salvia-300">
                Sé la primera persona en compartir la tuya.
              </Text>
              <Boton texto="Compartir experiencia" onPress={() => router.push('/nueva')} />
            </View>
          )
        }
      />

      <BotonFlotante onPress={() => router.push('/nueva')} />
    </View>
  );
}
