export type LoginViewProps = {
  email: string;
  senha: string;
  erro: string;
  setEmail: (value: string) => void;
  setSenha: (value: string) => void;
  onSubmit: () => void;
};