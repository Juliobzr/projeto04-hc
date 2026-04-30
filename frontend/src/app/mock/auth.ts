import { User } from "@/types/User";

export async function getUsuarios(): Promise<User[]> {
  const res = await fetch("http://localhost:3001/users");
  return res.json();
}

export async function cadastrar(usuario: User) {
  const res = await fetch("http://localhost:3001/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return res.json();
}

export async function login(email: string, senha: string) {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  });

  if (!res.ok) {
    throw new Error("Credenciais inválidas");
  }

  const user = await res.json();

  localStorage.setItem("usuario_logado", JSON.stringify(user));

  return user;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("usuario_logado");
  }
}