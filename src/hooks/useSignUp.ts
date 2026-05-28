"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrar } from "@/services/auth";

export function useSignUp() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [erro, setErro] = useState("");
    const router = useRouter();

    async function handleCadastro() {
    try {
      if (!email || !senha || !nome) {
        setErro("Preencha todos os campos");
        return;
      }
      await cadastrar({ email, senha, nome, role: "FUNCIONARIO" });
      alert("Funcionário cadastrado com sucesso!");
      router.push("/admin");

    } catch (e: any) {
      setErro(e.message);
    }
  }

  return{  
    email,
    senha,
    nome,
    erro,
    setEmail,
    setSenha,
    setNome,
    onSubmit: handleCadastro
  }
}