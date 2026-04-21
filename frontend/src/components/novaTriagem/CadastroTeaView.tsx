"use client";

import { Box, Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { CadastroTeaViewProps } from "@/types/CadastroTea";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  background: "white",
  color: "#374151",
  boxSizing: "border-box",
};

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <HStack gap={2} cursor="pointer" onMouseDown={(e) => e.preventDefault()} onClick={onChange}>
      <Box w="18px" h="18px" borderRadius="4px" border="2px solid"
        borderColor={checked ? "blue.500" : "gray.300"} bg={checked ? "blue.500" : "white"}
        display="flex" alignItems="center" justifyContent="center" flexShrink={0}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Box>
      <Text fontSize="sm" color="gray.700" userSelect="none">{label}</Text>
    </HStack>
  );
}

function Radio({ label, value, selected, onChange }: { label: string; value: string; selected: string; onChange: (v: string) => void }) {
  return (
    <HStack gap={2} cursor="pointer" onMouseDown={(e) => e.preventDefault()} onClick={() => onChange(value)}>
      <Box w="18px" h="18px" borderRadius="full" border="2px solid"
        borderColor={selected === value ? "blue.500" : "gray.300"} bg="white"
        display="flex" alignItems="center" justifyContent="center" flexShrink={0}
      >
        {selected === value && <Box w="8px" h="8px" borderRadius="full" bg="blue.500" />}
      </Box>
      <Text fontSize="sm" color="gray.700" userSelect="none">{label}</Text>
    </HStack>
  );
}

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={6}>
      <Text fontWeight="700" fontSize="md" color="gray.800" mb={4}>{number}. {title}</Text>
      <VStack align="stretch" gap={5}>{children}</VStack>
    </Box>
  );
}

export default function CadastroTeaView({
  nivelSuporte,
  autonomia,
  comunicacao,
  comunicacaoAlternativa,
  interacaoSocial,
  fatoresDesregulacao,
  dificuldadesSensoriais,
  fatoresClinicos,
  hiperfoco,
  setNivelSuporte,
  setAutonomia,
  setComunicacao,
  setComunicacaoAlternativa,
  setHiperfoco,
  toggleInteracaoSocial,
  toggleFatoresDesregulacao,
  toggleDificuldadesSensoriais,
  toggleFatoresClinicos,
  onFinalizar,
  onVoltar,
}: CadastroTeaViewProps) {
  return (
    <Box p={{ base: 4, md: 8 }} maxW="700px">
      <HStack w="fit-content" color="gray.600" mb={6} cursor="pointer"
        onClick={onVoltar} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      <VStack gap={4} align="stretch">

        <Section number={1} title="Perfil Geral">
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Nível de suporte?</Text>
            <VStack align="stretch" gap={2}>
              <Radio label="Nível 1 - Leve/Suporte Reduzido" value="nivel1" selected={nivelSuporte} onChange={setNivelSuporte} />
              <Radio label="Nível 2 - Moderado/Suporte Substancial" value="nivel2" selected={nivelSuporte} onChange={setNivelSuporte} />
              <Radio label="Nível 3 - Severo/Suporte Muito Substancial" value="nivel3" selected={nivelSuporte} onChange={setNivelSuporte} />
            </VStack>
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Autonomia?</Text>
            <VStack align="stretch" gap={2}>
              <Radio label="Independente" value="independente" selected={autonomia} onChange={setAutonomia} />
              <Radio label="Parcialmente Dependente" value="parcial" selected={autonomia} onChange={setAutonomia} />
              <Radio label="Totalmente Dependente" value="total" selected={autonomia} onChange={setAutonomia} />
            </VStack>
          </Box>
        </Section>

        <Section number={2} title="Comunicação e Interação">
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Dificuldade de comunicação?</Text>
            <HStack gap={6} flexWrap="wrap">
              <Radio label="Verbal" value="verbal" selected={comunicacao} onChange={setComunicacao} />
              <Radio label="Não verbal" value="nao_verbal" selected={comunicacao} onChange={setComunicacao} />
              <Radio label="Verbal com suporte" value="verbal_suporte" selected={comunicacao} onChange={setComunicacao} />
            </HStack>
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={2}>Faz uso de comunicação alternativa? Qual?</Text>
            <input placeholder="alternativa (ex: Tablet, Gestos, PECS)" value={comunicacaoAlternativa}
              onChange={(e) => setComunicacaoAlternativa(e.target.value)} style={inputStyle} />
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Interação Social:</Text>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
              {["Interação atípica", "Isolamento", "Evita contato visual", "Sem restrições"].map((item) => (
                <Checkbox key={item} label={item} checked={interacaoSocial.includes(item)}
                  onChange={() => toggleInteracaoSocial(item)} />
              ))}
            </Box>
          </Box>
        </Section>

        <Section number={3} title="Alertas Sensoriais e Regulação">
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Fatores de Desregulação:</Text>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
              {["Espera prolongada", "Quebra de rotina", "Multidões", "Ambiente novo"].map((item) => (
                <Checkbox key={item} label={item} checked={fatoresDesregulacao.includes(item)}
                  onChange={() => toggleFatoresDesregulacao(item)} />
              ))}
            </Box>
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Dificuldades Sensoriais:</Text>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
              {["Sensível a barulho", "Gosta de barulho", "Sensível a odores fortes", "Temperatura",
                "Aversão a toque físico", "Aversão a certos tecidos"].map((item) => (
                <Checkbox key={item} label={item} checked={dificuldadesSensoriais.includes(item)}
                  onChange={() => toggleDificuldadesSensoriais(item)} />
              ))}
            </Box>
          </Box>
        </Section>

        <Section number={4} title="Comportamento e Fatores Clínicos">
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Fatores Clínicos e Rotina:</Text>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
              {["Distúrbios de Sono", "Rigidez Cognitiva", "Seletividade Alimentar", "Alterações Motoras"].map((item) => (
                <Checkbox key={item} label={item} checked={fatoresClinicos.includes(item)}
                  onChange={() => toggleFatoresClinicos(item)} />
              ))}
            </Box>
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={2}>Qual o hiperfoco do paciente?</Text>
            <input placeholder="Ex: Dinossauros, trens, números..." value={hiperfoco}
              onChange={(e) => setHiperfoco(e.target.value)} style={inputStyle} />
          </Box>
        </Section>

        <Box as="button" bg="blue.600" color="white" borderRadius="xl"
          py={4} w="full" fontSize="md" fontWeight="600"
          _hover={{ bg: "blue.700" }} cursor="pointer" onClick={onFinalizar}
        >
          Finalizar Cadastro
        </Box>

      </VStack>
    </Box>
  );
}
