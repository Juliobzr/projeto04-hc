"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { atualizarFuncionario, buscarFuncionario } from "@/services/users";
import { LoggedUser } from "@/types/User";

export function useFuncionarioProfile() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"FUNCIONARIO" | "GESTOR">("FUNCIONARIO");
  const [senha, setSenha] = useState("");
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const funcionario = await buscarFuncionario(id);
        setNome(funcionario.nome);
        setEmail(funcionario.email);
        setRole(funcionario.role);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar funcionário");
      }
    }

    const usuarioSalvo = localStorage.getItem("usuario_logado");
    if (!usuarioSalvo) {
      router.push("/login");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo) as LoggedUser;
    if (usuario.role !== "GESTOR") {
      router.push("/inicio");
      return;
    }

    carregar();
  }, [id, router]);

  async function onSalvar() {
    try {
      await atualizarFuncionario(id, {
        nome,
        email,
        role,
        ...(senha.trim() ? { senha } : {}),
      });

      setSenha("");
      setSalvo(true);
      setTimeout(() => setSalvo(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar funcionário");
    }
  }

  return {
    nome,
    email,
    role,
    senha,
    salvo,
    onVoltar: () => router.push("/admin"),
    onSalvar,
    setNome,
    setEmail,
    setRole,
    setSenha,
  };
}
