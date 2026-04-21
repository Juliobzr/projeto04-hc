"use client";

import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { FiArrowLeft, FiGrid } from "react-icons/fi";
import { ConfirmacaoSimplesViewProps } from "@/types/ConfirmacaoSimples";

export default function ConfirmacaoSimplesView({ onVoltar, onInicio }: ConfirmacaoSimplesViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }}>
      <HStack w="fit-content" color="gray.600" mb={6} cursor="pointer"
        onClick={onVoltar} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={10} textAlign="center" mb={6}>
        <Box w="64px" h="64px" borderRadius="full" bg="green.500"
          display="flex" alignItems="center" justifyContent="center" mx="auto" mb={4}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16L12 22L26 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Box>
        <Text fontSize="2xl" fontWeight="700" color="green.500">Cadastro Finalizado!</Text>
      </Box>

      <Flex justify="center">
        <Box as="button" bg="blue.600" color="white" borderRadius="xl"
          py={4} px={16} fontWeight="600" fontSize="md" cursor="pointer"
          _hover={{ bg: "blue.700" }} display="flex" alignItems="center" gap={2}
          onClick={onInicio}>
          <FiGrid size={18} /> Início
        </Box>
      </Flex>
    </Box>
  );
}
