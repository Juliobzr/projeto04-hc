"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import { Box, VStack, Text, Link } from "@chakra-ui/react";
import Card from "@/components/ui/layout/Card";
import { LoadingButton } from "@/components/ui/layout/LoadingButton";
import InputText from "@/components/ui/layout/InputText";
import { LoginViewProps } from "@/types/Login";
import NextLink from "next/link";

export default function LoginView({
  email,
  senha,
  erro,
  setEmail,
  setSenha,
  onSubmit,
}: LoginViewProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxW="90rem"
      w="100%"
      px={{ base: 4, md: 0 }}
      pb={{ base: 8, md: "12.5rem" }}
      mx="auto"
      minH="100vh"
    >
      <Box w="100%" maxW="23rem">
      <Card>
        <VStack gap={1} w="100%">
          <Box display="flex" flexDirection="column" alignItems="center" gap="1.875rem">
            <Image src={logo} alt="Logo" width={40} height={40} />
            <Box gap="0.5rem" display="flex" flexDirection="column" alignItems="center">
              <Text fontSize="xl">Acesso Restrito</Text>
              <Text fontSize="sm" color="#8B8D97">
                Faça login na sua conta
              </Text>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap="1.875rem" my={{ base: 8, md: 16 }} w="100%">
            <InputText
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <InputText
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
            />

            {erro && <Text color="red.500">{erro}</Text>}
          </Box>

          <LoadingButton onClick={onSubmit} colorPalette="blue">
            Entrar
          </LoadingButton>
        </VStack>
      </Card>
      </Box>
    </Box>
  );
}