import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import '../global.css';
import { Animacion } from '../components/Animacion';
import { SessionProvider, useSession } from '../contexts/SessionContext';

// La splash nativa se queda visible hasta cargar fuentes y sesión (sin parpadeo)
SplashScreen.preventAutoHideAsync().catch(() => {});

function Navegacion() {
  const [fuentesListas, errorFuentes] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const { session, cargando, recuperando } = useSession();

  // Si una fuente falla, igual continuamos con la tipografía del sistema
  const listo = (fuentesListas || !!errorFuentes) && !cargando;

  useEffect(() => {
    if (listo) SplashScreen.hideAsync().catch(() => {});
  }, [listo]);

  if (!listo) {
    return (
      <View className="flex-1 items-center justify-center bg-fondo">
        <Animacion nombre="respirar" size={200} />
        <Text className="mt-2 font-titular text-lg text-accion">MindZend</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Con sesión (y sin estar recuperando contraseña) -> app */}
        <Stack.Protected guard={!!session && !recuperando}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        {/* Sin sesión, o recuperando contraseña -> login y compañía */}
        <Stack.Protected guard={!session || recuperando}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Screen name="auth-callback" />
      </Stack>
    </>
  );
}

export default function RaizLayout() {
  return (
    <SessionProvider>
      <Navegacion />
    </SessionProvider>
  );
}
