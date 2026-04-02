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


  localStorage.setItem(USER_LOGADO_KEY, JSON.stringify(user));

  return user;
}

export function logout() {
  localStorage.removeItem(USER_LOGADO_KEY);
}

export function getUsuarioLogado(): Usuario | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(USER_LOGADO_KEY);
  return data ? JSON.parse(data) : null;
}