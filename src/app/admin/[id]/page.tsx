"use client";

import FuncionarioProfileView from "@/components/funcionarios/FuncionarioProfileView";
import { useFuncionarioProfile } from "@/hooks/useFuncionarioProfile";

export default function FuncionarioProfilePage() {
  const props = useFuncionarioProfile();
  return <FuncionarioProfileView {...props} />;
}
