"use client";

import ConfirmacaoSimplesView from "@/components/novaTriagem/ConfirmacaoSimplesView";
import { useConfirmacaoSimples } from "@/hooks/useConfirmacaoSimples";

export default function ConfirmacaoSimplesPage() {
  const props = useConfirmacaoSimples();
  return <ConfirmacaoSimplesView {...props} />;
}
