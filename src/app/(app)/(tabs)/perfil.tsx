import { useState } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
import { Animacion } from '../../../components/Animacion';
import { Boton } from '../../../components/Boton';
import { Campo } from '../../../components/Campo';
import { ExitoOverlay } from '../../../components/ExitoOverlay';
import { Pantalla } from '../../../components/Pantalla';
import { useSession } from '../../../contexts/SessionContext';
import { mensajeError, nombreDeUsuario } from '../../../lib/errores';
import { actualizarClave, cerrarSesion } from '../../../services/auth';

export default function Perfil() {
  const { user } = useSession();
  const nombre = nombreDeUsuario(user);
  // Quien entra con Google no tiene contraseña que cambiar
  const esCorreo = user?.app_metadata?.provider === 'email';

  const [clave, setClave] = useState('');
  const [clave2, setClave2] = useState('');
  const [errores, setErrores] = useState<{ clave?: string; clave2?: string }>({});
  const [cargando, setCargando] = useState(false);
  const [listo, setListo] = useState(false);

  const cambiarClave = async () => {
    const e: typeof errores = {};
    if (clave.length < 6) e.clave = 'La contraseña tiene al menos 6 caracteres.';
    if (clave2 !== clave) e.clave2 = 'Las contraseñas no coinciden.';
    setErrores(e);
    if (Object.keys(e).length) return;

    setCargando(true);
    try {
      await actualizarClave(clave);
      setClave('');
      setClave2('');
      setListo(true);
    } catch (err) {
      Alert.alert('No pudimos cambiar la contraseña', mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  const salir = () => {
    const ejecutar = () =>
      cerrarSesion().catch((e) => {
        // Alert.alert es un no-op en react-native-web
        if (Platform.OS === 'web') window.alert(`Error: ${mensajeError(e)}`);
        else Alert.alert('Error', mensajeError(e));
      });

    // En web Alert.alert no está implementado (no hace nada): usamos window.confirm
    if (Platform.OS === 'web') {
      if (window.confirm('Cerrar sesión\n¿Quieres salir de tu cuenta?')) ejecutar();
      return;
    }
    Alert.alert('Cerrar sesión', '¿Quieres salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: ejecutar },
    ]);
  };

  return (
    <View className="flex-1">
      <Pantalla>
        <View className="items-center">
          <Animacion nombre="conexion" size={130} />
          <View className="-mt-2 h-20 w-20 items-center justify-center rounded-full bg-lavanda-100 dark:bg-lavanda-600/30">
            <Text className="text-3xl font-bold text-lavanda-600 dark:text-lavanda-100">
              {nombre.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="mt-3 text-2xl font-bold text-zend-700 dark:text-zend-200">{nombre}</Text>
          <Text className="mb-8 text-base text-tinta/70 dark:text-zend-100/70">{user?.email}</Text>
        </View>

        {esCorreo ? (
          <View className="mb-6 rounded-3xl bg-white p-5 dark:bg-noche-card">
            <Text className="mb-4 text-lg font-bold text-tinta dark:text-zend-50">Cambiar contraseña</Text>
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
            <Boton texto="Actualizar contraseña" onPress={cambiarClave} cargando={cargando} />
          </View>
        ) : (
          <View className="mb-6 rounded-3xl bg-white p-5 dark:bg-noche-card">
            <Text className="text-base text-tinta/80 dark:text-zend-100/80">
              Iniciaste sesión con Google, así que tu contraseña se administra desde tu cuenta de Google.
            </Text>
          </View>
        )}

        <Boton texto="Cerrar sesión" variante="peligro" onPress={salir} />
      </Pantalla>
      {listo ? <ExitoOverlay mensaje="¡Contraseña actualizada!" onFin={() => setListo(false)} /> : null}
    </View>
  );
}
