import type { User } from '@supabase/supabase-js';

/** Convierte cualquier error (Auth o Postgrest) en un mensaje claro en español. */
export function mensajeError(e: unknown): string {
  const msg =
    e instanceof Error
      ? e.message
      : typeof e === 'object' && e !== null && 'message' in e
        ? String((e as { message: unknown }).message)
        : '';

  if (/invalid login credentials/i.test(msg)) return 'Correo o contraseña incorrectos.';
  if (/user already registered/i.test(msg)) return 'Ese correo ya está registrado. Inicia sesión.';
  if (/email not confirmed/i.test(msg)) return 'Confirma tu correo antes de iniciar sesión.';
  if (/rate limit|too many/i.test(msg)) return 'Demasiados intentos. Espera unos minutos e intenta de nuevo.';
  if (/same password|different from the old/i.test(msg)) return 'La nueva contraseña debe ser distinta a la actual.';
  if (/at least \d+ characters/i.test(msg)) return 'La contraseña debe tener al menos 6 caracteres.';
  if (/network|fetch failed/i.test(msg)) return 'Sin conexión. Revisa tu internet.';
  if (/otp_expired|expired|invalid/i.test(msg) && /link|token|otp/i.test(msg))
    return 'El enlace no es válido o ya venció. Solicita uno nuevo.';
  return msg || 'Ocurrió un error. Intenta de nuevo.';
}

export function nombreDeUsuario(user: User | null | undefined): string {
  const meta = user?.user_metadata ?? {};
  return meta.full_name ?? meta.name ?? user?.email?.split('@')[0] ?? 'Anónimo';
}

export const correoValido = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
