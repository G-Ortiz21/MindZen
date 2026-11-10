import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Animacion } from '../../components/Animacion';
import { Boton } from '../../components/Boton';
import { Campo } from '../../components/Campo';
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
    <Pantalla>
      <View className="items-center">
        <Animacion nombre="conexion" size={190} />
        <Text className="text-4xl font-bold text-zend-700 dark:text-zend-200">MindZend</Text>
        <Text className="mb-8 mt-1 text-center text-base text-tinta/70 dark:text-zend-100/70">
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

      <Pressable onPress={() => router.push('/olvide-clave')} className="mb-5 self-end">
        <Text className="text-sm font-semibold text-zend-600 dark:text-zend-400">¿Olvidaste tu contraseña?</Text>
      </Pressable>

      <Boton texto="Iniciar sesión" onPress={entrar} cargando={cargando} deshabilitado={cargandoGoogle} />

      <View className="my-5 flex-row items-center">
        <View className="h-px flex-1 bg-zend-200 dark:bg-zend-700" />
        <Text className="mx-3 text-sm text-tinta/60 dark:text-zend-100/60">o</Text>
        <View className="h-px flex-1 bg-zend-200 dark:bg-zend-700" />
      </View>

      <Boton
        texto="Continuar con Google"
        icono="G"
        variante="google"
        onPress={conGoogle}
        cargando={cargandoGoogle}
        deshabilitado={cargando}
      />

      <View className="mt-8 flex-row justify-center">
        <Text className="text-base text-tinta/70 dark:text-zend-100/70">¿Aún no tienes cuenta? </Text>
        <Pressable onPress={() => router.push('/registro')}>
          <Text className="text-base font-bold text-zend-600 dark:text-zend-400">Regístrate</Text>
        </Pressable>
      </View>
    </Pantalla>
  );
}
