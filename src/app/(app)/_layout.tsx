import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const oscuro = useColorScheme() === 'dark';
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: oscuro ? '#0f1a17' : '#f1f8f5' },
        headerTintColor: oscuro ? '#dcefe7' : '#236654',
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="nueva" options={{ title: 'Nueva experiencia', presentation: 'modal' }} />
      <Stack.Screen name="editar/[id]" options={{ title: 'Editar experiencia', presentation: 'modal' }} />
    </Stack>
  );
}
