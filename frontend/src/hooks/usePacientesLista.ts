"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PacienteListaItem } from "@/types/PacientesLista";

const ITEMS_POR_PAGINA_OPCOES = [15, 25, 50];

export function usePacientesLista() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pacientes, setPacientes] = useState<PacienteListaItem[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [itensPorPagina, setItensPorPagina] = useState(15);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [menuAcaoAberto, setMenuAcaoAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("pacientes_mock") || "[]") as PacienteListaItem[];
    setPacientes(dados);
    const cpfParam = searchParams.get("cpf");
    if (cpfParam) setBusca(cpfParam);
  }, [searchParams]);

  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAcaoAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const pacientesFiltrados = pacientes.filter((p) =>
    busca === "" || p.cpf.replace(/\D/g, "").includes(busca.replace(/\D/g, ""))
  );

  const totalPaginas = Math.max(1, Math.ceil(pacientesFiltrados.length / itensPorPagina));
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const pacientesPagina = pacientesFiltrados.slice(inicio, inicio + itensPorPagina);

  function toggleSelecionado(id: string) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function toggleTodos() {
    if (selecionados.length === pacientesPagina.length) {
      setSelecionados([]);
    } else {
      setSelecionados(pacientesPagina.map((p) => p.id));
    }
  }

  function handleExcluirSelecionados() {
    if (selecionados.length === 0) return;
    const confirmado = window.confirm(`Deseja excluir ${selecionados.length} paciente(s) selecionado(s)?`);
    if (!confirmado) return;

    const atualizados = pacientes.filter((p) => !selecionados.includes(p.id));
    localStorage.setItem("pacientes_mock", JSON.stringify(atualizados));
    setPacientes(atualizados);
    setSelecionados([]);
    setMenuAcaoAberto(false);
  }

  function onBuscaChange(value: string) {
    setBusca(value);
    setPaginaAtual(1);
  }

  function onIrParaPaciente(id: string) {
    router.push(`/pacientes/${id}`);
  }

  function onItensPorPaginaChange(n: number) {
    setItensPorPagina(n);
    setPaginaAtual(1);
  }

  return {
    pacientesPagina,
    busca,
    selecionados,
    itensPorPagina,
    menuAcaoAberto,
    menuRef,
    paginaAtual,
    totalPaginas,
    inicio,
    pacientesFiltradosLength: pacientesFiltrados.length,
    itensPorPaginaOpcoes: ITEMS_POR_PAGINA_OPCOES,
    onBuscaChange,
    onToggleMenuAcao: () => setMenuAcaoAberto((prev) => !prev),
    onToggleSelecionado: toggleSelecionado,
    onToggleTodos: toggleTodos,
    onExcluirSelecionados: handleExcluirSelecionados,
    onIrParaPaciente,
    onItensPorPaginaChange,
    onPaginaAnterior: () => setPaginaAtual((p) => Math.max(1, p - 1)),
    onPaginaProxima: () => setPaginaAtual((p) => Math.min(totalPaginas, p + 1)),
  };
}
