import { z } from "zod";

function validarCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;

  for (let i = 0; i < 9; i++) {
    soma += Number(cpf[i]) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  if (resto !== Number(cpf[9])) return false;

  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  return resto === Number(cpf[10]);
}

export const pacienteSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve possuir pelo menos 3 caracteres"),
  cpf: z.string().refine(validarCPF, {
    message: "CPF inválido",
  }),
  dataNascimento: z
    .string()
    .min(10, "Data de nascimento inválida"),
});