"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PatientConfirmation } from "@/types/TriageConfirmation";
import { buscarPaciente } from "@/services/patients";

export function useTriageConfirmation() {
  const router = useRouter();
  const [paciente, setPaciente] = useState<PatientConfirmation | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (usuarioString) setNomeUsuario(JSON.parse(usuarioString).nome);

    async function carregarPaciente() {
      const idEmCadastro = localStorage.getItem("paciente_em_cadastro_id");
      if (!idEmCadastro) return;

      try {
        const dados = await buscarPaciente(idEmCadastro);
        setPaciente({
          nome: dados.nome,
          dataNascimento: dados.dataNascimento,
          deficiencia: dados.deficiencia,
          prontuario: dados.prontuario,
          nomeResponsavel: dados.nomeResponsavel,
          tea: dados.tea ?? undefined,
        });
      } catch (error) {
        console.error(error);
      }
    }

    carregarPaciente();
  }, []);

  function calcularIdade(dataNascimento: string) {
    if (!dataNascimento) return "" as const;
    const [dia, mes, ano] = dataNascimento.split("/");
    const nascimento = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    if (hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) idade--;
    return idade;
  }

  function imprimirPulseira() {
    if (!paciente) return;
    const idade = calcularIdade(paciente.dataNascimento);
    const nivelTEA = paciente.tea?.nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : paciente.tea?.nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : paciente.tea?.nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacao = paciente.tea?.comunicacao === "verbal" ? "Verbal"
      : paciente.tea?.comunicacao === "nao_verbal" ? "Não verbal"
      : paciente.tea?.comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";
    const sensorial = paciente.tea?.dificuldadesSensoriais?.[0] || "";

    const html = `<html><head><title>Pulseira</title>
      <style>
        body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
        .p{border:2px solid #333;padding:10px 20px;width:320px;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px}
        .l{font-weight:bold;font-size:15px}.r{text-align:right;color:#555}
      </style></head>
      <body><div class="p">
        <div class="l">
          <div>${paciente.nome}</div>
          <div style="font-weight:normal;font-size:12px;margin-top:4px">${nivelTEA}</div>
          <div style="font-weight:normal;font-size:12px">${idade} anos</div>
        </div>
        <div class="r"><div>${comunicacao}</div><div>${sensorial}</div></div>
      </div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  function imprimirFolha() {
    if (!paciente) return;
    const idade = calcularIdade(paciente.dataNascimento);
    const nivelTEA = paciente.tea?.nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : paciente.tea?.nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : paciente.tea?.nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacao = paciente.tea?.comunicacao === "verbal" ? "Verbal"
      : paciente.tea?.comunicacao === "nao_verbal" ? "Não verbal"
      : paciente.tea?.comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";

    const html = `<html><head><title>Folha</title>
      <style>
        body{font-family:Arial,sans-serif;margin:0;padding:0}
        .f{width:400px;margin:20px auto;border:2px solid #111;padding:16px;font-size:12px}
        .h{background:#111;color:white;text-align:center;padding:8px;font-weight:bold;font-size:14px;margin:-16px -16px 12px -16px}
        .n{font-size:22px;font-weight:bold;text-align:center;margin:8px 0}
        .l{font-weight:bold;font-size:11px;color:#333;margin-bottom:2px}.v{font-size:12px}
        .s{border-top:1px solid #ccc;padding-top:8px;margin-top:8px}
        .t{display:inline-block;background:#f0f0f0;border-radius:4px;padding:2px 6px;font-size:11px;margin:2px}
        .a{background:#111;color:white;padding:6px 10px;border-radius:4px;font-weight:bold;font-size:11px;margin-bottom:4px}
        .ft{text-align:center;font-size:10px;color:#888;margin-top:12px;border-top:1px solid #ccc;padding-top:8px}
      </style></head>
      <body><div class="f">
        <div class="h">HC — ALERTA DE CUIDADO SENSORIAL - TEA</div>
        <div class="n">${paciente.nome}</div>
        <div class="l">IDADE</div><div class="v">${idade} ANOS</div>
        <div class="s"><div class="l">PRONTUÁRIO</div><div class="v">${paciente.prontuario || "—"}</div></div>
        <div class="s"><div class="l">RESPONSÁVEL</div><div class="v">${paciente.nomeResponsavel || "—"}</div></div>
        <div class="s"><div class="l">NÍVEL DE SUPORTE</div><div class="v">${nivelTEA || "—"}</div></div>
        <div class="s"><div class="l">COMUNICAÇÃO</div><div class="v">${comunicacao || "—"}</div>
        ${paciente.tea?.comunicacaoAlternativa ? `<div class="v">Alternativa: ${paciente.tea.comunicacaoAlternativa}</div>` : ""}</div>
        ${paciente.tea?.fatoresDesregulacao && paciente.tea.fatoresDesregulacao.length > 0 ? `<div class="s"><div class="a">GATILHOS (EVITAR)</div><div>${paciente.tea.fatoresDesregulacao.map((f: string) => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
        ${paciente.tea?.dificuldadesSensoriais && paciente.tea.dificuldadesSensoriais.length > 0 ? `<div class="s"><div class="l">ALERTAS SENSORIAIS</div><div>${paciente.tea.dificuldadesSensoriais.map((f: string) => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
        ${paciente.tea?.hiperfoco ? `<div class="s"><div class="a">BOTÃO DE RESGATE</div><div class="v" style="margin-top:6px">Fale sobre: <strong>${paciente.tea.hiperfoco.toUpperCase()}</strong></div></div>` : ""}
        <div class="ft">Emitido por: ${nomeUsuario}</div>
      </div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  function handleInicio() {
    localStorage.removeItem("paciente_em_cadastro_id");
    router.push("/inicio");
  }

  return {
    paciente,
    onVoltar: () => router.back(),
    onInicio: handleInicio,
    onImprimirPulseira: imprimirPulseira,
    onImprimirFolha: imprimirFolha,
    calcularIdade,
  };
}
