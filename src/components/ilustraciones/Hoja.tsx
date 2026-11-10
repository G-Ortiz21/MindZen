import { Svg } from 'react-native-svg';
import { PathU } from './svg';

type Props = { size?: number };

/** Hoja original (salvia) — se usa en el filtro "Todas" del muro. */
export function Hoja({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <PathU
        fillClassName="accent-salvia-500 dark:accent-salvia-300"
        d="M52,10 C30,8 12,24 12,44 C12,50 14,55 18,58 C40,55 55,36 52,10 Z"
      />
      <PathU
        strokeClassName="accent-bosque-700 dark:accent-crema-50"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        d="M18,56 C26,44 38,30 50,16"
      />
    </Svg>
  );
}
