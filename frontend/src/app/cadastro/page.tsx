"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, VStack, Text } from "@chakra-ui/react";
import { cadastrar } from "@/app/mock/auth";
import Card from "@/components/ui/Card";
import { LoadingButton } from "@/components/ui/LoadingButton";
import InputText from "@/components/ui/InputText";

export default function Login() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  function handleCadastro() {
    try {
      if (!email || !senha) {
        setErro("Preencha todos os campos");
        return;
      }

      cadastrar({ email, senha, nome });

      alert("Usuário cadastrado com sucesso!");
      router.push("/login");

    } catch (e: any) {
      setErro(e.message);
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxW="90rem"
      w="100%"
      pb="12.5rem"
      mx="auto"
      minH="100vh"
    >
      <Card>
        <VStack gap={1}>
          <Box display="flex" flexDirection="column" alignItems="center" gap="1.875rem">
            <Image src={logo} alt="Logo" width={40} height={40} />
            <Box gap="0.5rem" display="flex" flexDirection="column" alignItems="center">
              <Text fontSize="xl">Acesso Restrito</Text>
              <Text fontSize="sm" color="#8B8D97">Crie sua conta</Text>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="1.875rem" my={16}>
            <InputText
              width= "23rem"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <InputText
              width= "23rem"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputText
              width= "23rem"
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {erro && <Text color="red.500">{erro}</Text>}
          </Box>
          <LoadingButton onClick={handleCadastro} colorPalette="blue">
            Cadastrar
          </LoadingButton>
        </VStack>
      </Card>
    </Box>
  );
}