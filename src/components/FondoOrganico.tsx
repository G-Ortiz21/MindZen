import { useWindowDimensions, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';
import { withUniwind } from 'uniwind';

// react-native-svg no soporta className: se envuelve con la utilidad oficial de Uniwind
// (patrón documentado con styleProperty 'accentColor' para rellenar con clases)
const RellenoSvg = withUniwind(Path, {
  fill: { fromClassName: 'fillClassName', styleProperty: 'accentColor' },
  stroke: { fromClassName: 'strokeClassName', styleProperty: 'accentColor' },
});
const PuntoSvg = withUniwind(Circle, {
  fill: { fromClassName: 'fillClassName', styleProperty: 'accentColor' },
});

type Props = { className?: string };

/**
 * Blobs orgánicos de fondo (react-native-svg, sin imágenes pesadas).
 * Se coloca detrás del contenido: <Pantalla fondo={<FondoOrganico />}>.
 */
export function FondoOrganico({ className = '' }: Props) {
  const { width, height } = useWindowDimensions();
  return (
    <View pointerEvents="none" className={`absolute inset-0 ${className}`}>
      <Svg width={width} height={height} viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
        {/* blob superior derecho (lavanda) */}
        <RellenoSvg
          fillClassName="accent-lavanda-100 dark:accent-bosque-800"
          d="M282,-48 C356,4 384,132 328,196 C272,260 148,254 122,176 C96,98 208,-100 282,-48 Z"
        />
        {/* blob inferior izquierdo (salvia) */}
        <RellenoSvg
          fillClassName="accent-salvia-100 dark:accent-bosque-700"
          d="M-64,412 C24,368 148,436 136,540 C124,644 16,688 -64,648 C-144,608 -152,456 -64,412 Z"
        />
        {/* puntos de acento (durazno / lima) */}
        <PuntoSvg fillClassName="accent-durazno-200 dark:accent-lavanda-400" cx="304" cy="536" r="26" />
        <PuntoSvg fillClassName="accent-lima dark:accent-lavanda-600" cx="48" cy="96" r="14" />
      </Svg>
    </View>
  );
}
