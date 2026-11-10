import { Alert, Platform } from 'react-native';

/** Muestra un mensaje al usuario: window.alert en web, Alert.alert en nativo. */
export function avisar(titulo: string, mensaje?: string) {
  if (Platform.OS === 'web') {
    window.alert(mensaje ? `${titulo}\n\n${mensaje}` : titulo);
    return;
  }
  Alert.alert(titulo, mensaje);
}

/**
 * Pregunta al usuario y ejecuta `onSi` si acepta:
 * window.confirm en web, Alert.alert en nativo.
 * `etiquetaSi` es el texto del botón positivo (solo aplica en nativo).
 */
export function confirmar(titulo: string, mensaje: string, onSi: () => void, etiquetaSi = 'Aceptar') {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titulo}\n\n${mensaje}`)) onSi();
    return;
  }
  Alert.alert(titulo, mensaje, [
    { text: 'Cancelar', style: 'cancel' },
    { text: etiquetaSi, style: 'destructive', onPress: onSi },
  ]);
}
