import type { Session, User } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Alert } from 'react-native';
import { mensajeError } from '../lib/errores';
import { supabase } from '../lib/supabase';
import { crearSesionDesdeUrl } from '../services/auth';

type Valor = {
  session: Session | null;
  user: User | null;
  cargando: boolean;
  /** true mientras el usuario llegó por el enlace de "olvidé mi contraseña" */
  recuperando: boolean;
  terminarRecuperacion: () => void;
};

const Contexto = createContext<Valor | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);
  const [recuperando, setRecuperando] = useState(false);

  // 1) Sesión guardada + cambios de sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargando(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_evento, nueva) => setSession(nueva));
    return () => data.subscription.unsubscribe();
  }, []);

  // 2) Enlace de recuperación de contraseña (deep link)
  useEffect(() => {
    const manejar = async (url: string | null) => {
      if (!url || !url.includes('type=recovery')) return;
      setRecuperando(true); // antes de crear la sesión, para que no salte a la app principal
      try {
        await crearSesionDesdeUrl(url);
      } catch (e) {
        setRecuperando(false);
        Alert.alert('Enlace no válido', mensajeError(e));
      }
    };
    Linking.getInitialURL().then(manejar);
    const sub = Linking.addEventListener('url', (e) => manejar(e.url));
    return () => sub.remove();
  }, []);

  const terminarRecuperacion = useCallback(() => setRecuperando(false), []);

  const valor = useMemo(
    () => ({ session, user: session?.user ?? null, cargando, recuperando, terminarRecuperacion }),
    [session, cargando, recuperando, terminarRecuperacion]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useSession() {
  const v = useContext(Contexto);
  if (!v) throw new Error('useSession debe usarse dentro de SessionProvider');
  return v;
}
