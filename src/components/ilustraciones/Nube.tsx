import { Svg } from 'react-native-svg';
import { CircleU, RectU } from './svg';

type Props = { size?: number };

/** Nube original (Ansiedad). */
export function Nube({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <CircleU fillClassName="accent-crema-50 dark:accent-bosque-600" cx="24" cy="34" r="13" />
      <CircleU fillClassName="accent-crema-50 dark:accent-bosque-600" cx="40" cy="34" r="15" />
      <CircleU fillClassName="accent-crema-50 dark:accent-bosque-600" cx="32" cy="24" r="13" />
      <RectU
        fillClassName="accent-crema-50 dark:accent-bosque-600"
        x="10"
        y="36"
        width="44"
        height="12"
        rx="6"
      />
      <CircleU fillClassName="accent-lavanda-300 dark:accent-lavanda-400" cx="24" cy="18" r="3" />
    </Svg>
  );
}
