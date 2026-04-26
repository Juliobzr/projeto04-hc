"use client";

import { Suspense } from "react";
import PatientListView from "@/components/pacientes/PatientListView";
import { usePatientList } from "@/hooks/usePatientList";

function PatientListViewContent() {
  const props = usePatientList();
  return <PatientListView {...props} />;
}

export default function PatientsPage() {
  return (
    <Suspense fallback={null}>
      <PatientListViewContent />
    </Suspense>
  );
}
