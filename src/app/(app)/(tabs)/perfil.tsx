import { useState } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
import { Animacion } from '../../../components/Animacion';
import { Boton } from '../../../components/Boton';
import { Campo } from '../../../components/Campo';
import { ExitoOverlay } from '../../../components/ExitoOverlay';
import { FondoOrganico } from '../../../components/FondoOrganico';
import { Pantalla } from '../../../components/Pantalla';
import { Vidrio } from '../../../components/Vidrio';
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
      if (window.confirm('Cerrar sesión\n\n¿Quieres salir de tu cuenta?')) ejecutar();
      return;
    }
    Alert.alert('Cerrar sesión', '¿Quieres salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: ejecutar },
    ]);
  };

  return (
    <View className="flex-1">
      <Pantalla fondo={<FondoOrganico />}>
        <View className="items-center">
          {/* animación DEFINITIVA: ondas concéntricas de perfil */}
          <Animacion nombre="conexion" size={130} />
          <View className="-mt-2 h-20 w-20 items-center justify-center rounded-full border-2 border-vidrio-borde bg-lavanda-100 dark:bg-lavanda-600/30">
            <Text className="font-titular text-3xl text-lavanda-600 dark:text-lavanda-200">
              {nombre.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="mt-3 font-titular text-2xl text-accion dark:text-salvia-300">{nombre}</Text>
          <Text className="mb-8 font-cuerpo text-base text-texto-suave dark:text-salvia-300">
            {user?.email}
          </Text>
        </View>

        {esCorreo ? (
          <Vidrio intensidad={20} className="mb-6 rounded-tarjeta p-5">
            <Text className="mb-4 font-titular text-lg text-texto">Cambiar contraseña</Text>
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
          </Vidrio>
        ) : (
          <Vidrio intensidad={20} className="mb-6 rounded-tarjeta p-5">
            <Text className="font-cuerpo text-base text-texto-suave dark:text-salvia-300">
              Iniciaste sesión con Google, así que tu contraseña se administra desde tu cuenta de Google.
            </Text>
          </Vidrio>
        )}

        <Boton texto="Cerrar sesión" variante="peligro" onPress={salir} />
      </Pantalla>
      {listo ? (
        <ExitoOverlay mensaje="¡Contraseña actualizada!" animacion="escudo" onFin={() => setListo(false)} />
      ) : null}
    </View>
  );
}
