import { Stack } from 'expo-router';
import { useCSSVariable } from 'uniwind';

export default function AppLayout() {
  // Excepción Uniwind: react-navigation recibe colores por props (no aceptan
  // className), se resuelven con el hook oficial useCSSVariable (array = una sola suscripción).
  const [fondo, texto] = useCSSVariable(['--color-fondo', '--color-texto']) as [string, string];

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: fondo },
        headerTintColor: texto,
        // Excepción Uniwind: estilos de cabecera nativa por API de react-navigation
        headerTitleStyle: { fontFamily: 'Nunito_700Bold' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: fondo },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="nueva"
        options={{ title: 'Nueva experiencia', presentation: 'modal', animation: 'fade' }}
      />
      <Stack.Screen
        name="editar/[id]"
        options={{ title: 'Editar experiencia', presentation: 'modal', animation: 'fade' }}
      />
    </Stack>
  );
}
