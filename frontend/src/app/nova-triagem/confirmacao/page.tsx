"use client";

import ConfirmacaoTriagemView from "@/components/novaTriagem/ConfirmacaoTriagemView";
import { useConfirmacaoTriagem } from "@/hooks/useConfirmacaoTriagem";

export default function ConfirmacaoTriagemPage() {
  const props = useConfirmacaoTriagem();
  return <ConfirmacaoTriagemView {...props} />;
}
