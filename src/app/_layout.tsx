import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import '../global.css';
import { Animacion } from '../components/Animacion';
import { SessionProvider, useSession } from '../contexts/SessionContext';

function Navegacion() {
  const { session, cargando, recuperando } = useSession();

  if (cargando) {
    return (
      <View className="flex-1 items-center justify-center bg-zend-50 dark:bg-noche">
        <Animacion nombre="respirar" size={200} />
        <Text className="mt-2 text-lg font-semibold text-zend-700 dark:text-zend-200">MindZend</Text>
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
