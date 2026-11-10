import { Text, TextInput, View, type TextInputProps } from 'react-native';

type Props = TextInputProps & { etiqueta: string; error?: string };

export function Campo({ etiqueta, error, className = '', ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 font-cuerpo-semi text-sm text-texto-suave dark:text-salvia-300">{etiqueta}</Text>
      <TextInput
        placeholderTextColorClassName="accent-texto-tenue"
        autoCapitalize="none"
        className={`rounded-suave border bg-superficie px-4 py-3.5 font-cuerpo text-base text-texto focus:border-accion ${
          error ? 'border-alerta-600 dark:border-alerta-300' : 'border-borde dark:border-bosque-700'
        } ${className}`}
        {...props}
      />
      {error ? (
        <Text className="mt-1 font-cuerpo text-sm text-alerta-600 dark:text-alerta-300">{error}</Text>
      ) : null}
    </View>
  );
}
