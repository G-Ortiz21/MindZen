import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Animacion } from '../../components/Animacion';
import { Boton } from '../../components/Boton';
import { Campo } from '../../components/Campo';
import { FondoOrganico } from '../../components/FondoOrganico';
import { Pantalla } from '../../components/Pantalla';
import { correoValido, mensajeError } from '../../lib/errores';
import { iniciarConGoogle, iniciarSesion } from '../../services/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState<{ email?: string; clave?: string }>({});
  const [cargando, setCargando] = useState(false);
  const [cargandoGoogle, setCargandoGoogle] = useState(false);

  const entrar = async () => {
    const e: typeof errores = {};
    if (!correoValido(email)) e.email = 'Escribe un correo válido.';
    if (clave.length < 6) e.clave = 'La contraseña tiene al menos 6 caracteres.';
    setErrores(e);
    if (Object.keys(e).length) return;

    setCargando(true);
    try {
      await iniciarSesion(email, clave);
      // El guard de rutas te lleva a la app al detectar la sesión
    } catch (err) {
      Alert.alert('No pudimos iniciar sesión', mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  const conGoogle = async () => {
    setCargandoGoogle(true);
    try {
      await iniciarConGoogle();
    } catch (err) {
      Alert.alert('No pudimos entrar con Google', mensajeError(err));
    } finally {
      setCargandoGoogle(false);
    }
  };

  return (
    <Pantalla fondo={<FondoOrganico />}>
      <View className="items-center">
        {/* animación DEFINITIVA: ondas concéntricas de conexión */}
        <Animacion nombre="conexion" size={190} />
        <Text className="font-titular text-4xl text-accion dark:text-salvia-300">MindZend</Text>
        <Text className="mb-8 mt-1 text-center font-cuerpo text-base text-texto-suave dark:text-salvia-300">
          Un espacio para compartir cómo te sientes y cuidarte en compañía.
        </Text>
      </View>

      <Campo
        etiqueta="Correo"
        value={email}
        onChangeText={setEmail}
        placeholder="tucorreo@ejemplo.com"
        keyboardType="email-address"
        autoComplete="email"
        error={errores.email}
      />
      <Campo
        etiqueta="Contraseña"
        value={clave}
        onChangeText={setClave}
        placeholder="••••••••"
        secureTextEntry
        autoComplete="password"
        error={errores.clave}
      />

      <Pressable
        onPress={() => router.push('/olvide-clave')}
        accessibilityRole="link"
        accessibilityLabel="¿Olvidaste tu contraseña?"
        className="mb-5 min-h-11 items-center justify-center self-end px-1"
      >
        <Text className="font-cuerpo-semi text-sm text-accion dark:text-salvia-300">
          ¿Olvidaste tu contraseña?
        </Text>
      </Pressable>

      <Boton texto="Iniciar sesión" onPress={entrar} cargando={cargando} deshabilitado={cargandoGoogle} />

      <View className="my-5 flex-row items-center">
        <View className="h-px flex-1 bg-borde dark:bg-bosque-700" />
        <Text className="mx-3 font-cuerpo text-sm text-texto-suave dark:text-salvia-300">o</Text>
        <View className="h-px flex-1 bg-borde dark:bg-bosque-700" />
      </View>

      <Boton
        texto="Continuar con Google"
        icono="G"
        variante="google"
        onPress={conGoogle}
        cargando={cargandoGoogle}
        deshabilitado={cargando}
      />

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="font-cuerpo text-base text-texto-suave dark:text-salvia-300">
          ¿Aún no tienes cuenta?{' '}
        </Text>
        <Pressable
          onPress={() => router.push('/registro')}
          accessibilityRole="link"
          accessibilityLabel="Regístrate"
          className="min-h-11 items-center justify-center px-1"
        >
          <Text className="font-cuerpo-bold text-base text-accion dark:text-salvia-300">Regístrate</Text>
        </Pressable>
      </View>
    </Pantalla>
  );
}
