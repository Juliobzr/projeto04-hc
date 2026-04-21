"use client";

import NovaTriagemView from "@/components/novaTriagem/NovaTriagemView";
import { useNovaTriagem } from "@/hooks/useNovaTriagem";

export default function NovaTriagemPage() {
  const props = useNovaTriagem();
  return <NovaTriagemView {...props} />;
}
