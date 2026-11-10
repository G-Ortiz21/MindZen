import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupportedStorage } from '@supabase/supabase-js';
import { Platform } from 'react-native';

/**
 * Almacenamiento de la sesión de Supabase Auth, seguro durante el SSR
 * de Expo Router (web.output: "static" renderiza en Node, sin `window`).
 *
 * - Android / iOS: AsyncStorage nativo (la sesión persiste entre reinicios).
 * - Web (navegador): AsyncStorage usa window.localStorage (la sesión persiste
 *   y conserva las mismas claves que siempre).
 * - Web (SSR en Node): no existe `window`, así que se responde "sin sesión"
 *   en vez de tocar APIs del navegador. El render del servidor es stateless;
 *   al hidratar, SessionProvider recupera la sesión real con getSession().
 */
const storageEnServidor: SupportedStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};

const esWeb = Platform.OS === 'web';
const hayNavegador = typeof window !== 'undefined';

/** AsyncStorage donde hay navegador o plataforma nativa; memoria efímera solo en SSR. */
export const authStorage: SupportedStorage =
  esWeb && !hayNavegador ? storageEnServidor : AsyncStorage;
