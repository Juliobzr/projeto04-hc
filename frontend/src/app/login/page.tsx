"use client";

import LoginView from "@/components/login/LoginView";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const {
    email,
    senha,
    erro,
    setEmail,
    setSenha,
    handleLogin,
  } = useLogin();

  return (
    <LoginView
      email={email}
      senha={senha}
      erro={erro}
      setEmail={setEmail}
      setSenha={setSenha}
      onSubmit={handleLogin}
    />
  );
}