"use client";

import { Suspense } from "react";
import PacientesListaView from "@/components/pacientes/PacientesListaView";
import { usePacientesLista } from "@/hooks/usePacientesLista";

function PacientesListaPageContent() {
  const props = usePacientesLista();
  return <PacientesListaView {...props} />;
}

export default function PacientesPage() {
  return (
    <Suspense fallback={null}>
      <PacientesListaPageContent />
    </Suspense>
  );
}
