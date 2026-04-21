export type PacienteListaItem = {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  deficiencia: string;
  telefone: string;
};

export type PacientesListaViewProps = {
  pacientesPagina: PacienteListaItem[];
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
};
