"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { criarPaciente } from "@/services/patients";
import { pacienteSchema } from "@/utils/pacienteSchema";

export function useNewTriage() {
  const router = useRouter();

  const [possuiDeficiencia, setPossuiDeficiencia] = useState("nao");
  const [tipoDeficiencia, setTipoDeficiencia] = useState("tea");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [prontuario, setProntuario] = useState("");
  const [cartaoSUS, setCartaoSUS] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [unidade, setUnidade] = useState("");

  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = value.replace(/^(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d+)/, "$1/$2");
    }
    setDataNascimento(value);
  }

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (!usuarioString) router.push("/login");
  }, [router]);

  async function handleSalvar() {
    const result = pacienteSchema.safeParse({
      nomeCompleto,
      cpf,
      dataNascimento,
    });

    if (!result.success) {
      alert(result.error.issues[0].message);
  return;
}

    const novoPaciente = {
      nome: nomeCompleto,
      nomeSocial,
      dataNascimento,
      cpf,
      telefone,
      nomeResponsavel,
      prontuario,
      cartaoSUS,
      especialidade,
      unidade,
      deficiencia: possuiDeficiencia === "sim" ? tipoDeficiencia.toUpperCase() : "Não",
    };

    try {
      const pacienteCriado = await criarPaciente(novoPaciente);
      localStorage.setItem("paciente_em_cadastro_id", pacienteCriado.id);

      if (possuiDeficiencia === "sim" && tipoDeficiencia === "tea") {
        router.push("/nova-triagem/cadastro-tea");
      } else {
        localStorage.removeItem("paciente_em_cadastro_id");
        router.push("/nova-triagem/confirmacao-simples");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar paciente. Tente novamente.");
    }
  }

  function handleCpfChange(value: string) {
  value = value.replace(/\D/g, "");

  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  setCpf(value);
}

  return {
    possuiDeficiencia,
    tipoDeficiencia,
    nomeCompleto,
    nomeSocial,
    dataNascimento,
    cpf,
    telefone,
    nomeResponsavel,
    prontuario,
    cartaoSUS,
    especialidade,
    unidade,
    setPossuiDeficiencia,
    setTipoDeficiencia,
    setNomeCompleto,
    setNomeSocial,
    onDataNascimentoChange: handleDataChange,
    setCpf: handleCpfChange,
    setTelefone,
    setNomeResponsavel,
    setProntuario,
    setCartaoSUS,
    setEspecialidade,
    setUnidade,
    onSalvar: handleSalvar,
    onVoltar: () => router.push("/inicio"),
  };
}
