import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  /** true cuando la pantalla ya tiene encabezado nativo (no suma el área segura superior) */
  conEncabezado?: boolean;
};

export function Pantalla({ children, conEncabezado = false }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-zend-50 dark:bg-noche"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: conEncabezado ? 16 : insets.top + 16,
          paddingBottom: insets.bottom + 32,
        }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
