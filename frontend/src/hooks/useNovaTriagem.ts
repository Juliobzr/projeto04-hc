"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useNovaTriagem() {
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

  function handleSalvar() {
    if (!nomeCompleto || !cpf || !dataNascimento) {
      alert("Preencha pelo menos Nome, CPF e Data de Nascimento.");
      return;
    }

    const pacientesExistentes = JSON.parse(localStorage.getItem("pacientes_mock") || "[]");

    const novoPaciente = {
      id: Date.now().toString(),
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
      criadoEm: new Date().toISOString(),
    };

    pacientesExistentes.push(novoPaciente);
    localStorage.setItem("pacientes_mock", JSON.stringify(pacientesExistentes));
    localStorage.setItem("paciente_em_cadastro_id", novoPaciente.id);

    if (possuiDeficiencia === "sim" && tipoDeficiencia === "tea") {
      router.push("/nova-triagem/cadastro-tea");
    } else {
      router.push("/nova-triagem/confirmacao-simples");
    }
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
    setCpf,
    setTelefone,
    setNomeResponsavel,
    setProntuario,
    setCartaoSUS,
    setEspecialidade,
    setUnidade,
    onSalvar: handleSalvar,
    onVoltar: () => router.push("/dashboard"),
  };
}
