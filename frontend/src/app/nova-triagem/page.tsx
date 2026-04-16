"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text, VStack, HStack, SimpleGrid, Button } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import InputText from "@/components/ui/InputText";

export default function NovaTriagem() {
  const router = useRouter();

  const [possuiDeficiencia, setPossuiDeficiencia] = useState("nao");
  const [tipoDeficiencia, setTipoDeficiencia] = useState("tea");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [prontuario, setProntuario] = useState("");
  const [cartaoSUS, setCartaoSUS] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [unidade, setUnidade] = useState("");

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
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
    if (!usuarioString) router.push("/login");
  }, [router]);

  function handleSalvar() {
    if (!nomeCompleto || !cpf || !dataNascimento) {
      alert("Preencha pelo menos Nome, CPF e Data de Nascimento.");
      return;
    }

    const pacientesExistentes = JSON.parse(localStorage.getItem("pacientes_mock") || "[]");

    const novoPaciente = {
      id: Date.now().toString(),
      nome: nomeCompleto,
      nomeSocial,
      dataNascimento,
      cpf,
      telefone,
      nomeResponsavel,
      prontuario,
      cartaoSUS,
      especialidade,
      unidade,
      deficiencia: possuiDeficiencia === "sim" ? tipoDeficiencia.toUpperCase() : "Não",
      criadoEm: new Date().toISOString(),
    };

    pacientesExistentes.push(novoPaciente);
    localStorage.setItem("pacientes_mock", JSON.stringify(pacientesExistentes));
    localStorage.setItem("paciente_em_cadastro_id", novoPaciente.id);

    if (possuiDeficiencia === "sim" && tipoDeficiencia === "tea") {
      router.push("/nova-triagem/cadastro-tea");
    } else {
      router.push("/nova-triagem/confirmacao-simples");
    }
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1000px">
      <HStack w="fit-content" color="gray.600" mb={6} cursor="pointer"
        onClick={() => router.push("/dashboard")} _hover={{ color: "blue.500" }}>
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
              <InputText placeholder="DD/MM/AAAA" value={dataNascimento} onChange={handleDataChange} bg="white" border="1px solid" borderColor="gray.300" />
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
              <Box as="select" w="full" h="10" px="3" bg="white" border="1px solid" borderColor="gray.300" borderRadius="md"
                value={tipoDeficiencia} onChange={(e: any) => setTipoDeficiencia(e.target.value)}
              >
                <option value="tea">Autismo (TEA)</option>
                <option value="outra">Outra</option>
              </Box>
            </Box>
          ) : (
            <Box display={{ base: "none", lg: "block" }} />
          )}
        </SimpleGrid>

        <Flex justify="center" mt={4}>
          <Button bg="blue.600" color="white" size="lg" px={10} _hover={{ bg: "blue.700" }} onClick={handleSalvar}>
            {possuiDeficiencia === "sim" ? "Prosseguir para questionário TEA" : "Finalizar cadastro"}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}