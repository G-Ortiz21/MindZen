/**
 * Geometría compartida de la barra de pestañas flotante y del botón "+".
 * Única fuente de verdad: la usan (tabs)/_layout.tsx, BotonFlotante y el muro
 * para que el botón nunca se solape con la barra ni tape la última tarjeta.
 */

/** Altura fija de la barra (tabBarStyle.height). */
export const ALTURA_BARRA_TABS = 64;
/** Margen inferior de la barra respecto al borde de la pantalla (sin insets). */
export const MARGEN_BARRA_TABS = 12;
/** Hueco en px que deja el botón "+" por encima de la barra. */
export const AIRE_BARRA_TABS = 16;
/** Lado del botón "+" (h-16 w-16 = 64 px; mínimo táctil de 56 px). */
export const TAM_BOTON_FLOTANTE = 64;

/**
 * paddingBottom del muro: barra + aire + botón + aire.
 * `alturaBarra` viene de useBottomTabBarHeight (valor real en runtime).
 */
export function reservaInferiorMuro(insetsBottom: number, alturaBarra: number) {
  return (
    insetsBottom + MARGEN_BARRA_TABS + alturaBarra + AIRE_BARRA_TABS + TAM_BOTON_FLOTANTE + AIRE_BARRA_TABS
  );
}
