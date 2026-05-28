import { apiFetch } from "@/lib/apiClient";
import { LoggedUser, User } from "@/types/User";

export async function cadastrar(usuario: User) {
  const res = await apiFetch(
    "/api/auth/cadastrar",
    {
      method: "POST",
      body: JSON.stringify(usuario),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.erro || "Erro ao cadastrar usuário"
    );
  }

  return data;
}

export async function login(
  email: string,
  senha: string
) {
  const res = await apiFetch(
    "/api/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        senha,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.erro || "Credenciais inválidas"
    );
  }

  localStorage.setItem("token", data.token);

  localStorage.setItem(
    "usuario_logado",
    JSON.stringify(data.usuario)
  );

  return data.usuario as LoggedUser;
}

export function logout() {
  localStorage.removeItem("token");

  localStorage.removeItem(
    "usuario_logado"
  );

  window.location.href = "/login";
}