"use client";

import CadastroView from "@/components/cadastro/CadastroView";
import { useCadastro } from "@/hooks/useCadastro";

export default function CadastroPage() {
  const {
    email,
    senha,
    nome,
    erro,
    setEmail,
    setSenha,
    setNome,
    handleCadastro,
  } = useCadastro();

  return (
    <CadastroView
      email={email}
      senha={senha}
      nome={nome}
      erro={erro}
      setEmail={setEmail}
      setSenha={setSenha}
      setNome={setNome}
      onSubmit={handleCadastro}
    />
  );
}