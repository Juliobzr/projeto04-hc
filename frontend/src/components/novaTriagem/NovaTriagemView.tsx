"use client";

import { Box, Flex, Text, VStack, HStack, SimpleGrid, Button } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import InputText from "@/components/ui/layout/InputText";
import { NovaTriagemViewProps } from "@/types/NovaTriagem";

export default function NovaTriagemView({
  possuiDeficiencia,
  tipoDeficiencia,
  nomeCompleto,
  nomeSocial,
  dataNascimento,
  cpf,
  telefone,
  nomeResponsavel,
  prontuario,
  cartaoSUS,
  especialidade,
  unidade,
  setPossuiDeficiencia,
  setTipoDeficiencia,
  setNomeCompleto,
  setNomeSocial,
  onDataNascimentoChange,
  setCpf,
  setTelefone,
  setNomeResponsavel,
  setProntuario,
  setCartaoSUS,
  setEspecialidade,
  setUnidade,
  onSalvar,
  onVoltar,
}: NovaTriagemViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }} maxW="1000px">
      <HStack w="fit-content" color="gray.600" mb={6} cursor="pointer"
        onClick={onVoltar} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      <VStack gap={8} align="stretch">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Nome Completo:</Text>
              <InputText placeholder="Nome Completo" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Data de Nascimento:</Text>
              <InputText placeholder="DD/MM/AAAA" value={dataNascimento} onChange={onDataNascimentoChange} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Nome do Responsável (Acompanhante):</Text>
              <InputText placeholder="Nome do Responsável" value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Prontuário:</Text>
              <InputText placeholder="Prontuário" value={prontuario} onChange={(e) => setProntuario(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Especialidade/agenda:</Text>
              <InputText placeholder="Setor de origem do atendimento..." value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
          </VStack>

          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Nome Social:</Text>
              <InputText placeholder="Nome Social" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">CPF:</Text>
              <InputText placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Telefone:</Text>
              <InputText placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Número cartão SUS:</Text>
              <InputText placeholder="Número cartão SUS" value={cartaoSUS} onChange={(e) => setCartaoSUS(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Unidade:</Text>
              <InputText placeholder="Setor que o paciente está internado" value={unidade} onChange={(e) => setUnidade(e.target.value)} bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
          </VStack>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} alignItems="end">
          <Box>
            <Text fontWeight="bold" mb={4} color="gray.700">O paciente possui alguma deficiência?</Text>
            <HStack gap={4}>
              <Flex flex={1} p={2} borderRadius="md" border="1px solid" cursor="pointer" justify="center"
                borderColor={possuiDeficiencia === "sim" ? "gray.800" : "gray.300"}
                bg={possuiDeficiencia === "sim" ? "blue.50" : "white"}
                onClick={() => setPossuiDeficiencia("sim")}
              >
                <Text fontSize="sm" fontWeight={possuiDeficiencia === "sim" ? "bold" : "normal"}>Sim</Text>
              </Flex>
              <Flex flex={1} p={2} borderRadius="md" border="1px solid" cursor="pointer" justify="center"
                borderColor={possuiDeficiencia === "nao" ? "gray.800" : "gray.300"}
                bg={possuiDeficiencia === "nao" ? "blue.50" : "white"}
                onClick={() => setPossuiDeficiencia("nao")}
              >
                <Text fontSize="sm" fontWeight={possuiDeficiencia === "nao" ? "bold" : "normal"}>Não</Text>
              </Flex>
            </HStack>
          </Box>

          {possuiDeficiencia === "sim" ? (
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Selecione a deficiência?</Text>
              <select
                value={tipoDeficiencia}
                onChange={(e) => setTipoDeficiencia(e.target.value)}
                style={{
                  width: "100%",
                  height: "2.5rem",
                  paddingLeft: "0.75rem",
                  paddingRight: "0.75rem",
                  background: "white",
                  border: "1px solid",
                  borderColor: "#CBD5E0",
                  borderRadius: "0.375rem",
                }}
              >
                <option value="tea">Autismo (TEA)</option>
                <option value="outra">Outra</option>
              </select>
            </Box>
          ) : (
            <Box display={{ base: "none", lg: "block" }} />
          )}
        </SimpleGrid>

        <Flex justify="center" mt={4}>
          <Button bg="blue.600" color="white" size="lg" px={10} _hover={{ bg: "blue.700" }} onClick={onSalvar}>
            {possuiDeficiencia === "sim" ? "Prosseguir para questionário TEA" : "Finalizar cadastro"}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
