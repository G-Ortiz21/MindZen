import { supabase } from '../lib/supabase';
import type { Grupo } from '../lib/constantes';

export type Experiencia = {
  id: string;
  user_id: string;
  autor_nombre: string;
  titulo: string;
  contenido: string;
  grupo: Grupo;
  estado_animo: string | null;
  created_at: string;
};

export type DatosExperiencia = {
  titulo: string;
  contenido: string;
  grupo: Grupo;
  estado_animo: string | null;
};

// CREATE
export async function crearExperiencia(datos: DatosExperiencia, autorNombre: string) {
  const { error } = await supabase.from('experiencias').insert({ ...datos, autor_nombre: autorNombre });
  if (error) throw error;
}

// READ (lista, con filtro opcional por grupo)
export async function listarExperiencias(grupo?: Grupo | null): Promise<Experiencia[]> {
  let consulta = supabase.from('experiencias').select('*').order('created_at', { ascending: false });
  if (grupo) consulta = consulta.eq('grupo', grupo);
  const { data, error } = await consulta;
  if (error) throw error;
  return (data ?? []) as Experiencia[];
}

// READ (una sola, para editar)
export async function obtenerExperiencia(id: string): Promise<Experiencia> {
  const { data, error } = await supabase.from('experiencias').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Experiencia;
}

// UPDATE
export async function actualizarExperiencia(id: string, datos: DatosExperiencia) {
  const { error } = await supabase.from('experiencias').update(datos).eq('id', id);
  if (error) throw error;
}

// DELETE
export async function eliminarExperiencia(id: string) {
  const { error } = await supabase.from('experiencias').delete().eq('id', id);
  if (error) throw error;
}
