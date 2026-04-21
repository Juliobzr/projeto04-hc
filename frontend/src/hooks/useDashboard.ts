"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useDashboard() {
  const router = useRouter();
  const [buscaCpf, setBuscaCpf] = useState("");
  const [erro, setErro] = useState("");

  function onBuscaChange(value: string) {
    setBuscaCpf(value);
    setErro("");
  }

  function handleBuscar() {
    if (!buscaCpf.trim()) {
      setErro("Digite um CPF para buscar.");
      return;
    }
    router.push(`/pacientes?cpf=${buscaCpf}`);
  }

  function onNovaTriagem() {
    router.push("/nova-triagem");
  }

  return {
    buscaCpf,
    erro,
    onBuscaChange,
    onBuscar: handleBuscar,
    onNovaTriagem,
  };
}
