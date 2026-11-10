import { Svg } from 'react-native-svg';
import { CircleU, PathU } from './svg';

type Props = { size?: number };

/** Sol original (Ejercicio). */
export function Sol({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <CircleU fillClassName="accent-durazno dark:accent-durazno-200" cx="32" cy="32" r="14" />
      <PathU
        strokeClassName="accent-durazno dark:accent-durazno-200"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
        d="M32,4 L32,12 M32,52 L32,60 M4,32 L12,32 M52,32 L60,32 M12,12 L18,18 M46,46 L52,52 M52,12 L46,18 M18,46 L12,52"
      />
    </Svg>
  );
}
