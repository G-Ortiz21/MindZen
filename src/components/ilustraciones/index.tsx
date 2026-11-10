import { Brote } from './Brote';
import { Hoja } from './Hoja';
import { Luna } from './Luna';
import { Manos } from './Manos';
import { Nube } from './Nube';
import { NubeLluvia } from './NubeLluvia';
import { Sol } from './Sol';
import type { Grupo } from '../../lib/constantes';

type Props = { nombre: Grupo | null; size?: number };

/** Ilustración SVG ligera según el grupo (null = "Todas"). */
export function IlustracionGrupo({ nombre, size = 48 }: Props) {
  switch (nombre) {
    case 'Ansiedad':
      return <Nube size={size} />;
    case 'Estrés':
      return <NubeLluvia size={size} />;
    case 'Ejercicio':
      return <Sol size={size} />;
    case 'Sueño':
      return <Luna size={size} />;
    case 'Motivación':
      return <Manos size={size} />;
    case 'Gratitud':
      return <Brote size={size} />;
    default:
      return <Hoja size={size} />;
  }
}
