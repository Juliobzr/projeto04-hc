import { Usuario } from "@/types/usuario";

const STORAGE_KEY = "usuarios_mock";
const USER_LOGADO_KEY = "usuario_logado";

export function getUsuarios(): Usuario[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsuarios(usuarios: Usuario[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

export function cadastrar(usuario: Usuario) {
  const usuarios = getUsuarios();

  const existe = usuarios.find((u) => u.email === usuario.email);
  if (existe) throw new Error("Usuário já existe");

  usuarios.push(usuario);
  saveUsuarios(usuarios);
}

export function login(email: string, senha: string) {
  const usuarios = getUsuarios();

  const user = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!user) throw new Error("Credenciais inválidas");

  // Salva a "sessão" do usuário atual no navegador usando a constante
  localStorage.setItem(USER_LOGADO_KEY, JSON.stringify(user));

  return user;
}
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("usuario_logado");
  }
}