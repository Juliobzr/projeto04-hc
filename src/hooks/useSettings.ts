"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  buscarConfiguracoes,
  salvarConfiguracoes,
} from "@/services/users";

export function useSettings() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("Brasil");
  const [estado, setEstado] = useState("PE");
  const [foto, setFoto] = useState<string | null>(null);
  const [salvo, setSalvo] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (!usuarioString) {
      router.push("/login");
      return;
    }

    async function carregarConfiguracoes() {
      try {
        const config = await buscarConfiguracoes();
        const partes = (config.nome || "").split(" ");
        setPrimeiroNome(partes[0] || "");
        setUltimoNome(partes.slice(1).join(" ") || "");
        setEmail(config.email || "");
        if (config.numero) setNumero(config.numero);
        if (config.instituicao) setInstituicao(config.instituicao);
        if (config.cidade) setCidade(config.cidade);
        if (config.pais) setPais(config.pais);
        if (config.estado) setEstado(config.estado);
        if (config.foto) setFoto(config.foto);
      } catch (error) {
        console.error(error);
      }
    }

    carregarConfiguracoes();
  }, [router]);

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleAtualizar() {
    const nome = `${primeiroNome} ${ultimoNome}`.trim();

    try {
      await salvarConfiguracoes({
        nome,
        email,
        numero,
        instituicao,
        cidade,
        pais,
        estado,
        foto: foto ?? undefined,
      });

      const usuarioString = localStorage.getItem("usuario_logado");
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        usuario.nome = nome;
        usuario.email = email;
        localStorage.setItem("usuario_logado", JSON.stringify(usuario));
      }

      setSalvo(true);
      setTimeout(() => setSalvo(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar configurações. Tente novamente.");
    }
  }

  function onAbrirSeletorFoto() {
    fileInputRef.current?.click();
  }

  function onVoltar() {
    router.push("/inicio");
  }

  return {
    fileInputRef,
    primeiroNome,
    ultimoNome,
    email,
    numero,
    instituicao,
    cidade,
    pais,
    estado,
    foto,
    salvo,
    selected,
    setPrimeiroNome,
    setUltimoNome,
    setEmail,
    setNumero,
    setInstituicao,
    setCidade,
    setPais,
    setEstado,
    setFoto,
    onAbrirSeletorFoto,
    onAtualizar: handleAtualizar,
    onVoltar,
    setSelected,
    onFotoSelecionada: handleFoto,
  };
}
