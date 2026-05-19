"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  async function handleLogin() {
    try {
      await login(email, senha);
      router.push("/inicio");
    } catch (e: any) {
      setErro(e.message);
    }
  }
  
  return {
    email,
    senha,
    erro,
    setEmail,
    setSenha,
    onSubmit: handleLogin,
  };
}