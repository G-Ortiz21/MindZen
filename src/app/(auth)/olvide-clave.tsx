import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Animacion } from '../../components/Animacion';
import { Boton } from '../../components/Boton';
import { Campo } from '../../components/Campo';
import { Pantalla } from '../../components/Pantalla';
import { correoValido, mensajeError } from '../../lib/errores';
import { recuperarClave } from '../../services/auth';

export default function OlvideClave() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const enviar = async () => {
    if (!correoValido(email)) return setError('Escribe un correo válido.');
    setError(undefined);
    setCargando(true);
    try {
      await recuperarClave(email);
      setEnviado(true);
    } catch (err) {
      Alert.alert('No pudimos enviar el correo', mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <Pantalla>
      <View className="flex-1 justify-center">
        <View className="items-center">
          <Animacion nombre={enviado ? 'exito' : 'respirar'} size={enviado ? 150 : 170} loop={!enviado} />
          <Text className="mt-2 text-center text-3xl font-bold text-zend-700 dark:text-zend-200">
            {enviado ? 'Revisa tu correo' : 'Recupera tu contraseña'}
          </Text>
          <Text className="mb-8 mt-2 text-center text-base text-tinta/70 dark:text-zend-100/70">
            {enviado
              ? `Te enviamos un enlace a ${email.trim()}. Ábrelo desde este teléfono para elegir una nueva contraseña.`
              : 'Escribe tu correo y te enviaremos un enlace para crear una nueva.'}
          </Text>
        </View>

        {!enviado ? (
          <>
            <Campo
              etiqueta="Correo"
              value={email}
              onChangeText={setEmail}
              placeholder="tucorreo@ejemplo.com"
              keyboardType="email-address"
              autoComplete="email"
              error={error}
            />
            <Boton texto="Enviar enlace" onPress={enviar} cargando={cargando} />
          </>
        ) : null}

        <Pressable onPress={() => router.replace('/login')} className="mt-6 items-center">
          <Text className="text-base font-bold text-zend-600 dark:text-zend-400">Volver a iniciar sesión</Text>
        </Pressable>
      </View>
    </Pantalla>
  );
}
