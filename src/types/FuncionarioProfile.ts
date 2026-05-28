export type FuncionarioProfileViewProps = {
  nome: string;
  email: string;
  role: "FUNCIONARIO" | "GESTOR";
  senha: string;
  salvo: boolean;
  onVoltar: () => void;
  onSalvar: () => void;
  setNome: (value: string) => void;
  setEmail: (value: string) => void;
  setRole: (value: "FUNCIONARIO" | "GESTOR") => void;
  setSenha: (value: string) => void;
};
