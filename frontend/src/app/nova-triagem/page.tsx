"use client";

import NewTriageView from "@/components/novaTriagem/NewTriageView";
import { useNewTriage } from "@/hooks/useNewTriage";

export default function NewTriagePage() {
  const props = useNewTriage();
  return <NewTriageView {...props} />;
}
