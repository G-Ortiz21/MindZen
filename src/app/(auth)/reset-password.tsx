import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Animacion } from '../../components/Animacion';
import { Boton } from '../../components/Boton';
import { Campo } from '../../components/Campo';
import { Pantalla } from '../../components/Pantalla';
import { useSession } from '../../contexts/SessionContext';
import { mensajeError } from '../../lib/errores';
import { actualizarClave } from '../../services/auth';

export default function ResetPassword() {
  const router = useRouter();
  const { session, recuperando, terminarRecuperacion } = useSession();
  const [clave, setClave] = useState('');
  const [clave2, setClave2] = useState('');
  const [errores, setErrores] = useState<{ clave?: string; clave2?: string }>({});
  const [cargando, setCargando] = useState(false);

  // Sin enlace de recuperación activo = enlace inválido o vencido
  if (!recuperando) {
    return (
      <Pantalla>
        <View className="flex-1 items-center justify-center">
          <Animacion nombre="alerta" size={140} />
          <Text className="mt-4 text-center text-2xl font-bold text-zend-700 dark:text-zend-200">
            Enlace no válido
          </Text>
          <Text className="mb-8 mt-2 text-center text-base text-tinta/70 dark:text-zend-100/70">
            El enlace venció o ya se usó. Solicita uno nuevo.
          </Text>
          <View className="w-full">
            <Boton texto="Solicitar otro enlace" onPress={() => router.replace('/olvide-clave')} />
          </View>
        </View>
      </Pantalla>
    );
  }

  // El enlace se está validando
  if (!session) {
    return (
      <Pantalla>
        <View className="flex-1 items-center justify-center">
          <Animacion nombre="respirar" size={180} />
          <Text className="text-base text-tinta/70 dark:text-zend-100/70">Validando enlace…</Text>
        </View>
      </Pantalla>
    );
  }

  const guardar = async () => {
    const e: typeof errores = {};
    if (clave.length < 6) e.clave = 'La contraseña tiene al menos 6 caracteres.';
    if (clave2 !== clave) e.clave2 = 'Las contraseñas no coinciden.';
    setErrores(e);
    if (Object.keys(e).length) return;

    setCargando(true);
    try {
      await actualizarClave(clave);
      Alert.alert('Contraseña actualizada', 'Ya puedes usar tu nueva contraseña.');
      terminarRecuperacion(); // el guard te lleva a la app
    } catch (err) {
      Alert.alert('No pudimos cambiar la contraseña', mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <Pantalla>
      <View className="flex-1 justify-center">
        <View className="items-center">
          <Animacion nombre="conexion" size={150} />
          <Text className="text-center text-3xl font-bold text-zend-700 dark:text-zend-200">
            Nueva contraseña
          </Text>
          <Text className="mb-8 mt-2 text-center text-base text-tinta/70 dark:text-zend-100/70">
            Elige una contraseña que recuerdes.
          </Text>
        </View>
        <Campo
          etiqueta="Nueva contraseña"
          value={clave}
          onChangeText={setClave}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          error={errores.clave}
        />
        <Campo
          etiqueta="Confirmar contraseña"
          value={clave2}
          onChangeText={setClave2}
          placeholder="Repite la contraseña"
          secureTextEntry
          error={errores.clave2}
        />
        <Boton texto="Guardar contraseña" onPress={guardar} cargando={cargando} />
      </View>
    </Pantalla>
  );
}
