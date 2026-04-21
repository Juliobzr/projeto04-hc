"use client";

import ConfiguracoesView from "@/components/configuracoes/ConfiguracoesView";
import { useConfiguracoes } from "@/hooks/useConfiguracoes";

export default function ConfiguracoesPage() {
  const props = useConfiguracoes();
  return <ConfiguracoesView {...props} />;
}
