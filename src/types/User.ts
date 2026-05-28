type User = {
  nome: string;
  email: string;
  senha: string;
  role?: "FUNCIONARIO" | "GESTOR";
};

export type LoggedUser = {
  id: string;
  nome: string;
  email: string;
  role: "FUNCIONARIO" | "GESTOR";
};

export type { User };