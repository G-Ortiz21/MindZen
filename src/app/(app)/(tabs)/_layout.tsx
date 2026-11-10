import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';
import { Vidrio } from '../../../components/Vidrio';
import { ALTURA_BARRA_TABS, MARGEN_BARRA_TABS } from '../../../lib/barraTabs';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // Excepción Uniwind: react-navigation recibe los tintes por props (no aceptan
  // className), se resuelven con el hook oficial useCSSVariable.
  const accion = useCSSVariable('--color-accion') as string;
  const tenue = useCSSVariable('--color-texto-tenue') as string;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: accion,
        tabBarInactiveTintColor: tenue,
        // Excepción Uniwind: geometría de la barra flotante controlada por
        // react-navigation (posición absoluta, radio e insets en style).
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: insets.bottom + MARGEN_BARRA_TABS,
          height: ALTURA_BARRA_TABS,
          borderRadius: 28,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        // Panel de vidrio: BlurView en iOS, superficie translúcida en Android/web
        tabBarBackground: () => <Vidrio intensidad={30} className="flex-1" />,
        // Excepción Uniwind: tipografía de la etiqueta por API de react-navigation
        tabBarLabelStyle: { fontFamily: 'Nunito_600SemiBold', fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Comunidad',
          tabBarIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Mi perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
