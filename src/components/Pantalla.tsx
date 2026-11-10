import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  /** true cuando la pantalla ya tiene encabezado nativo (no suma el área segura superior) */
  conEncabezado?: boolean;
  /** Capa decorativa fija detrás del contenido (p. ej. FondoOrganico) */
  fondo?: ReactNode;
};

export function Pantalla({ children, conEncabezado = false, fondo }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-fondo"
    >
      {fondo}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="grow px-pantalla"
        // Excepción Uniwind: paddingTop/Bottom dependen de los insets en runtime
        // (la variante segura pt-safe requiere SafeAreaListener, no disponible en la versión libre)
        contentContainerStyle={{
          paddingTop: conEncabezado ? 16 : insets.top + 16,
          paddingBottom: insets.bottom + 32,
        }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
