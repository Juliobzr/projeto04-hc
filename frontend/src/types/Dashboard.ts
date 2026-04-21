export type DashboardViewProps = {
  buscaCpf: string;
  erro: string;
  onBuscaChange: (value: string) => void;
  onBuscar: () => void;
  onNovaTriagem: () => void;
};
