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
