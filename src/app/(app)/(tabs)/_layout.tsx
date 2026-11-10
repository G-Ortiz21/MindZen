import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const oscuro = useColorScheme() === 'dark';
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: oscuro ? '#5bb59a' : '#2c7f68',
        tabBarInactiveTintColor: oscuro ? '#6b8a80' : '#8aa59c',
        tabBarStyle: { backgroundColor: oscuro ? '#182622' : '#ffffff', borderTopWidth: 0 },
        tabBarLabelStyle: { fontWeight: '600' },
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
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
