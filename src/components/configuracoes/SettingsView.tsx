"use client";

import { Box, Flex, Text, Select, HStack, VStack } from "@chakra-ui/react";
import InputText from "../ui/layout/InputText";
import { FiUser, FiMail, FiMapPin, FiUpload, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { SettingsViewProps } from "@/types/Settings";
import { SelectField } from "../ui/layout/SelectField";
import { PAISES, ESTADOS_BR } from "@/constants/options";

export default function SettingsView({
  fileInputRef,
  primeiroNome,
  ultimoNome,
  email,
  numero,
  instituicao,
  cidade,
  pais,
  estado,
  foto,
  salvo,
  selected,
  setPrimeiroNome,
  setUltimoNome,
  setEmail,
  setNumero,
  setInstituicao,
  setCidade,
  setPais,
  setEstado,
  setFoto,
  onAbrirSeletorFoto,
  onAtualizar,
  onVoltar,
  onFotoSelecionada,
  setSelected,
}: SettingsViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }}>

      <HStack w="fit-content" color="gray.600" mb={4} cursor="pointer"
        onClick={onVoltar} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 8 }}>

        <Flex justify="space-between" align={{ base: "stretch", sm: "center" }} direction={{ base: "column", sm: "row" }} mb={8} gap={4}>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="600" color="gray.800">
            Configurações de Conta
          </Text>
          <Box
            as="button" bg={salvo ? "green.500" : "blue.600"} color="white"
            borderRadius="xl" py={3} px={{ base: 4, md: 8 }} fontWeight="600" fontSize="sm"
            cursor="pointer" _hover={{ bg: salvo ? "green.600" : "blue.700" }}
            onClick={onAtualizar} flexShrink={0}
          >
            {salvo ? "Salvo!" : "Atualizar"}
          </Box>
        </Flex>

        <Flex justify="center" mb={6} display={{ base: "flex", md: "none" }}>
          <Box w="120px" h="120px" borderRadius="xl" overflow="hidden"
            bg="gray.200" position="relative" border="1px solid" borderColor="gray.200">
            {foto ? (
              <img src={foto} alt="foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Box w="full" h="full" bg="gray.300" display="flex" alignItems="center" justifyContent="center">
                <FiUser size={32} color="#9ca3af" />
              </Box>
            )}
            <HStack position="absolute" top="8px" right="8px" gap={1}>
              <Box as="button" bg="white" borderRadius="md" p={1} cursor="pointer"
                boxShadow="sm" onClick={onAbrirSeletorFoto}>
                <FiUpload size={14} color="#374151" />
              </Box>
              <Box as="button" bg="white" borderRadius="md" p={1} cursor="pointer"
                boxShadow="sm" onClick={() => setFoto(null)}>
                <FiTrash2 size={14} color="#374151" />
              </Box>
            </HStack>
          </Box>
        </Flex>

        <Flex gap={{ base: 6, md: 12 }} align="flex-start" direction={{ base: "column", md: "row" }}>
          <Box flex={1}>
            <VStack gap={4} align="stretch">

              <InputText label="Primeiro Nome" value={primeiroNome} onChange={(e) => setPrimeiroNome(e.target.value)}/>
              <InputText label="Último Nome" value={ultimoNome} onChange={(e) => setUltimoNome(e.target.value)} />
              <InputText label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputText label="Número" value={numero} onChange={(e) => setNumero(e.target.value)}
                  placeholder="(00) 00000-0000" />
              <InputText label="Instituição" value={instituicao} onChange={(e) => setInstituicao(e.target.value)}
                    placeholder="Nome da instituição" />
              <InputText label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}
                  placeholder="Cidade" />

              <Flex gap={4} direction={{ base: "column", md: "row" }}>
                <Box flex={1}>
                  <Text fontSize="sm" color="gray.600" mb={2}>País</Text>
                  <Box position="relative">
                    <SelectField
                      options={PAISES}
                      value={pais}
                      onChange={setPais}
                      placeholder="Selecione um país"
                    />
                  </Box>
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" color="gray.600" mb={2}>Estado</Text>
                  <Box position="relative">
                    <SelectField
                      options={ESTADOS_BR}
                      value={estado}
                      onChange={setEstado}
                      placeholder="Selecione uma estado"
                    />
                  </Box>
                </Box>
              </Flex>
            </VStack>
          </Box>

          <Box flexShrink={0} display={{ base: "none", md: "block" }}>
            <Box w="160px" h="160px" borderRadius="xl" overflow="hidden"
              bg="gray.200" position="relative" border="1px solid" borderColor="gray.200">
              {foto ? (
                <img src={foto} alt="foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Box w="full" h="full" bg="gray.300" display="flex" alignItems="center" justifyContent="center">
                  <FiUser size={40} color="#9ca3af" />
                </Box>
              )}
              <HStack position="absolute" top="8px" right="8px" gap={1}>
                <Box as="button" bg="white" borderRadius="md" p={1} cursor="pointer"
                  boxShadow="sm" onClick={onAbrirSeletorFoto}>
                  <FiUpload size={14} color="#374151" />
                </Box>
                <Box as="button" bg="white" borderRadius="md" p={1} cursor="pointer"
                  boxShadow="sm" onClick={() => setFoto(null)}>
                  <FiTrash2 size={14} color="#374151" />
                </Box>
              </HStack>
            </Box>
          </Box>
        </Flex>

        <input ref={fileInputRef} type="file" accept="image/*"
          style={{ display: "none" }} onChange={onFotoSelecionada} />

      </Box>
    </Box>
  );
}
