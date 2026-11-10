import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from 'expo-router/tabs';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';
import { AIRE_BARRA_TABS, MARGEN_BARRA_TABS } from '../lib/barraTabs';
import { Vidrio } from './Vidrio';

type Props = { onPress: () => void };

/**
 * Botón flotante "+" con fondo de vidrio (BlurView en iOS, translúcido en el resto).
 * Hay que renderizarlo dentro de una pantalla con barra de pestañas: se apoya en su
 * altura real para quedar por ENCIMA de la barra y no pisar la pestaña "Mi perfil".
 */
export function BotonFlotante({ onPress }: Props) {
  // Excepción Uniwind: Ionicons no acepta className; se resuelve el color con
  // el hook oficial useCSSVariable (misma variable que pinta bg-accion).
  const colorIcono = useCSSVariable('--color-accion') as string;
  const insets = useSafeAreaInsets();
  // Altura real de la barra flotante (64) que reporta expo-router en runtime.
  const alturaBarra = useBottomTabBarHeight();
  // Excepción Uniwind: bottom dinámico = barra + su margen inferior + 16 px de aire.
  const bottom = insets.bottom + MARGEN_BARRA_TABS + alturaBarra + AIRE_BARRA_TABS;

  return (
    <Vidrio
      intensidad={30}
      // Excepción Uniwind: bottom dinámico y zIndex por encima del contenido de la lista.
      style={{ bottom, zIndex: 20 }}
      className="absolute right-6 h-16 w-16 rounded-full border border-vidrio-borde shadow-flotante android:[elevation:6]"
    >
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Compartir una experiencia"
        className="h-full w-full items-center justify-center rounded-full active:scale-95"
      >
        <Ionicons name="add" size={32} color={colorIcono} />
      </Pressable>
    </Vidrio>
  );
}
