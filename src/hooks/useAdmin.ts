"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Funcionario,
  excluirFuncionario,
  listarFuncionarios,
} from "@/services/users";
import { LoggedUser } from "@/types/User";

export function useAdmin() {
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [abertoId, setAbertoId] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await listarFuncionarios();
        setFuncionarios(lista);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar funcionários");
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
  }, [router]);

  function onToggleDropdown(id: string) {
    setAbertoId((prev) => (prev === id ? null : id));
  }

  function onAdicionar() {
    router.push("/cadastro");
  }

  function onExibir(funcionario: Funcionario) {
    alert(
      `Nome: ${funcionario.nome}\nEmail: ${funcionario.email}\nPerfil: ${funcionario.role}`
    );
    setAbertoId(null);
  }

  function onEditar(funcionario: Funcionario) {
    router.push(`/admin/${funcionario.id}`);
  }

  async function onExcluir(funcionario: Funcionario) {
    const confirmado = window.confirm(
      `Deseja excluir o funcionário ${funcionario.nome}?`
    );

    if (!confirmado) return;

    try {
      await excluirFuncionario(funcionario.id);
      setFuncionarios((prev) => prev.filter((item) => item.id !== funcionario.id));
      setAbertoId(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir funcionário");
    }
  }

  return {
    funcionarios,
    abertoId,
    onToggleDropdown,
    onAdicionar,
    onExibir,
    onEditar,
    onExcluir,
  };
}
