import { Circle, Path, Rect } from 'react-native-svg';
import { withUniwind } from 'uniwind';

/**
 * react-native-svg no soporta className: se envuelve con la utilidad oficial
 * de Uniwind (patrón documentado con styleProperty 'accentColor').
 */
export const PathU = withUniwind(Path, {
  fill: { fromClassName: 'fillClassName', styleProperty: 'accentColor' },
  stroke: { fromClassName: 'strokeClassName', styleProperty: 'accentColor' },
});

export const CircleU = withUniwind(Circle, {
  fill: { fromClassName: 'fillClassName', styleProperty: 'accentColor' },
  stroke: { fromClassName: 'strokeClassName', styleProperty: 'accentColor' },
});

export const RectU = withUniwind(Rect, {
  fill: { fromClassName: 'fillClassName', styleProperty: 'accentColor' },
  stroke: { fromClassName: 'strokeClassName', styleProperty: 'accentColor' },
});
