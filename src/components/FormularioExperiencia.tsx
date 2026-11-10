import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ANIMOS, GRUPOS, type Grupo } from '../lib/constantes';
import { avisar } from '../lib/avisos';
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
      avisar('No se pudo guardar', mensajeError(err));
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
        placeholder="Cuéntalo con tus palabras ✨"
        autoCapitalize="sentences"
        multiline
        textAlignVertical="top"
        className="min-h-[140px]"
        error={errores.contenido}
      />

      <Text className="mb-2 font-cuerpo-semi text-sm text-texto-suave dark:text-salvia-300">Grupo</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 pb-1"
      >
        {GRUPOS.map((g) => (
          <Chip
            key={g.nombre}
            texto={`${g.emoji} ${g.nombre}`}
            activo={grupo === g.nombre}
            onPress={() => setGrupo(g.nombre)}
          />
        ))}
      </ScrollView>
      {errores.grupo ? (
        <Text className="mt-1 font-cuerpo text-sm text-alerta-600 dark:text-alerta-300">{errores.grupo}</Text>
      ) : null}

      <Text className="mb-2 mt-5 font-cuerpo-semi text-sm text-texto-suave dark:text-salvia-300">
        ¿Cómo te sentías? (opcional)
      </Text>
      {/* Selector de ánimo con neumorfismo discreto (relieve + hundido al activar) */}
      <View className="mb-6 flex-row justify-between">
        {ANIMOS.map((a) => (
          <Pressable
            key={a.emoji}
            onPress={() => setAnimo(animo === a.emoji ? null : a.emoji)}
            accessibilityRole="button"
            accessibilityState={{ selected: animo === a.emoji }}
            accessibilityLabel={`Me siento ${a.etiqueta}`}
            className={`h-14 w-14 items-center justify-center rounded-suave border active:scale-95 ${
              animo === a.emoji
                ? 'border-accion bg-crema-100 shadow-relieve-hundido dark:bg-bosque-700'
                : 'border-borde bg-superficie shadow-relieve dark:border-bosque-700 dark:bg-bosque-800 dark:shadow-relieve-oscuro'
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
