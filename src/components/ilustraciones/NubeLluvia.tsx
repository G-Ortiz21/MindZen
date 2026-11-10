import { Svg } from 'react-native-svg';
import { CircleU, RectU } from './svg';

type Props = { size?: number };

/** Nube con gotas original (Estrés). */
export function NubeLluvia({ size = 48 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <CircleU fillClassName="accent-salvia-200 dark:accent-bosque-600" cx="24" cy="28" r="12" />
      <CircleU fillClassName="accent-salvia-200 dark:accent-bosque-600" cx="40" cy="28" r="14" />
      <CircleU fillClassName="accent-salvia-200 dark:accent-bosque-600" cx="32" cy="19" r="12" />
      <RectU
        fillClassName="accent-salvia-200 dark:accent-bosque-600"
        x="11"
        y="30"
        width="42"
        height="11"
        rx="5.5"
      />
      <CircleU fillClassName="accent-lavanda-400" cx="22" cy="50" r="3.5" />
      <CircleU fillClassName="accent-lavanda-400" cx="33" cy="56" r="3.5" />
      <CircleU fillClassName="accent-lavanda-400" cx="44" cy="50" r="3.5" />
    </Svg>
  );
}
