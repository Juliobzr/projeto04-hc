"use client";

import PerfilPacienteView from "@/components/perfilPaciente/PerfilPacienteView";
import { usePerfilPaciente } from "@/hooks/usePerfilPaciente";

export default function PerfilPacientePage() {
  const props = usePerfilPaciente();
  return <PerfilPacienteView {...props} />;
}
