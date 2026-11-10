import { Pressable, Text } from 'react-native';

type Props = { texto: string; activo: boolean; onPress: () => void };

export function Chip({ texto, activo, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-2 ${
        activo
          ? 'border-zend-600 bg-zend-600'
          : 'border-zend-200 bg-white dark:border-zend-700 dark:bg-noche-card'
      }`}
    >
      <Text className={`text-sm font-medium ${activo ? 'text-white' : 'text-zend-700 dark:text-zend-200'}`}>
        {texto}
      </Text>
    </Pressable>
  );
}
