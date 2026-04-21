"use client";

import CadastroTeaView from "@/components/novaTriagem/CadastroTeaView";
import { useCadastroTea } from "@/hooks/useCadastroTea";

export default function CadastroTeaPage() {
  const props = useCadastroTea();
  return <CadastroTeaView {...props} />;
}
