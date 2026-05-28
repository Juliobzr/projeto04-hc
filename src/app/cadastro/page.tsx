"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SignUpView from "@/components/cadastro/SignUpView";
import { useSignUp } from "@/hooks/useSignUp";

export default function SignUpPage() {
  const props = useSignUp();

  const router = useRouter();

  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario_logado");

    if (!usuarioSalvo) {
      router.push("/login");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.role !== "GESTOR") {
      router.push("/inicio");
      return;
    }

    setAutorizado(true);
  }, [router]);

  if (!autorizado) {
    return null;
  }

  return <SignUpView {...props} />;
}