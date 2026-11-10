import { Text, TextInput, View, type TextInputProps } from 'react-native';

type Props = TextInputProps & { etiqueta: string; error?: string };

export function Campo({ etiqueta, error, className = '', ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-medium text-zend-700 dark:text-zend-200">{etiqueta}</Text>
      <TextInput
        placeholderTextColor="#8aa59c"
        autoCapitalize="none"
        className={`rounded-2xl border bg-white px-4 py-3.5 text-base text-tinta dark:bg-noche-card dark:text-zend-50 ${
          error ? 'border-red-400' : 'border-zend-200 dark:border-zend-700'
        } ${className}`}
        {...props}
      />
      {error ? <Text className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
    </View>
  );
}
