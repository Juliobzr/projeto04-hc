"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarPaciente, atualizarPaciente } from "@/services/patients";

function toggleInList(list: string[], item: string) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

export function usePatientProfile() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [prontuario, setProntuario] = useState("");
  const [cartaoSUS, setCartaoSUS] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [deficiencia, setDeficiencia] = useState("Não");
  const [salvo, setSalvo] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");

  const [temTEA, setTemTEA] = useState(false);
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
    if (usuarioString) setNomeUsuario(JSON.parse(usuarioString).nome);
    else router.push("/login");

    async function carregarPaciente() {
      try {
        const paciente = await buscarPaciente(id);
        setNome(paciente.nome || "");
        setNomeSocial(paciente.nomeSocial || "");
        setDataNascimento(paciente.dataNascimento || "");
        setCpf(paciente.cpf || "");
        setNomeResponsavel(paciente.nomeResponsavel || "");
        setTelefone(paciente.telefone || "");
        setProntuario(paciente.prontuario || "");
        setCartaoSUS(paciente.cartaoSUS || "");
        setEspecialidade(paciente.especialidade || "");
        setUnidade(paciente.unidade || "");
        setDeficiencia(paciente.deficiencia || "Não");

        if (paciente.tea) {
          setTemTEA(true);
          setNivelSuporte(paciente.tea.nivelSuporte || "");
          setAutonomia(paciente.tea.autonomia || "");
          setComunicacao(paciente.tea.comunicacao || "");
          setComunicacaoAlternativa(paciente.tea.comunicacaoAlternativa || "");
          setInteracaoSocial(paciente.tea.interacaoSocial || []);
          setFatoresDesregulacao(paciente.tea.fatoresDesregulacao || []);
          setDificuldadesSensoriais(paciente.tea.dificuldadesSensoriais || []);
          setFatoresClinicos(paciente.tea.fatoresClinicos || []);
          setHiperfoco(paciente.tea.hiperfoco || "");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar paciente.");
      }
    }

    carregarPaciente();
  }, [id, router]);

  const resumoTexto = useMemo(() => {
    const partes = [
      `Paciente com nível de suporte ${nivelSuporte === "nivel1" ? "leve (Nível 1)" : nivelSuporte === "nivel2" ? "moderado (Nível 2)" : "severo (Nível 3)"}.`,
      autonomia === "total" ? "Totalmente dependente." : autonomia === "parcial" ? "Parcialmente dependente." : "Independente.",
      comunicacao === "nao_verbal" ? "Apresenta perfil não verbal." : comunicacao === "verbal_suporte" ? "Comunica-se com suporte." : "Comunicação verbal preservada.",
      interacaoSocial.length > 0 ? `Tendência ao ${interacaoSocial.join(", ").toLowerCase()}.` : "",
      fatoresDesregulacao.length > 0 ? `Principais causas de desregulação: ${fatoresDesregulacao.join(", ").toLowerCase()}.` : "",
      dificuldadesSensoriais.length > 0 ? `Perfil sensorial: ${dificuldadesSensoriais.join(", ").toLowerCase()}.` : "",
      fatoresClinicos.length > 0 ? `Apresenta ${fatoresClinicos.join(", ").toLowerCase()}.` : "",
      hiperfoco ? `Hiperfoco em ${hiperfoco}.` : "",
    ];
    return partes.filter(Boolean).join(" ");
  }, [nivelSuporte, autonomia, comunicacao, interacaoSocial, fatoresDesregulacao, dificuldadesSensoriais, fatoresClinicos, hiperfoco]);

  function calcularIdade(dataNasc: string) {
    if (!dataNasc) return "";
    const [dia, mes, ano] = dataNasc.split("/");
    const nasc = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    if (hoje.getMonth() < nasc.getMonth() || (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  }

  async function handleSalvar() {
    try {
      await atualizarPaciente(id, {
        nome,
        nomeSocial,
        dataNascimento,
        cpf,
        nomeResponsavel,
        telefone,
        prontuario,
        cartaoSUS,
        especialidade,
        unidade,
        deficiencia,
        ...(temTEA && {
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
        }),
      });

      setSalvo(true);
      setTimeout(() => setSalvo(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar paciente. Tente novamente.");
    }
  }

  function imprimirPulseira() {
    const nivelLabel = nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacaoLabel = comunicacao === "verbal" ? "Verbal"
      : comunicacao === "nao_verbal" ? "Não verbal"
      : comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";
    const html = `<html><head><title>Pulseira</title>
      <style>body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
      .p{border:2px solid #333;padding:10px 20px;width:320px;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px}
      .l{font-weight:bold;font-size:15px}.r{text-align:right;color:#555}</style></head>
      <body><div class="p"><div class="l"><div>${nome}</div>
      <div style="font-weight:normal;font-size:12px;margin-top:4px">${nivelLabel}</div>
      <div style="font-weight:normal;font-size:12px">${calcularIdade(dataNascimento)} anos</div></div>
      <div class="r"><div>${comunicacaoLabel}</div><div>${dificuldadesSensoriais[0] || ""}</div></div></div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  function imprimirFolha() {
    const nivelLabel = nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacaoLabel = comunicacao === "verbal" ? "Verbal"
      : comunicacao === "nao_verbal" ? "Não verbal"
      : comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";
    const html = `<html><head><title>Folha</title>
      <style>body{font-family:Arial,sans-serif;margin:0;padding:0}
      .f{width:400px;margin:20px auto;border:2px solid #111;padding:16px;font-size:12px}
      .h{background:#111;color:white;text-align:center;padding:8px;font-weight:bold;font-size:14px;margin:-16px -16px 12px -16px}
      .n{font-size:22px;font-weight:bold;text-align:center;margin:8px 0}
      .l{font-weight:bold;font-size:11px;color:#333;margin-bottom:2px}.v{font-size:12px}
      .s{border-top:1px solid #ccc;padding-top:8px;margin-top:8px}
      .t{display:inline-block;background:#f0f0f0;border-radius:4px;padding:2px 6px;font-size:11px;margin:2px}
      .a{background:#111;color:white;padding:6px 10px;border-radius:4px;font-weight:bold;font-size:11px;margin-bottom:4px}
      .ft{text-align:center;font-size:10px;color:#888;margin-top:12px;border-top:1px solid #ccc;padding-top:8px}</style></head>
      <body><div class="f"><div class="h">HC — ALERTA DE CUIDADO SENSORIAL - TEA</div>
      <div class="n">${nome}</div>
      <div class="l">IDADE</div><div class="v">${calcularIdade(dataNascimento)} ANOS</div>
      <div class="s"><div class="l">PRONTUÁRIO</div><div class="v">${prontuario || "—"}</div></div>
      <div class="s"><div class="l">RESPONSÁVEL</div><div class="v">${nomeResponsavel || "—"}</div></div>
      <div class="s"><div class="l">NÍVEL DE SUPORTE</div><div class="v">${nivelLabel || "—"}</div></div>
      <div class="s"><div class="l">COMUNICAÇÃO</div><div class="v">${comunicacaoLabel || "—"}</div>
      ${comunicacaoAlternativa ? `<div class="v">Alternativa: ${comunicacaoAlternativa}</div>` : ""}</div>
      ${fatoresDesregulacao.length > 0 ? `<div class="s"><div class="a">GATILHOS (EVITAR)</div><div>${fatoresDesregulacao.map(f => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
      ${dificuldadesSensoriais.length > 0 ? `<div class="s"><div class="l">ALERTAS SENSORIAIS</div><div>${dificuldadesSensoriais.map(f => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
      ${hiperfoco ? `<div class="s"><div class="a">BOTÃO DE RESGATE</div><div class="v" style="margin-top:6px">Fale sobre: <strong>${hiperfoco.toUpperCase()}</strong></div></div>` : ""}
      <div class="ft">Emitido por: ${nomeUsuario}</div></div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  return {
    onVoltar: () => router.back(),
    onSalvar: handleSalvar,
    onImprimirPulseira: imprimirPulseira,
    onImprimirFolha: imprimirFolha,
    nomeUsuario,
    nome,
    nomeSocial,
    dataNascimento,
    cpf,
    nomeResponsavel,
    telefone,
    prontuario,
    cartaoSUS,
    especialidade,
    unidade,
    deficiencia,
    salvo,
    temTEA,
    resumoTexto,
    nivelSuporte,
    autonomia,
    comunicacao,
    comunicacaoAlternativa,
    interacaoSocial,
    fatoresDesregulacao,
    dificuldadesSensoriais,
    fatoresClinicos,
    hiperfoco,
    setNome,
    setNomeSocial,
    setDataNascimento,
    setCpf,
    setNomeResponsavel,
    setTelefone,
    setProntuario,
    setCartaoSUS,
    setEspecialidade,
    setUnidade,
    setDeficiencia,
    setNivelSuporte,
    setAutonomia,
    setComunicacao,
    setComunicacaoAlternativa,
    setHiperfoco,
    toggleInteracaoSocial: (item: string) => setInteracaoSocial((prev) => toggleInList(prev, item)),
    toggleFatoresDesregulacao: (item: string) => setFatoresDesregulacao((prev) => toggleInList(prev, item)),
    toggleDificuldadesSensoriais: (item: string) => setDificuldadesSensoriais((prev) => toggleInList(prev, item)),
    toggleFatoresClinicos: (item: string) => setFatoresClinicos((prev) => toggleInList(prev, item)),
  };
}
