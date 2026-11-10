import { Svg } from 'react-native-svg';
import { PathU } from './svg';

type Props = { size?: number };

/** Corazón en manos original (Motivación / aviso de comunidad). */
export function Manos({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <PathU
        fillClassName="accent-durazno dark:accent-durazno-200"
        d="M32,34 C27,25 15,26 15,36 C15,46 32,54 32,54 C32,54 49,46 49,36 C49,26 37,25 32,34 Z"
      />
      <PathU
        strokeClassName="accent-bosque-600 dark:accent-salvia-300"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
        d="M10,30 C4,44 12,58 26,58"
      />
      <PathU
        strokeClassName="accent-bosque-600 dark:accent-salvia-300"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
        d="M54,30 C60,44 52,58 38,58"
      />
    </Svg>
  );
}
