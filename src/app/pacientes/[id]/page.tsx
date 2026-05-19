"use client";

import PatientProfileView from "@/components/perfilPaciente/PatientProfileView";
import { usePatientProfile } from "@/hooks/usePatientProfile";

export default function PatientProfilePage() {
  const props = usePatientProfile();
  return <PatientProfileView {...props} />;
}
