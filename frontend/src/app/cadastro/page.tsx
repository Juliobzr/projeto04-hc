"use client";

import CadastroView from "@/components/cadastro/CadastroView";
import { useCadastro } from "@/hooks/useCadastro";

export default function CadastroPage() {
  const props = useCadastro();
  return <CadastroView {...props}/>;
}