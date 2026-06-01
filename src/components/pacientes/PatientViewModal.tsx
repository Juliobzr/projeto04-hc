"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { FiX, FiPrinter } from "react-icons/fi";
import { buscarPaciente } from "@/services/patients";

type PatientData = {
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  cpf: string;
  nomeResponsavel: string;
  telefone: string;
  prontuario: string;
  cartaoSUS: string;
  especialidade: string;
  unidade: string;
  deficiencia: string;
  relatorioIA?: string;
  tea?: {
    nivelSuporte: string;
    autonomia: string;
    comunicacao: string;
    comunicacaoAlternativa: string;
    interacaoSocial: string[];
    fatoresDesregulacao: string[];
    dificuldadesSensoriais: string[];
    fatoresClinicos: string[];
    hiperfoco: string;
  };
};

function DisplayField({ label, value }: { label: string; value: string | string[] }) {
  const displayValue = Array.isArray(value) ? (value.length > 0 ? value.join(", ") : "Não informado") : (value || "Não informado");

  return (
    <Box borderBottom="1px solid" borderColor="gray.200" pb={3}>
      <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1} textTransform="uppercase">
        {label}
      </Text>
      <Text fontSize="sm" color={displayValue === "Não informado" ? "gray.400" : "gray.800"}>
        {displayValue}
      </Text>
    </Box>
  );
}

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <Box mb={6} pageBreakInside="avoid" _print={{ pageBreakInside: "avoid" }}>
      <Text fontWeight="700" fontSize="md" color="gray.800" mb={3}>
        {number}. {title}
      </Text>
      <VStack align="stretch" gap={3} pl={4}>
        {children}
      </VStack>
    </Box>
  );
}

export default function PatientViewModal({ isOpen, pacienteId, onClose }: { isOpen: boolean; pacienteId: string | null; onClose: () => void }) {
  const [paciente, setPaciente] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && pacienteId) {
      setLoading(true);
      buscarPaciente(pacienteId)
        .then(setPaciente)
        .finally(() => setLoading(false));
    }
  }, [isOpen, pacienteId]);

  function calcularIdade(dataNasc: string) {
    if (!dataNasc) return "";
    const [dia, mes, ano] = dataNasc.split("/");
    const nasc = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    if (hoje.getMonth() < nasc.getMonth() || (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  }

  function handlePrint() {
    if (!paciente) return;
    const nomeUsuario = localStorage.getItem("usuario_logado") ? JSON.parse(localStorage.getItem("usuario_logado")!).nome : "Sistema";
    const teaData = paciente.tea;

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Prontuário - ${paciente.nome}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #1f2937; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    .header { background: #111827; color: white; padding: 24px; border-radius: 8px; margin-bottom: 30px; }
    .header h1 { font-size: 28px; margin-bottom: 8px; }
    .header p { opacity: 0.9; }
    .section { margin-bottom: 30px; page-break-inside: avoid; }
    .section-title { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
    .field { margin-bottom: 12px; }
    .field-label { font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 4px; }
    .field-value { font-size: 14px; color: #374151; }
    .field-value.empty { color: #9ca3af; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .grid-full { grid-column: 1 / -1; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag { background: #eff6ff; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
    .footer { border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 16px; font-size: 11px; color: #6b7280; text-align: center; }
    .section-num { font-size: 14px; font-weight: 700; margin-bottom: 12px; color: #111827; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${paciente.nome}</h1>
      <p>Visualização de Dados do Paciente - Emitido em ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>

    <div class="section">
      <div class="section-title">1. Dados Pessoais</div>
      <div class="grid">
        <div class="field">
          <div class="field-label">Nome Completo</div>
          <div class="field-value">${paciente.nome || 'Não informado'}</div>
        </div>
        <div class="field">
          <div class="field-label">Nome Social</div>
          <div class="field-value ${!paciente.nomeSocial ? 'empty' : ''}">${paciente.nomeSocial || 'Não informado'}</div>
        </div>
        <div class="field">
          <div class="field-label">Data de Nascimento</div>
          <div class="field-value">${paciente.dataNascimento || 'Não informado'} (${calcularIdade(paciente.dataNascimento)} anos)</div>
        </div>
        <div class="field">
          <div class="field-label">CPF</div>
          <div class="field-value ${!paciente.cpf ? 'empty' : ''}">${paciente.cpf || 'Não informado'}</div>
        </div>
        <div class="field grid-full">
          <div class="field-label">Necessidade Especial</div>
          <div class="field-value">${paciente.deficiencia && paciente.deficiencia !== 'Não' ? paciente.deficiencia : 'Não informado'}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">2. Dados de Contato</div>
      <div class="grid">
        <div class="field">
          <div class="field-label">Telefone</div>
          <div class="field-value ${!paciente.telefone ? 'empty' : ''}">${paciente.telefone || 'Não informado'}</div>
        </div>
        <div class="field">
          <div class="field-label">Nome do Responsável</div>
          <div class="field-value ${!paciente.nomeResponsavel ? 'empty' : ''}">${paciente.nomeResponsavel || 'Não informado'}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">3. Dados Médicos</div>
      <div class="grid">
        <div class="field">
          <div class="field-label">Prontuário</div>
          <div class="field-value ${!paciente.prontuario ? 'empty' : ''}">${paciente.prontuario || 'Não informado'}</div>
        </div>
        <div class="field">
          <div class="field-label">Cartão SUS</div>
          <div class="field-value ${!paciente.cartaoSUS ? 'empty' : ''}">${paciente.cartaoSUS || 'Não informado'}</div>
        </div>
        <div class="field">
          <div class="field-label">Especialidade/Agenda</div>
          <div class="field-value ${!paciente.especialidade ? 'empty' : ''}">${paciente.especialidade || 'Não informado'}</div>
        </div>
        <div class="field">
          <div class="field-label">Unidade</div>
          <div class="field-value ${!paciente.unidade ? 'empty' : ''}">${paciente.unidade || 'Não informado'}</div>
        </div>
      </div>
    </div>

    ${teaData ? `
    <div class="section">
      <div class="section-title">4. Perfil Geral (TEA)</div>
      <div class="grid">
        <div class="field">
          <div class="field-label">Nível de Suporte</div>
          <div class="field-value">${teaData.nivelSuporte || 'Não informado'}</div>
        </div>
        <div class="field">
          <div class="field-label">Autonomia</div>
          <div class="field-value">${teaData.autonomia || 'Não informado'}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">5. Comunicação e Interação</div>
      <div class="field">
        <div class="field-label">Comunicação</div>
        <div class="field-value">${teaData.comunicacao || 'Não informado'}</div>
      </div>
      <div class="field">
        <div class="field-label">Comunicação Alternativa</div>
        <div class="field-value ${!teaData.comunicacaoAlternativa ? 'empty' : ''}">${teaData.comunicacaoAlternativa || 'Não informado'}</div>
      </div>
      <div class="field">
        <div class="field-label">Interação Social</div>
        <div class="field-value">
          ${teaData.interacaoSocial.length > 0 ? `<div class="tags">${teaData.interacaoSocial.map((item) => `<span class="tag">${item}</span>`).join('')}</div>` : '<div class="empty">Não informado</div>'}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">6. Alertas Sensoriais e Regulação</div>
      <div class="field">
        <div class="field-label">Fatores de Desregulação</div>
        <div class="field-value">
          ${teaData.fatoresDesregulacao.length > 0 ? `<div class="tags">${teaData.fatoresDesregulacao.map((item) => `<span class="tag">${item}</span>`).join('')}</div>` : '<div class="empty">Não informado</div>'}
        </div>
      </div>
      <div class="field">
        <div class="field-label">Dificuldades Sensoriais</div>
        <div class="field-value">
          ${teaData.dificuldadesSensoriais.length > 0 ? `<div class="tags">${teaData.dificuldadesSensoriais.map((item) => `<span class="tag">${item}</span>`).join('')}</div>` : '<div class="empty">Não informado</div>'}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">7. Comportamento e Fatores Clínicos</div>
      <div class="field">
        <div class="field-label">Fatores Clínicos</div>
        <div class="field-value">
          ${teaData.fatoresClinicos.length > 0 ? `<div class="tags">${teaData.fatoresClinicos.map((item) => `<span class="tag">${item}</span>`).join('')}</div>` : '<div class="empty">Não informado</div>'}
        </div>
      </div>
      <div class="field">
        <div class="field-label">Hiperfoco</div>
        <div class="field-value ${!teaData.hiperfoco ? 'empty' : ''}">${teaData.hiperfoco || 'Não informado'}</div>
      </div>
    </div>

    ${paciente.relatorioIA ? `
    <div class="section">
      <div class="section-title">8. Relatório da IA</div>
      <div class="field">
        <div class="field-value" style="white-space: pre-wrap; font-size: 13px; line-height: 1.6;">${paciente.relatorioIA}</div>
      </div>
    </div>
    ` : ''}
    ` : ''}

    <div class="footer">
      <p>Emitido por: ${nomeUsuario} | Data: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}</p>
    </div>
  </div>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.print();
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={3000}
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="xl"
        maxW="700px"
        maxH="90vh"
        overflow="auto"
        w={{ base: "95%", md: "90%" }}
        onClick={(e) => e.stopPropagation()}
        boxShadow="xl"
      >
        <Flex
          align="center"
          justify="space-between"
          position="sticky"
          top={0}
          bg="gray.50"
          borderBottom="1px solid"
          borderColor="gray.200"
          p={4}
          zIndex={10}
        >
          <Text fontWeight="600" color="gray.800">
            {loading ? "Carregando..." : paciente?.nome || "Dados do Paciente"}
          </Text>
          <HStack gap={2}>
            {!loading && paciente && (
              <Box
                as="button"
                display="flex"
                alignItems="center"
                gap={2}
                px={3}
                py={2}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                bg="white"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={handlePrint}
              >
                <FiPrinter size={16} />
                <Text fontSize="sm" fontWeight="500">
                  Imprimir
                </Text>
              </Box>
            )}
            <Box
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="32px"
              h="32px"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              bg="white"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={onClose}
            >
              <FiX size={18} />
            </Box>
          </HStack>
        </Flex>

        <Box p={{ base: 4, md: 6 }}>
          {loading ? (
            <Text textAlign="center" color="gray.500">
              Carregando informações do paciente...
            </Text>
          ) : paciente ? (
            <VStack align="stretch" gap={6}>
              <Section number={1} title="Dados Pessoais">
                <DisplayField label="Nome Completo" value={paciente.nome} />
                <DisplayField label="Nome Social" value={paciente.nomeSocial} />
                <DisplayField label="Data de Nascimento" value={paciente.dataNascimento} />
                <DisplayField label="Idade" value={`${calcularIdade(paciente.dataNascimento)} anos`} />
                <DisplayField label="CPF" value={paciente.cpf} />
                <DisplayField label="Necessidade Especial" value={paciente.deficiencia && paciente.deficiencia !== "Não" ? paciente.deficiencia : "Não informado"} />
              </Section>

              <Section number={2} title="Dados de Contato">
                <DisplayField label="Telefone" value={paciente.telefone} />
                <DisplayField label="Nome do Responsável" value={paciente.nomeResponsavel} />
              </Section>

              <Section number={3} title="Dados Médicos">
                <DisplayField label="Prontuário" value={paciente.prontuario} />
                <DisplayField label="Cartão SUS" value={paciente.cartaoSUS} />
                <DisplayField label="Especialidade/Agenda" value={paciente.especialidade} />
                <DisplayField label="Unidade" value={paciente.unidade} />
              </Section>

              {paciente.tea && (
                <>
                  <Section number={4} title="Perfil Geral (TEA)">
                    <DisplayField label="Nível de Suporte" value={paciente.tea.nivelSuporte} />
                    <DisplayField label="Autonomia" value={paciente.tea.autonomia} />
                  </Section>

                  <Section number={5} title="Comunicação e Interação">
                    <DisplayField label="Comunicação" value={paciente.tea.comunicacao} />
                    <DisplayField label="Comunicação Alternativa" value={paciente.tea.comunicacaoAlternativa} />
                    <DisplayField label="Interação Social" value={paciente.tea.interacaoSocial} />
                  </Section>

                  <Section number={6} title="Alertas Sensoriais e Regulação">
                    <DisplayField label="Fatores de Desregulação" value={paciente.tea.fatoresDesregulacao} />
                    <DisplayField label="Dificuldades Sensoriais" value={paciente.tea.dificuldadesSensoriais} />
                  </Section>

                  <Section number={7} title="Comportamento e Fatores Clínicos">
                    <DisplayField label="Fatores Clínicos" value={paciente.tea.fatoresClinicos} />
                    <DisplayField label="Hiperfoco" value={paciente.tea.hiperfoco} />
                  </Section>

                  {paciente.relatorioIA && (
                    <Section number={8} title="Relatório da IA">
                      <Box
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        p={4}
                        bg="gray.50"
                      >
                        <Text fontSize="sm" color="gray.700" lineHeight="1.6" whiteSpace="pre-wrap">
                          {paciente.relatorioIA}
                        </Text>
                      </Box>
                    </Section>
                  )}
                </>
              )}
            </VStack>
          ) : null}
        </Box>
      </Box>
    </Box>,
    document.body
  );
}
