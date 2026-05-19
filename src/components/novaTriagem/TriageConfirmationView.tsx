"use client";

import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { FiArrowLeft, FiPrinter } from "react-icons/fi";
import { TriageConfirmationViewProps } from "@/types/TriageConfirmation";

export default function riageConfirmationView({
  paciente,
  onVoltar,
  onInicio,
  onImprimirPulseira,
  onImprimirFolha,
  calcularIdade,
}: TriageConfirmationViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }}>
      <HStack w="fit-content" color="gray.600" mb={6} cursor="pointer"
        onClick={onVoltar} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 6, md: 10 }} textAlign="center" mb={6}>
        <Box w="64px" h="64px" borderRadius="full" bg="green.500"
          display="flex" alignItems="center" justifyContent="center" mx="auto" mb={4}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16L12 22L26 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Box>
        <Text fontSize="2xl" fontWeight="700" color="green.500">Cadastro Finalizado!</Text>
      </Box>

      <Flex gap={6} mb={6} direction={{ base: "column", md: "row" }}>

        <Box flex={1} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 6 }}>
          <Text fontWeight="600" fontSize="md" color="gray.800" mb={6}>1. Visualizar Pulseira de Indentificação</Text>
          {paciente && (
            <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={4} mb={6}>
              <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
                <Box>
                  <Text fontWeight="700" fontSize="md" color="gray.800">{paciente.nome}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {paciente.tea?.nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
                      : paciente.tea?.nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
                      : paciente.tea?.nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo"
                      : paciente.deficiencia}
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="sm" color="gray.600">
                    {paciente.tea?.comunicacao === "verbal" ? "Verbal"
                      : paciente.tea?.comunicacao === "nao_verbal" ? "Não verbal"
                      : paciente.tea?.comunicacao === "verbal_suporte" ? "Verbal com suporte" : "—"}
                  </Text>
                  <Text fontSize="sm" color="gray.600">{paciente.tea?.dificuldadesSensoriais?.[0] || "—"}</Text>
                </Box>
              </Flex>
            </Box>
          )}
          <Box as="button" w="full" bg="blue.600" color="white" borderRadius="lg"
            py={3} fontWeight="600" fontSize="sm" cursor="pointer"
            _hover={{ bg: "blue.700" }} display="flex" alignItems="center" justifyContent="center" gap={2}
            onClick={onImprimirPulseira}>
            <FiPrinter size={16} /> Imprimir Pulseira
          </Box>
        </Box>

        <Box flex={1} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 6 }}>
          <Text fontWeight="600" fontSize="md" color="gray.800" mb={6}>1. Visualizar Folha de Indentificação</Text>
          {paciente && (
            <Box border="2px solid" borderColor="gray.800" borderRadius="md" p={3} mb={6} fontSize="xs">
              <Box bg="gray.800" color="white" textAlign="center" py={1} px={2} fontWeight="bold" fontSize="11px" mx={-3} mt={-3} mb={2}>
                HC — ALERTA DE CUIDADO SENSORIAL - TEA
              </Box>
              <Text fontWeight="700" fontSize="sm" textAlign="center">{paciente.nome}</Text>
              <Text textAlign="center" fontSize="11px" color="gray.600">{calcularIdade(paciente.dataNascimento)} anos</Text>
              <Text fontSize="11px" mt={1}><strong>Responsável:</strong> {paciente.nomeResponsavel || "—"}</Text>
              <Text fontSize="11px"><strong>Prontuário:</strong> {paciente.prontuario || "—"}</Text>
              {paciente.tea?.hiperfoco && (
                <Text fontSize="11px" mt={1}><strong>Hiperfoco:</strong> {paciente.tea.hiperfoco}</Text>
              )}
            </Box>
          )}
          <Box as="button" w="full" bg="blue.600" color="white" borderRadius="lg"
            py={3} fontWeight="600" fontSize="sm" cursor="pointer"
            _hover={{ bg: "blue.700" }} display="flex" alignItems="center" justifyContent="center" gap={2}
            onClick={onImprimirFolha}>
            <FiPrinter size={16} /> Imprimir Folha
          </Box>
        </Box>
      </Flex>

      <Flex justify="center">
        <Box as="button" bg="blue.600" color="white" borderRadius="xl"
          py={4} px={{ base: 8, md: 16 }} w={{ base: "100%", sm: "auto" }} fontWeight="600" fontSize="md" cursor="pointer"
          _hover={{ bg: "blue.700" }} display="flex" alignItems="center" gap={2}
          onClick={onInicio}>
          Início
        </Box>
      </Flex>
    </Box>
  );
}
