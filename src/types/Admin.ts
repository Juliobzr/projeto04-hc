import { Funcionario } from "@/services/users";

export type AdminViewProps = {
  funcionarios: Funcionario[];
  abertoId: string | null;
  onToggleDropdown: (id: string) => void;
  onAdicionar: () => void;
  onExibir: (funcionario: Funcionario) => void;
  onEditar: (funcionario: Funcionario) => void;
  onExcluir: (funcionario: Funcionario) => void;
};
