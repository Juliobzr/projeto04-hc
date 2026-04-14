"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text, VStack, HStack, SimpleGrid, Button } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import InputText from "@/components/ui/InputText";

export default function NovaTriagem() {
  const router = useRouter();
  
  const [possuiDeficiencia, setPossuiDeficiencia] = useState("nao");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    if (value.length > 8) value = value.slice(0, 8); 
    if (value.length > 4) {
      value = value.replace(/^(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d+)/, "$1/$2");
    }
    setDataNascimento(value);
  };

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (!usuarioString) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1000px">
      <HStack 
        w="fit-content"
        color="gray.600" mb={6} 
        cursor="pointer" 
        onClick={() => router.push("/dashboard")} 
        _hover={{ color: "blue.500" }}
      >
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      <VStack gap={8} align="stretch">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Nome Completo:</Text>
              <InputText placeholder="Nome Completo" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Data de Nascimento:</Text>
              <InputText 
                placeholder="DD/MM/AAAA" 
                value={dataNascimento}
                onChange={handleDataChange}
                bg="white" 
                border="1px solid" 
                borderColor="gray.300" 
              />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Nome do Responsável (Acompanhante):</Text>
              <InputText placeholder="Nome do Responsável" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Prontuário:</Text>
              <InputText placeholder="Prontuário" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Especialidade/agenda:</Text>
              <InputText placeholder="Setor de origem do atendimento..." bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
          </VStack>

          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Nome Social:</Text>
              <InputText placeholder="Nome Social" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">CPF:</Text>
              <InputText placeholder="CPF" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Telefone:</Text>
              <InputText placeholder="Telefone" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Número cartão SUS:</Text>
              <InputText placeholder="Número cartão SUS" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2} color="gray.700">Unidade:</Text>
              <InputText placeholder="Setor que o paciente está internado" bg="white" border="1px solid" borderColor="gray.300" />
            </Box>
          </VStack>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} alignItems="end">
          <Box>
            <Text fontWeight="bold" mb={4} color="gray.700">O paciente possui alguma deficiência?</Text>
            <HStack gap={4}>
              <Flex 
                flex={1} p={2} borderRadius="md" border="1px solid" cursor="pointer" justify="center"
                borderColor={possuiDeficiencia === "sim" ? "gray.800" : "gray.300"}
                bg={possuiDeficiencia === "sim" ? "blue.50" : "white"}
                onClick={() => setPossuiDeficiencia("sim")}
              >
                <Text fontSize="sm" fontWeight={possuiDeficiencia === "sim" ? "bold" : "normal"}>Sim</Text>
              </Flex>
              <Flex 
                flex={1} p={2} borderRadius="md" border="1px solid" cursor="pointer" justify="center"
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
              <Box as="select" w="full" h="10" px="3" bg="white" border="1px solid" borderColor="gray.300" borderRadius="md">
                <option value="tea">Autismo (TEA)</option>
                <option value="outro">Outra</option>
              </Box>
            </Box>
          ) : (
            <Box display={{ base: "none", lg: "block" }} /> 
          )}
        </SimpleGrid>

        <Flex justify="center" mt={4}>
          <Button 
            bg="blue.600" 
            color="white" 
            size="lg" 
            px={10} 
            _hover={{ bg: "blue.700" }}
          >
            {possuiDeficiencia === "sim" ? "Prosseguir para questionário TEA" : "Finalizar cadastro"}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}