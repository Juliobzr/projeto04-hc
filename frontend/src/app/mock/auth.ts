import { User } from "@/types/User";

export async function getUsuarios(): Promise<User[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`
  );

  return res.json();
}

export async function cadastrar(usuario: User) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/cadastrar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    }
  );

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      error.erro || "Erro ao cadastrar usuário"
    );
  }

  return res.json();
}

export async function login(
  email: string,
  senha: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        senha
      })
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

  return data.usuario;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("usuario_logado");
    localStorage.removeItem("token");
  }
}