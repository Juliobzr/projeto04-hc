"use client";

import { Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Pacientes() {
  const router = useRouter();

  return (
    <Flex h="100vh" align="center" justify="center" direction="column" gap={4} bg="#f4f5f9">
      <Text fontSize="2xl" fontWeight="bold" color="gray.800">Pacientes</Text>
      <Text color="gray.500">Lista de pacientes em construção...</Text>
      
      <Button 
        bg="blue.600" 
        color="white" 
        _hover={{ bg: "blue.700" }} 
        onClick={() => router.push("/dashboard")}
      >
        Voltar para o Dashboard
      </Button>
    </Flex>
  );
}