type Endereco = {
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
}

type Paciente = {
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

export type { Endereco, Paciente }