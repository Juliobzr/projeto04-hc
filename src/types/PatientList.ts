export type PatientListItem = {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  deficiencia: string;
  telefone: string;
};

export type PatientListViewProps = {
  pacientesPagina: PatientListItem[];
  busca: string;
  selecionados: string[];
  itensPorPagina: number;
  itensPorPaginaOpcoes: number[];
  menuAcaoAberto: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  paginaAtual: number;
  totalPaginas: number;
  inicio: number;
  pacientesFiltradosLength: number;
  onBuscaChange: (value: string) => void;
  onToggleMenuAcao: () => void;
  onToggleSelecionado: (id: string) => void;
  onToggleTodos: () => void;
  onExcluirSelecionados: () => void;
  onIrParaPaciente: (id: string) => void;
  onItensPorPaginaChange: (n: number) => void;
  onPaginaAnterior: () => void;
  onPaginaProxima: () => void;
  menuPacienteAbertoId: string | null;
  onToggleMenuPaciente: (id: string) => void;
  onExibirPaciente: (id: string) => void;
  onEditarPaciente: (id: string) => void;
  onExcluirPaciente: (id: string) => void;
};
