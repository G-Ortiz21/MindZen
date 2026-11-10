import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';

// Necesario para cerrar el navegador de OAuth correctamente
WebBrowser.maybeCompleteAuthSession();

/** Lee los parámetros que Supabase manda en el deep link (en el # o en el ?). */
function leerParametros(url: string): Record<string, string> {
  const salida: Record<string, string> = {};
  const [sinHash, hash] = url.split('#');
  const query = sinHash.split('?')[1];
  [query, hash].forEach((parte) => {
    if (!parte) return;
    parte.split('&').forEach((par) => {
      const [k, v] = par.split('=');
      if (k) salida[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
    });
  });
  return salida;
}

/** Crea la sesión a partir de un enlace (Google o recuperación de contraseña). */
export async function crearSesionDesdeUrl(url: string) {
  const p = leerParametros(url);
  if (p.error || p.error_code) {
    throw new Error(p.error_description?.replace(/\+/g, ' ') || p.error_code || p.error);
  }
  if (!p.access_token || !p.refresh_token) return null;
  const { data, error } = await supabase.auth.setSession({
    access_token: p.access_token,
    refresh_token: p.refresh_token,
  });
  if (error) throw error;
  return { session: data.session, tipo: p.type ?? null };
}

export async function registrar(nombre: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { full_name: nombre.trim() } },
  });
  if (error) throw error;
  // Si Supabase exige confirmar el correo, session llega en null
  return { requiereConfirmacion: !data.session };
}

export async function iniciarSesion(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw error;
}

export async function recuperarClave(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: Linking.createURL('reset-password'),
  });
  if (error) throw error;
}

export async function actualizarClave(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

/** Social login: abre el navegador, el usuario elige su cuenta de Google y vuelve a la app. */
export async function iniciarConGoogle(): Promise<boolean> {
  const redirectTo = Linking.createURL('auth-callback');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) throw error;
  if (!data.url) throw new Error('No se pudo iniciar el acceso con Google.');

  const resultado = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (resultado.type !== 'success') return false; // el usuario canceló
  await crearSesionDesdeUrl(resultado.url);
  return true;
}

export async function cerrarSesion() {
  // scope 'local': limpia la sesión local y emite SIGNED_OUT aunque falle la red
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) throw error;
}
