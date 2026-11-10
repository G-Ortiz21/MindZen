import { Svg } from 'react-native-svg';
import { PathU } from './svg';

type Props = { size?: number };

/** Brote original (Gratitud). */
export function Brote({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <PathU
        strokeClassName="accent-bosque-600 dark:accent-salvia-300"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
        d="M32,58 L32,30"
      />
      <PathU
        fillClassName="accent-salvia-500 dark:accent-salvia-300"
        d="M30,34 C20,34 13,27 13,17 C24,15 31,23 30,34 Z"
      />
      <PathU
        fillClassName="accent-salvia-300 dark:accent-salvia-500"
        d="M34,28 C44,28 51,21 51,11 C40,9 33,17 34,28 Z"
      />
    </Svg>
  );
}
