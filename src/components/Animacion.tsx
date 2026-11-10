import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

/**
 * Catálogo cerrado de animaciones (7): respirar, conexion, correo, planta,
 * exito, alerta y escudo. Para cambiar una animación, sustituye su .json en
 * assets/lottie/ conservando el nombre: no hay que tocar código.
 */
const fuentes = {
  // DEFINITIVAS — no reemplazar ni recolorear
  respirar: require('../../assets/lottie/respirar.json'),
  conexion: require('../../assets/lottie/conexion.json'),
  // Resto del catálogo
  correo: require('../../assets/lottie/correo.json'),
  planta: require('../../assets/lottie/planta.json'),
  escudo: require('../../assets/lottie/escudo.json'),
  exito: require('../../assets/lottie/exito.json'),
  alerta: require('../../assets/lottie/alerta.json'),
};

export type NombreAnimacion = keyof typeof fuentes;

type Props = {
  nombre: NombreAnimacion;
  size?: number;
  loop?: boolean;
  onFin?: () => void;
  /** Velocidad de reproducción (1 = normal) */
  velocidad?: number;
};

export function Animacion({ nombre, size = 180, loop = true, onFin, velocidad = 1 }: Props) {
  // Respeta la preferencia de "reducir movimiento" del sistema
  const reducirMovimiento = useReducedMotion();
  const alTerminar = useRef(onFin);
  useEffect(() => {
    alTerminar.current = onFin;
  }, [onFin]);

  // Con movimiento reducido la animación no corre: si tenía onFin (p. ej. cerrar
  // un overlay de éxito), lo igualamos tras un breve instante para no trabar la UX.
  useEffect(() => {
    if (reducirMovimiento && !loop && alTerminar.current) {
      const id = setTimeout(() => alTerminar.current?.(), 500);
      return () => clearTimeout(id);
    }
  }, [reducirMovimiento, loop]);

  // Protección: si el nombre no existe en el catálogo, se avisa y no se pinta nada
  // (siempre después de los hooks, para no romper las reglas de React).
  if (!fuentes[nombre]) {
    console.warn(`Animacion: no existe la animación "${nombre}"`);
    return null;
  }

  return (
    <LottieView
      source={fuentes[nombre]}
      autoPlay={!reducirMovimiento}
      loop={loop}
      speed={velocidad}
      onAnimationFinish={onFin ? () => onFin() : undefined}
      style={{ width: size, height: size }} // excepción Uniwind: tamaño dinámico según prop
    />
  );
}
