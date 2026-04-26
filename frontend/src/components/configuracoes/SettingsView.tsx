"use client";

import { Box, Flex, Text, HStack, VStack } from "@chakra-ui/react";
import { FiUser, FiMail, FiMapPin, FiUpload, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { SettingsViewProps } from "@/types/Settings";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px 10px 40px",
  fontSize: "14px",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  outline: "none",
  background: "#f9fafb",
  color: "#374151",
  boxSizing: "border-box",
};

const inputStyleSemIcone: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "14px",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  outline: "none",
  background: "#f9fafb",
  color: "#374151",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "14px",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  outline: "none",
  background: "#f9fafb",
  color: "#374151",
  boxSizing: "border-box",
  cursor: "pointer",
  appearance: "none",
};

const ESTADOS_BR = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

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
}: SettingsViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }}>

      <HStack w="fit-content" color="gray.600" mb={4} cursor="pointer"
        onClick={onVoltar} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 8 }}>

        <Flex justify="space-between" align="center" mb={8} gap={4}>
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

        <Flex gap={12} align="flex-start">
          <Box flex={1}>
            <VStack gap={4} align="stretch">

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Primeiro Nome</Text>
                <Box position="relative">
                  <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="gray.400" zIndex={1}>
                    <FiUser size={16} />
                  </Box>
                  <input value={primeiroNome} onChange={(e) => setPrimeiroNome(e.target.value)} style={inputStyle} />
                </Box>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Último Nome</Text>
                <Box position="relative">
                  <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="gray.400" zIndex={1}>
                    <FiUser size={16} />
                  </Box>
                  <input value={ultimoNome} onChange={(e) => setUltimoNome(e.target.value)} style={inputStyle} />
                </Box>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Email</Text>
                <Box position="relative">
                  <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="gray.400" zIndex={1}>
                    <FiMail size={16} />
                  </Box>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                </Box>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Número</Text>
                <input value={numero} onChange={(e) => setNumero(e.target.value)}
                  placeholder="(00) 00000-0000" style={inputStyleSemIcone} />
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Instituição</Text>
                <Box position="relative">
                  <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="gray.400" zIndex={1}>
                    <FiMapPin size={16} />
                  </Box>
                  <input value={instituicao} onChange={(e) => setInstituicao(e.target.value)}
                    placeholder="Nome da instituição" style={inputStyle} />
                </Box>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Cidade</Text>
                <input value={cidade} onChange={(e) => setCidade(e.target.value)}
                  placeholder="Cidade" style={inputStyleSemIcone} />
              </Box>

              <HStack gap={4}>
                <Box flex={1}>
                  <Text fontSize="sm" color="gray.600" mb={2}>País</Text>
                  <Box position="relative">
                    <select value={pais} onChange={(e) => setPais(e.target.value)} style={selectStyle}>
                      <option value="Brasil">Brasil</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                    </select>
                    <Box position="absolute" right="12px" top="50%" transform="translateY(-50%)" color="gray.400" pointerEvents="none">▾</Box>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" color="gray.600" mb={2}>Estado</Text>
                  <Box position="relative">
                    <select value={estado} onChange={(e) => setEstado(e.target.value)} style={selectStyle}>
                      {ESTADOS_BR.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                    <Box position="absolute" right="12px" top="50%" transform="translateY(-50%)" color="gray.400" pointerEvents="none">▾</Box>
                  </Box>
                </Box>
              </HStack>

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
