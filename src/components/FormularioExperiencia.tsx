import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { ANIMOS, GRUPOS, type Grupo } from '../lib/constantes';
import { mensajeError } from '../lib/errores';
import type { DatosExperiencia } from '../services/experiencias';
import { Boton } from './Boton';
import { Campo } from './Campo';
import { Chip } from './Chip';

type Props = {
  inicial?: DatosExperiencia;
  textoBoton: string;
  onEnviar: (datos: DatosExperiencia) => Promise<void>;
};

export function FormularioExperiencia({ inicial, textoBoton, onEnviar }: Props) {
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '');
  const [contenido, setContenido] = useState(inicial?.contenido ?? '');
  const [grupo, setGrupo] = useState<Grupo | null>(inicial?.grupo ?? null);
  const [animo, setAnimo] = useState<string | null>(inicial?.estado_animo ?? null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);

  const enviar = async () => {
    const e: Record<string, string> = {};
    if (titulo.trim().length < 3) e.titulo = 'Escribe un título de al menos 3 caracteres.';
    if (contenido.trim().length < 10) e.contenido = 'Cuenta tu experiencia con al menos 10 caracteres.';
    if (!grupo) e.grupo = 'Elige un grupo.';
    setErrores(e);
    if (Object.keys(e).length > 0 || !grupo) return;

    setEnviando(true);
    try {
      await onEnviar({ titulo: titulo.trim(), contenido: contenido.trim(), grupo, estado_animo: animo });
    } catch (err) {
      Alert.alert('No se pudo guardar', mensajeError(err));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View>
      <Campo
        etiqueta="Título"
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ej. Lo que me ayudó antes de un examen"
        autoCapitalize="sentences"
        error={errores.titulo}
        maxLength={80}
      />
      <Campo
        etiqueta="Tu experiencia"
        value={contenido}
        onChangeText={setContenido}
        placeholder="Cuéntalo con tus palabras…"
        autoCapitalize="sentences"
        multiline
        textAlignVertical="top"
        className="min-h-[140px]"
        error={errores.contenido}
      />

      <Text className="mb-2 text-sm font-medium text-zend-700 dark:text-zend-200">Grupo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {GRUPOS.map((g) => (
          <Chip key={g.nombre} texto={`${g.emoji} ${g.nombre}`} activo={grupo === g.nombre} onPress={() => setGrupo(g.nombre)} />
        ))}
      </ScrollView>
      {errores.grupo ? <Text className="mt-1 text-sm text-red-600 dark:text-red-400">{errores.grupo}</Text> : null}

      <Text className="mb-2 mt-5 text-sm font-medium text-zend-700 dark:text-zend-200">
        ¿Cómo te sentías? (opcional)
      </Text>
      <View className="mb-6 flex-row justify-between">
        {ANIMOS.map((a) => (
          <Pressable
            key={a.emoji}
            onPress={() => setAnimo(animo === a.emoji ? null : a.emoji)}
            className={`h-14 w-14 items-center justify-center rounded-2xl border ${
              animo === a.emoji
                ? 'border-zend-600 bg-zend-100 dark:bg-zend-700/40'
                : 'border-zend-200 bg-white dark:border-zend-700 dark:bg-noche-card'
            }`}
          >
            <Text className="text-2xl">{a.emoji}</Text>
          </Pressable>
        ))}
      </View>

      <Boton texto={textoBoton} onPress={enviar} cargando={enviando} />
    </View>
  );
}
