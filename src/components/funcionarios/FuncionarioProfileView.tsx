"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { FuncionarioProfileViewProps } from "@/types/FuncionarioProfile";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  background: "white",
  color: "#374151",
  boxSizing: "border-box",
};

function Campo({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <Box>
      <Text fontWeight="600" fontSize="sm" color="gray.700" mb={1}>
        {label}
      </Text>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        type={type}
        style={inputStyle}
      />
    </Box>
  );
}

export default function FuncionarioProfileView({
  nome,
  email,
  role,
  senha,
  salvo,
  onVoltar,
  onSalvar,
  setNome,
  setEmail,
  setRole,
  setSenha,
}: FuncionarioProfileViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }}>
      <HStack
        w="fit-content"
        color="gray.600"
        mb={4}
        cursor="pointer"
        onClick={onVoltar}
        _hover={{ color: "blue.500" }}
      >
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">
          Voltar
        </Text>
      </HStack>

      <VStack gap={4} align="stretch" maxW="800px">
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.100"
          p={{ base: 4, md: 8 }}
        >
          <VStack gap={5} align="stretch">
            <Campo label="Nome" value={nome} onChange={setNome} />
            <Campo label="E-mail" value={email} onChange={setEmail} />

            <Box>
              <Text fontWeight="600" fontSize="sm" color="gray.700" mb={1}>
                Perfil
              </Text>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "FUNCIONARIO" | "GESTOR")}
                style={inputStyle}
              >
                <option value="FUNCIONARIO">FUNCIONARIO</option>
                <option value="GESTOR">GESTOR</option>
              </select>
            </Box>

            <Campo
              label="Nova senha (opcional)"
              value={senha}
              onChange={setSenha}
              type="password"
            />
          </VStack>
        </Box>

        <Box display="flex" justifyContent="center" mb={4}>
          <Box
            as="button"
            bg={salvo ? "green.500" : "blue.600"}
            color="white"
            borderRadius="xl"
            py={3}
            px={12}
            fontWeight="600"
            fontSize="md"
            cursor="pointer"
            _hover={{ bg: salvo ? "green.600" : "blue.700" }}
            onClick={onSalvar}
          >
            {salvo ? "Salvo!" : "Salvar"}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
