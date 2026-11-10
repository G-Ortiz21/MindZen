import { Redirect } from 'expo-router';

// Ruta de retorno de Google. Evita que Expo Router muestre "pantalla no encontrada"
// mientras la app termina de procesar el inicio de sesión.
export default function AuthCallback() {
  return <Redirect href="/" />;
}
