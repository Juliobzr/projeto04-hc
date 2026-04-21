export type PacienteConfirmacaoTea = {
  nivelSuporte?: string;
  comunicacao?: string;
  comunicacaoAlternativa?: string;
  fatoresDesregulacao?: string[];
  dificuldadesSensoriais?: string[];
  hiperfoco?: string;
};

export type PacienteConfirmacao = {
  nome: string;
  dataNascimento: string;
  deficiencia?: string;
  prontuario?: string;
  nomeResponsavel?: string;
  tea?: PacienteConfirmacaoTea;
};

export type ConfirmacaoTriagemViewProps = {
  paciente: PacienteConfirmacao | null;
  onVoltar: () => void;
  onInicio: () => void;
  onImprimirPulseira: () => void;
  onImprimirFolha: () => void;
  calcularIdade: (dataNascimento: string) => number | "";
};
