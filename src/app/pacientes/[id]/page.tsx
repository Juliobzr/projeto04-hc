"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PatientProfileView from "@/components/perfilPaciente/PatientProfileView";
import PatientViewModal from "@/components/pacientes/PatientViewModal";
import { usePatientProfile } from "@/hooks/usePatientProfile";

export default function PatientProfilePage() {
  const params = useParams();
  const pacienteId = params.id as string;
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const props = usePatientProfile();

  return (
    <>
      <PatientProfileView {...props} onExibirInformacoes={() => setInfoModalOpen(true)} />
      <PatientViewModal
        isOpen={infoModalOpen}
        pacienteId={pacienteId}
        onClose={() => setInfoModalOpen(false)}
      />
    </>
  );
}
