import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Animacion } from '../../../components/Animacion';
import { Boton } from '../../../components/Boton';
import { ExitoOverlay } from '../../../components/ExitoOverlay';
import { FormularioExperiencia } from '../../../components/FormularioExperiencia';
import { Pantalla } from '../../../components/Pantalla';
import { mensajeError } from '../../../lib/errores';
import { actualizarExperiencia, obtenerExperiencia, type Experiencia } from '../../../services/experiencias';

export default function EditarExperiencia() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [experiencia, setExperiencia] = useState<Experiencia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    obtenerExperiencia(id)
      .then(setExperiencia)
      .catch((e) => setError(mensajeError(e)));
  }, [id]);

  if (error) {
    return (
      <Pantalla conEncabezado>
        <View className="flex-1 items-center justify-center">
          <Animacion nombre="alerta" size={130} />
          <Text className="mb-6 mt-3 text-center text-base text-red-600 dark:text-red-400">{error}</Text>
          <Boton texto="Volver" variante="secundario" onPress={() => router.back()} />
        </View>
      </Pantalla>
    );
  }

  if (!experiencia) {
    return (
      <View className="flex-1 items-center justify-center bg-zend-50 dark:bg-noche">
        <Animacion nombre="respirar" size={150} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Pantalla conEncabezado>
        <FormularioExperiencia
          inicial={experiencia}
          textoBoton="Guardar cambios"
          onEnviar={async (datos) => {
            await actualizarExperiencia(experiencia.id, datos);
            setListo(true);
          }}
        />
      </Pantalla>
      {listo ? <ExitoOverlay mensaje="¡Cambios guardados!" onFin={() => router.back()} /> : null}
    </View>
  );
}
