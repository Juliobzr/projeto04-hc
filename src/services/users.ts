import { apiFetch } from "@/lib/apiClient";

export type ConfiguracoesUsuario = {
  nome?: string;
  email?: string;
  numero?: string;
  instituicao?: string;
  cidade?: string;
  pais?: string;
  estado?: string;
  foto?: string;
};

export type Funcionario = {
  id: string;
  nome: string;
  email: string;
  role: "FUNCIONARIO" | "GESTOR";
  criadoEm: string;
};

export async function buscarConfiguracoes() {
  const res = await apiFetch("/api/usuarios/configuracoes");

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao buscar configurações");
  }

  return data as ConfiguracoesUsuario;
}

export async function salvarConfiguracoes(
  configuracoes: ConfiguracoesUsuario
) {
  const res = await apiFetch("/api/usuarios/configuracoes", {
    method: "PUT",
    body: JSON.stringify(configuracoes),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao salvar configurações");
  }

  return data;
}

export async function listarFuncionarios() {
  const res = await apiFetch("/api/usuarios/funcionarios");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao listar funcionários");
  }

  return data as Funcionario[];
}

export async function buscarFuncionario(id: string) {
  const res = await apiFetch(`/api/usuarios/funcionarios/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao buscar funcionário");
  }

  return data as Funcionario;
}

export async function atualizarFuncionario(
  id: string,
  payload: Partial<Pick<Funcionario, "nome" | "email" | "role">> & { senha?: string }
) {
  const res = await apiFetch(`/api/usuarios/funcionarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao atualizar funcionário");
  }

  return data as Funcionario;
}

export async function excluirFuncionario(id: string) {
  const res = await apiFetch(`/api/usuarios/funcionarios/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.erro || "Erro ao excluir funcionário");
  }
}
