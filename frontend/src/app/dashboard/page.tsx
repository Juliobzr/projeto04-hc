"use client";

import Sidebar from "@/components/ui/layout/Sidebar/Sidebar";
import { useState, useEffect } from "react";
// O import do Image e logo não são mais necessários aqui se você não for usá-los no conteúdo principal
import { useRouter } from "next/navigation"; 
import { Box, Flex, Text, HStack, Avatar } from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi"; // Mantive só os ícones que o Dashboard usa

import InputText from "@/components/ui/InputText";

export default function Dashboard() {
  const router = useRouter();
  const [buscaCpf, setBuscaCpf] = useState("");
  
  const [nomeUsuario, setNomeUsuario] = useState("");
  // Estado para saber se o JS já carregou seguro no cliente
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
    
    const usuarioString = localStorage.getItem("usuario_logado");
    if (usuarioString) {
      setNomeUsuario(JSON.parse(usuarioString).nome);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Flex h="100vh" bg="#f4f5f9">
      
      {/* ========================================================
          1. SIDEBAR COMPONENTIZADA (A mágica acontece lá dentro agora)
          ======================================================== */}
      <Sidebar />

      {/* ========================================================
          ÁREA PRINCIPAL (Header + Conteúdo)
          ======================================================== */}
      <Flex flex={1} direction="column">
        
        {/* 2. HEADER SUPERIOR */}
        <Flex justify="space-between" align="center" bg="white" borderBottom="1px solid" borderColor="gray.200" px={8} h="72px">
          <Text fontSize="xl" fontWeight="semibold" color="gray.800">Dashboard</Text>
          
          <HStack gap={4}>
            {/* Renderiza o nome e o Avatar SE já estiver montado seguro */}
            {isMounted && nomeUsuario ? (
              <>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  {nomeUsuario}
                </Text>
                <Avatar.Root size="sm">
                  <Avatar.Fallback name={nomeUsuario} />
                </Avatar.Root>
              </>
            ) : (
              /* Um bloco vazio do mesmo tamanho para a tela não piscar feio */
              <Box w={8} h={8} /> 
            )}
          </HStack>
        </Flex>

        {/* 3. CONTEÚDO PRINCIPAL (Ações Rápidas) */}
        <Box p={8} maxW="container.xl">
          <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4}>
            Ações Rápidas
          </Text>
          
          <HStack gap={6} align="flex-start">
            <Flex bg="blue.600" color="white" p={6} borderRadius="xl" w="320px" align="center" cursor="pointer" _hover={{ bg: "blue.700", transform: "translateY(-2px)" }} transition="all 0.2s" boxShadow="sm" onClick={() => handleNavigation("/nova-triagem")}>
              <Box mr={4}><FiPlus size={32} /></Box>
              <Box>
                <Text fontWeight="bold" fontSize="md">Iniciar Nova Triagem</Text>
                <Text fontSize="sm" opacity={0.8}>Dados novo paciente</Text>
              </Box>
            </Flex>

            <Flex bg="white" p={6} borderRadius="xl" w="400px" align="flex-start" boxShadow="sm" border="1px solid" borderColor="gray.100" direction="column" gap={4}>
              <HStack w="100%">
                <Box color="gray.500" mr={2}><FiSearch size={24} /></Box>
                <Box>
                  <Text fontWeight="bold" fontSize="md" color="gray.800">Buscar Paciente</Text>
                  <Text fontSize="sm" color="gray.500">Buscar imediato por CPF</Text>
                </Box>
              </HStack>
              <Box w="100%">
                <InputText placeholder="Digite o CPF (Apenas números)" value={buscaCpf} onChange={(e) => setBuscaCpf(e.target.value)} />
              </Box>
            </Flex>
          </HStack>
        </Box>

      </Flex>
    </Flex>
  );
}
