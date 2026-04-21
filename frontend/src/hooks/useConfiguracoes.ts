"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useConfiguracoes() {
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

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      const partes = (usuario.nome || "").split(" ");
      setPrimeiroNome(partes[0] || "");
      setUltimoNome(partes.slice(1).join(" ") || "");
      setEmail(usuario.email || "");
    } else {
      router.push("/login");
    }

    const config = JSON.parse(localStorage.getItem("configuracoes_usuario") || "{}");
    if (config.numero) setNumero(config.numero);
    if (config.instituicao) setInstituicao(config.instituicao);
    if (config.cidade) setCidade(config.cidade);
    if (config.pais) setPais(config.pais);
    if (config.estado) setEstado(config.estado);
    if (config.foto) setFoto(config.foto);
  }, [router]);

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleAtualizar() {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      usuario.nome = `${primeiroNome} ${ultimoNome}`.trim();
      usuario.email = email;
      localStorage.setItem("usuario_logado", JSON.stringify(usuario));
    }

    localStorage.setItem("configuracoes_usuario", JSON.stringify({
      numero, instituicao, cidade, pais, estado, foto,
    }));

    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  }

  function onAbrirSeletorFoto() {
    fileInputRef.current?.click();
  }

  function onVoltar() {
    router.push("/dashboard");
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
    onFotoSelecionada: handleFoto,
  };
}
