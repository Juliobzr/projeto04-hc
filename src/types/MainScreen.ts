export type MainScreenViewProps = {
  buscaCpf: string;
  erro: string;
  onBuscaChange: (value: string) => void;
  onBuscar: () => void;
  onNovaTriagem: () => void;
};
