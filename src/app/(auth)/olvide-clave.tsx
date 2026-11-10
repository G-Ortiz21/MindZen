import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Animacion } from '../../components/Animacion';
import { Boton } from '../../components/Boton';
import { Campo } from '../../components/Campo';
import { FondoOrganico } from '../../components/FondoOrganico';
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
    <Pantalla fondo={<FondoOrganico />}>
      <View className="flex-1 justify-center">
        <View className="items-center">
          {/* respirar es DEFINITIVA (pantalla "Recupera tu contraseña") */}
          <Animacion nombre={enviado ? 'correo' : 'respirar'} size={enviado ? 150 : 170} loop={!enviado} />
          <Text className="mt-2 text-center font-titular text-3xl text-accion dark:text-salvia-300">
            {enviado ? 'Revisa tu correo' : 'Recupera tu contraseña'}
          </Text>
          <Text className="mb-8 mt-2 text-center font-cuerpo text-base text-texto-suave dark:text-salvia-300">
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

        <Pressable
          onPress={() => router.replace('/login')}
          accessibilityRole="link"
          accessibilityLabel="Volver a iniciar sesión"
          className="mt-6 min-h-11 items-center justify-center"
        >
          <Text className="font-cuerpo-bold text-base text-accion dark:text-salvia-300">
            Volver a iniciar sesión
          </Text>
        </Pressable>
      </View>
    </Pantalla>
  );
}
