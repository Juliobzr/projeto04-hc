"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function toggleInList(list: string[], item: string) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

export function useNewTriageTea() {
  const router = useRouter();

  const [nivelSuporte, setNivelSuporte] = useState("");
  const [autonomia, setAutonomia] = useState("");
  const [comunicacao, setComunicacao] = useState("");
  const [comunicacaoAlternativa, setComunicacaoAlternativa] = useState("");
  const [interacaoSocial, setInteracaoSocial] = useState<string[]>([]);
  const [fatoresDesregulacao, setFatoresDesregulacao] = useState<string[]>([]);
  const [dificuldadesSensoriais, setDificuldadesSensoriais] = useState<string[]>([]);
  const [fatoresClinicos, setFatoresClinicos] = useState<string[]>([]);
  const [hiperfoco, setHiperfoco] = useState("");

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (!usuarioString) router.push("/login");
  }, [router]);

  function handleFinalizar() {
    const pacientes = JSON.parse(localStorage.getItem("pacientes_mock") || "[]");
    const idEmCadastro = localStorage.getItem("paciente_em_cadastro_id");

    const index = pacientes.findIndex((p: { id: string }) => p.id === idEmCadastro);
    if (index === -1) {
      alert("Nenhum paciente encontrado. Volte e preencha os dados do paciente primeiro.");
      return;
    }

    pacientes[index].tea = {
      nivelSuporte, autonomia, comunicacao, comunicacaoAlternativa,
      interacaoSocial, fatoresDesregulacao, dificuldadesSensoriais,
      fatoresClinicos, hiperfoco,
    };

    localStorage.setItem("pacientes_mock", JSON.stringify(pacientes));
    localStorage.removeItem("paciente_em_cadastro_id");
    router.push("/nova-triagem/confirmacao");
  }

  return {
    nivelSuporte,
    autonomia,
    comunicacao,
    comunicacaoAlternativa,
    interacaoSocial,
    fatoresDesregulacao,
    dificuldadesSensoriais,
    fatoresClinicos,
    hiperfoco,
    setNivelSuporte,
    setAutonomia,
    setComunicacao,
    setComunicacaoAlternativa,
    setHiperfoco,
    toggleInteracaoSocial: (item: string) => setInteracaoSocial((prev) => toggleInList(prev, item)),
    toggleFatoresDesregulacao: (item: string) => setFatoresDesregulacao((prev) => toggleInList(prev, item)),
    toggleDificuldadesSensoriais: (item: string) => setDificuldadesSensoriais((prev) => toggleInList(prev, item)),
    toggleFatoresClinicos: (item: string) => setFatoresClinicos((prev) => toggleInList(prev, item)),
    onFinalizar: handleFinalizar,
    onVoltar: () => router.back(),
  };
}
