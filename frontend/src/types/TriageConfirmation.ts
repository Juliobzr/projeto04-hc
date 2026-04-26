export type PatientTeaConfirmation = {
  nivelSuporte?: string;
  comunicacao?: string;
  comunicacaoAlternativa?: string;
  fatoresDesregulacao?: string[];
  dificuldadesSensoriais?: string[];
  hiperfoco?: string;
};

export type PatientConfirmation = {
  nome: string;
  dataNascimento: string;
  deficiencia?: string;
  prontuario?: string;
  nomeResponsavel?: string;
  tea?: PatientTeaConfirmation;
};

export type TriageConfirmationViewProps = {
  paciente: PatientConfirmation | null;
  onVoltar: () => void;
  onInicio: () => void;
  onImprimirPulseira: () => void;
  onImprimirFolha: () => void;
  calcularIdade: (dataNascimento: string) => number | "";
};
