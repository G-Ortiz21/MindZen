import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import { authStorage } from './storage';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Faltan EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_ANON_KEY. Copia .env.example como .env y completa los valores.'
  );
}

export const supabase = createClient(url, anonKey, {
  auth: {
    storage: authStorage, // seguro en SSR (ver src/lib/storage.ts)
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // en móvil los tokens los leemos nosotros del deep link
  },
});

// Solo refresca el token mientras la app está en primer plano
AppState.addEventListener('change', (estado) => {
  if (estado === 'active') supabase.auth.startAutoRefresh();
  else supabase.auth.stopAutoRefresh();
});
