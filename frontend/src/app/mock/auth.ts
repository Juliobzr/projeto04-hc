import { Usuario } from "@/types/usuario";

const STORAGE_KEY = "usuarios_mock";

export function getUsuarios(): Usuario[] {
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

  return user;
}