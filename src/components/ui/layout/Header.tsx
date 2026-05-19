"use client";

import { useState, useEffect } from "react";
import { Flex, Text, HStack, Avatar, useBreakpointValue } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isMounted, setIsMounted] = useState(false);
  const [usuario, setUsuario] = useState({ nome: "", iniciais: "" });
  const pathname = usePathname();

  // Define o título automaticamente com base na URL
  const getTitle = () => {
    if (pathname === "/nova-triagem") return "Cadastro de Novo Paciente";
    if (pathname === "/pacientes") return "Pacientes";
    if (pathname === "/configuracoes") return "Configurações";
    return "Inicio";
  };

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("usuario_logado");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsuario({
          nome: parsedUser.nome || "Usuário",
          iniciais: parsedUser.nome ? parsedUser.nome.substring(0, 1).toUpperCase() : "U"
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
  }, []);

  return (
    <Flex 
      justify="space-between" align="center" bg="white" borderBottom="1px solid" 
      borderColor="gray.200" px={8} h="72px" flexShrink={0} pl={isMobile ? "72px" : 8}
    >
      <Text fontSize="xl" fontWeight="semibold" color="gray.800">
        {getTitle()}
      </Text>
      
      <HStack gap={4} opacity={isMounted ? 1 : 0} transition="opacity 0.3s ease">
        <Text fontSize="sm" fontWeight="medium" color="gray.600" display={{ base: "none", sm: "block" }}>
          {usuario.nome}
        </Text>
        <Avatar.Root size="sm">
          <Avatar.Fallback name={usuario.nome} />
        </Avatar.Root>
      </HStack>
    </Flex>
  );
}