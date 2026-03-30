export interface Endereco {
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
}

export interface Paciente {
  id: string
  nomeCompleto: string
  nomeSocial?: string
  cpf: string
  dataNascimento: string
  telefone: string
  endereco: Endereco
  nomeResponsavel?: string
  prontuario?: string
  cartaoSUS?: string
  especialidade: string
  unidade: string
  criadoEm: string
}

export type CadastrarPacienteDTO = Omit<Paciente, 'id' | 'criadoEm'>