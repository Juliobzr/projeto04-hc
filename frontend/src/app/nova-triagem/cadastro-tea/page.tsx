"use client";

import NewTriageTeaView from "@/components/novaTriagem/NewTriageTeaView";
import { useNewTriageTea } from "@/hooks/useNewTriageTea";

export default function NewTriageTeaPage() {
  const props = useNewTriageTea();
  return <NewTriageTeaView {...props} />;
}
