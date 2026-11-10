import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { ExitoOverlay } from '../../components/ExitoOverlay';
import { FondoOrganico } from '../../components/FondoOrganico';
import { FormularioExperiencia } from '../../components/FormularioExperiencia';
import { Pantalla } from '../../components/Pantalla';
import { useSession } from '../../contexts/SessionContext';
import { nombreDeUsuario } from '../../lib/errores';
import { crearExperiencia } from '../../services/experiencias';

export default function NuevaExperiencia() {
  const router = useRouter();
  const { user } = useSession();
  const [listo, setListo] = useState(false);

  return (
    <View className="flex-1">
      <Pantalla conEncabezado fondo={<FondoOrganico />}>
        <FormularioExperiencia
          textoBoton="Publicar"
          onEnviar={async (datos) => {
            await crearExperiencia(datos, nombreDeUsuario(user));
            setListo(true);
          }}
        />
      </Pantalla>
      {listo ? <ExitoOverlay mensaje="¡Experiencia publicada!" onFin={() => router.back()} /> : null}
    </View>
  );
}
