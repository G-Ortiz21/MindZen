import LottieView from 'lottie-react-native';

// Para usar tus propias animaciones de LottieFiles / IconScout:
// descarga el .json y reemplaza el archivo con el mismo nombre en assets/lottie/
const fuentes = {
  respirar: require('../../assets/lottie/respirar.json'),
  exito: require('../../assets/lottie/exito.json'),
  conexion: require('../../assets/lottie/conexion.json'),
  flotar: require('../../assets/lottie/flotar.json'),
  alerta: require('../../assets/lottie/alerta.json'),
};

export type NombreAnimacion = keyof typeof fuentes;

type Props = {
  nombre: NombreAnimacion;
  size?: number;
  loop?: boolean;
  onFin?: () => void;
};

export function Animacion({ nombre, size = 180, loop = true, onFin }: Props) {
  return (
    <LottieView
      source={fuentes[nombre]}
      autoPlay
      loop={loop}
      onAnimationFinish={onFin ? () => onFin() : undefined}
      style={{ width: size, height: size }}
    />
  );
}
