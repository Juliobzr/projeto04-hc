"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { atualizarPaciente } from "@/services/patients";

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
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (!usuarioString) router.push("/login");
  }, [router]);

  async function handleFinalizar() {
    const idEmCadastro = localStorage.getItem("paciente_em_cadastro_id");
    if (!idEmCadastro) {
      alert("Nenhum paciente encontrado. Volte e preencha os dados do paciente primeiro.");
      return;
    }

    setSalvando(true);

    try {
      await atualizarPaciente(idEmCadastro, {
        tea: {
          nivelSuporte,
          autonomia,
          comunicacao,
          comunicacaoAlternativa,
          interacaoSocial,
          fatoresDesregulacao,
          dificuldadesSensoriais,
          fatoresClinicos,
          hiperfoco,
        },
      });

      router.push("/nova-triagem/confirmacao");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar perfil TEA. Tente novamente.");
    } finally {
      setSalvando(false);
    }
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
    salvando,
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
