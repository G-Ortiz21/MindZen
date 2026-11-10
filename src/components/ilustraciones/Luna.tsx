import { Svg } from 'react-native-svg';
import { CircleU, PathU } from './svg';

type Props = { size?: number };

/** Luna creciente original (Sueño). */
export function Luna({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <PathU
        fillClassName="accent-lavanda-400 dark:accent-lavanda-300"
        d="M40,6 A26,26 0 1,0 40,58 A34,34 0 0,1 40,6 Z"
      />
      <CircleU fillClassName="accent-lima" cx="50" cy="16" r="4" />
    </Svg>
  );
}
