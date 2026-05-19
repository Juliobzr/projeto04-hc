"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import { Box, VStack, Text, Link } from "@chakra-ui/react";
import Card from "@/components/ui/layout/Card";
import { LoadingButton } from "@/components/ui/layout/LoadingButton";
import InputText from "@/components/ui/layout/InputText";
import { SignUpViewProps } from "@/types/SignUp";
import NextLink from "next/link";

export default function SignUpView({
    email,
    senha,
    nome,
    erro,
    setEmail,
    setSenha,
    setNome,
    onSubmit
}: SignUpViewProps){
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            />
            <InputText
              width= "23rem"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <InputText
              width= "23rem"
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
            />
            {erro && <Text color="red.500">{erro}</Text>}
          </Box>
          <LoadingButton onClick={onSubmit} colorPalette="blue">
            Cadastrar
          </LoadingButton>
          <Link
            as={NextLink}
            href="/login"
            color="red"
            mt={6}
          >
            Já tem uma conta? Faça login
          </Link>
        </VStack>
      </Card>
    </Box>
  )
}