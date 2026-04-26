"use client";

import TriageConfimationView from "@/components/novaTriagem/TriageConfirmationView";
import { useTriageConfirmation } from "@/hooks/useTriageConfirmartion";

export default function TriageConfirmationPage() {
  const props = useTriageConfirmation();
  return <TriageConfimationView {...props} />;
}
