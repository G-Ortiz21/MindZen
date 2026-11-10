import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Animacion } from '../../components/Animacion';
import { Boton } from '../../components/Boton';
import { Campo } from '../../components/Campo';
import { Pantalla } from '../../components/Pantalla';
import { correoValido, mensajeError } from '../../lib/errores';
import { registrar } from '../../services/auth';

export default function Registro() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [clave2, setClave2] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [cargando, setCargando] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);

  const crearCuenta = async () => {
    const e: Record<string, string> = {};
    if (nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.';
    if (!correoValido(email)) e.email = 'Escribe un correo válido.';
    if (clave.length < 6) e.clave = 'La contraseña tiene al menos 6 caracteres.';
    if (clave2 !== clave) e.clave2 = 'Las contraseñas no coinciden.';
    setErrores(e);
    if (Object.keys(e).length) return;

    setCargando(true);
    try {
      const { requiereConfirmacion } = await registrar(nombre, email, clave);
      if (requiereConfirmacion) setCorreoEnviado(true);
      // Si no pide confirmación, la sesión se crea sola y el guard te lleva a la app
    } catch (err) {
      Alert.alert('No pudimos crear tu cuenta', mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  if (correoEnviado) {
    return (
      <Pantalla>
        <View className="flex-1 items-center justify-center">
          <Animacion nombre="exito" size={160} loop={false} />
          <Text className="mt-4 text-center text-2xl font-bold text-zend-700 dark:text-zend-200">
            ¡Cuenta creada!
          </Text>
          <Text className="mb-8 mt-2 text-center text-base text-tinta/70 dark:text-zend-100/70">
            Te enviamos un correo a {email.trim()}. Ábrelo para confirmar tu cuenta y luego inicia sesión.
          </Text>
          <View className="w-full">
            <Boton texto="Ir a iniciar sesión" onPress={() => router.replace('/login')} />
          </View>
        </View>
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <View className="mb-6 items-center">
        <Animacion nombre="flotar" size={140} />
        <Text className="text-3xl font-bold text-zend-700 dark:text-zend-200">Crea tu cuenta</Text>
        <Text className="mt-1 text-center text-base text-tinta/70 dark:text-zend-100/70">
          Únete a una comunidad que te escucha.
        </Text>
      </View>

      <Campo
        etiqueta="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholder="Cómo quieres que te vean"
        autoCapitalize="words"
        error={errores.nombre}
      />
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

      <View className="mt-2">
        <Boton texto="Crear cuenta" onPress={crearCuenta} cargando={cargando} />
      </View>

      <View className="mt-8 flex-row justify-center">
        <Text className="text-base text-tinta/70 dark:text-zend-100/70">¿Ya tienes cuenta? </Text>
        <Pressable onPress={() => router.replace('/login')}>
          <Text className="text-base font-bold text-zend-600 dark:text-zend-400">Inicia sesión</Text>
        </Pressable>
      </View>
    </Pantalla>
  );
}
