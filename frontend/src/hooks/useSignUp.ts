"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrar } from "@/app/mock/auth";

export function useSignUp() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [erro, setErro] = useState("");
    const router = useRouter();

    function handleCadastro() {
    try {
      if (!email || !senha || !nome) {
        setErro("Preencha todos os campos");
        return;
      }
      cadastrar({ email, senha, nome });
      alert("Usuário cadastrado com sucesso!");
      router.push("/login");

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