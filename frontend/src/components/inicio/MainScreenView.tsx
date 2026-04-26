"use client";

import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import ActionCard from "@/components/ui/layout/Card";
import InputText from "@/components/ui/layout/InputText";
import { MainScreenViewProps } from "@/types/MainScreen";

export default function MainScreenView({
  buscaCpf,
  erro,
  onBuscaChange,
  onBuscar,
  onNovaTriagem,
}: MainScreenViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }} maxW="1000px">
      <Text fontSize="md" fontWeight="bold" color="gray.800" mb={6}>
        Ações Rápidas
      </Text>

      <Flex gap={6} direction={{ base: "column", xl: "row" }} align="flex-start">
        <Flex
          as="button"
          w={{ base: "100%", xl: "340px" }}
          bg="blue.500" color="white" p={6} borderRadius="xl"
          align="center" justify="flex-start" gap={4}
          _hover={{ bg: "blue.600" }} transition="all 0.2s" boxShadow="sm"
          onClick={onNovaTriagem}
        >
          <FiPlus size={32} />
          <Box textAlign="left">
            <Text fontSize="lg" fontWeight="bold">Iniciar Nova Triagem</Text>
            <Text fontSize="sm" opacity={0.9}>Dados novo paciente</Text>
          </Box>
        </Flex>

        <Box w={{ base: "100%", xl: "420px" }}>
          <ActionCard>
            <Flex direction="column" gap={5}>
              <HStack gap={3}>
                <FiSearch size={22} color="#4A5568" />
                <Box>
                  <Text fontSize="md" fontWeight="bold" color="gray.800">Buscar Paciente</Text>
                  <Text fontSize="sm" color="gray.500">Buscar imediato por CPF</Text>
                </Box>
              </HStack>
              <InputText
                placeholder="Digite o CPF" value={buscaCpf}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onBuscaChange(e.target.value)}
              />
              {erro && <Text fontSize="sm" color="red.500">{erro}</Text>}
              <Flex
                as="button" bg="blue.500" color="white" borderRadius="lg"
                py={2} px={4} fontWeight="600" fontSize="sm" cursor="pointer"
                _hover={{ bg: "blue.600" }} justify="center" align="center"
                onClick={onBuscar}
              >
                Buscar
              </Flex>
            </Flex>
          </ActionCard>
        </Box>
      </Flex>
    </Box>
  );
}
