export type CadastroViewProps = {
  email: string;
  senha: string;
  nome: string;
  erro: string;
  setEmail: (value: string) => void;
  setSenha: (value: string) => void;
  setNome: (value: string) => void;
  onSubmit: () => void;
};