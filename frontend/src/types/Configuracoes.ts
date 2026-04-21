import type { RefObject } from "react";

export type ConfiguracoesViewProps = {
  fileInputRef: RefObject<HTMLInputElement | null>;
  primeiroNome: string;
  ultimoNome: string;
  email: string;
  numero: string;
  instituicao: string;
  cidade: string;
  pais: string;
  estado: string;
  foto: string | null;
  salvo: boolean;
  setPrimeiroNome: (v: string) => void;
  setUltimoNome: (v: string) => void;
  setEmail: (v: string) => void;
  setNumero: (v: string) => void;
  setInstituicao: (v: string) => void;
  setCidade: (v: string) => void;
  setPais: (v: string) => void;
  setEstado: (v: string) => void;
  setFoto: (v: string | null) => void;
  onAbrirSeletorFoto: () => void;
  onAtualizar: () => void;
  onVoltar: () => void;
  onFotoSelecionada: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
