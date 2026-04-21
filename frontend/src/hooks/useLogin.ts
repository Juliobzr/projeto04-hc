"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/mock/auth";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  function handleLogin() {
    try {
      login(email, senha);
      router.push("/dashboard");
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