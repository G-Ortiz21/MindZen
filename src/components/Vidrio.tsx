import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import { Platform, useColorScheme, View, type ViewProps } from 'react-native';
import { useUniwind, withUniwind } from 'uniwind';

// expo-blur no soporta className: se envuelve con la utilidad oficial de Uniwind
const BlurConUniwind = withUniwind(BlurView);

type Props = ViewProps & {
  children?: ReactNode;
  /** Intensidad del desenfoque (solo iOS) */
  intensidad?: number;
};

/**
 * Panel de vidrio reutilizable (glassmorphism).
 * - iOS: BlurView real (expo-blur).
 * - Android/web: fallback con superficie translúcida (mismos tokens de vidrio).
 * El tono del blur sigue el tema activo resuelto con el hook useUniwind.
 */
export function Vidrio({ children, intensidad = 24, className = '', ...rest }: Props) {
  const { theme } = useUniwind();
  const esquema = useColorScheme();
  // 'system' existe en runtime aunque los tipos sólo declaran light/dark
  const tema = theme as string;
  const oscuro = tema === 'dark' || (tema !== 'light' && esquema === 'dark');

  if (Platform.OS === 'ios') {
    return (
      <BlurConUniwind
        intensity={intensidad}
        tint={oscuro ? 'dark' : 'light'}
        className={`overflow-hidden ${className}`}
        {...rest}
      >
        {children}
      </BlurConUniwind>
    );
  }

  return (
    <View className={`border border-vidrio-borde bg-vidrio ${className}`} {...rest}>
      {children}
    </View>
  );
}
