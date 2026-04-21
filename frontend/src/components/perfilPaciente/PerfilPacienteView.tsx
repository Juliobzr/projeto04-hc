"use client";

import { Box, Flex, Text, HStack, VStack } from "@chakra-ui/react";
import { FiArrowLeft, FiPrinter } from "react-icons/fi";
import { PerfilPacienteViewProps } from "@/types/PerfilPaciente";

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
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 6 }}>
      <Text fontWeight="700" fontSize="md" color="gray.800" mb={4}>{number}. {title}</Text>
      <VStack align="stretch" gap={5}>{children}</VStack>
    </Box>
  );
}

function Campo({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Box>
      <Text fontWeight="600" fontSize="sm" color="gray.700" mb={1}>{label}</Text>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} style={inputStyle} />
    </Box>
  );
}

export default function PerfilPacienteView(props: PerfilPacienteViewProps) {
  const {
    onVoltar,
    onSalvar,
    onImprimirPulseira,
    onImprimirFolha,
    nome,
    nomeSocial,
    dataNascimento,
    cpf,
    nomeResponsavel,
    telefone,
    prontuario,
    cartaoSUS,
    especialidade,
    unidade,
    deficiencia,
    salvo,
    temTEA,
    resumoTexto,
    nivelSuporte,
    autonomia,
    comunicacao,
    comunicacaoAlternativa,
    interacaoSocial,
    fatoresDesregulacao,
    dificuldadesSensoriais,
    fatoresClinicos,
    hiperfoco,
    setNome,
    setNomeSocial,
    setDataNascimento,
    setCpf,
    setNomeResponsavel,
    setTelefone,
    setProntuario,
    setCartaoSUS,
    setEspecialidade,
    setUnidade,
    setDeficiencia,
    setNivelSuporte,
    setAutonomia,
    setComunicacao,
    setComunicacaoAlternativa,
    setHiperfoco,
    toggleInteracaoSocial,
    toggleFatoresDesregulacao,
    toggleDificuldadesSensoriais,
    toggleFatoresClinicos,
  } = props;

  return (
    <Box p={{ base: 4, md: 8 }}>
      <HStack w="fit-content" color="gray.600" mb={4} cursor="pointer"
        onClick={onVoltar} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      {temTEA && (
        <Flex mb={6} gap={3} direction={{ base: "column", md: "row" }}>
          <Box as="button" bg="blue.600" color="white" borderRadius="lg" py={3} px={6}
            fontWeight="600" fontSize="sm" cursor="pointer" _hover={{ bg: "blue.700" }}
            display="flex" alignItems="center" justifyContent="center" gap={2} onClick={onImprimirPulseira}
          >
            <FiPrinter size={16} /> Imprimir Pulseira
          </Box>
          <Box as="button" bg="blue.600" color="white" borderRadius="lg" py={3} px={6}
            fontWeight="600" fontSize="sm" cursor="pointer" _hover={{ bg: "blue.700" }}
            display="flex" alignItems="center" justifyContent="center" gap={2} onClick={onImprimirFolha}
          >
            <FiPrinter size={16} /> Imprimir Folha
          </Box>
        </Flex>
      )}

      <VStack gap={4} align="stretch" maxW="800px">

        <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 8 }}>
          <VStack gap={5} align="stretch">
            <Campo label="Nome:" value={nome} onChange={setNome} />
            <Campo label="Nome Social:" value={nomeSocial} onChange={setNomeSocial} />
            <Campo label="Data de Nascimento:" value={dataNascimento} onChange={setDataNascimento} />
            <Campo label="CPF:" value={cpf} onChange={setCpf} />
            <Campo label="Nome do Responsável:" value={nomeResponsavel} onChange={setNomeResponsavel} />
            <Campo label="Telefone:" value={telefone} onChange={setTelefone} />
            <Campo label="Prontuário:" value={prontuario} onChange={setProntuario} />
            <Campo label="Numero cartão SUS:" value={cartaoSUS} onChange={setCartaoSUS} />
            <Campo label="Especialidade/agenda:" value={especialidade} onChange={setEspecialidade} />
            <Campo label="Unidade:" value={unidade} onChange={setUnidade} />

            <Box>
              <Text fontWeight="600" fontSize="sm" color="gray.700" mb={2}>
                O paciente possui alguma deficiência?
              </Text>
              <HStack gap={3}>
                <Flex align="center" gap={2} px={4} py={2} borderRadius="lg" border="1px solid" cursor="pointer"
                  borderColor={deficiencia !== "Não" ? "blue.500" : "gray.200"}
                  onMouseDown={(e) => e.preventDefault()} onClick={() => setDeficiencia("TEA")}
                >
                  <Box w="16px" h="16px" borderRadius="full" border="2px solid"
                    borderColor={deficiencia !== "Não" ? "blue.500" : "gray.300"}
                    display="flex" alignItems="center" justifyContent="center"
                  >
                    {deficiencia !== "Não" && <Box w="8px" h="8px" borderRadius="full" bg="blue.500" />}
                  </Box>
                  <Text fontSize="sm" color="gray.700">Sim</Text>
                </Flex>
                <Flex align="center" gap={2} px={4} py={2} borderRadius="lg" border="1px solid" cursor="pointer"
                  borderColor={deficiencia === "Não" ? "blue.500" : "gray.200"}
                  onMouseDown={(e) => e.preventDefault()} onClick={() => setDeficiencia("Não")}
                >
                  <Box w="16px" h="16px" borderRadius="full" border="2px solid"
                    borderColor={deficiencia === "Não" ? "blue.500" : "gray.300"}
                    display="flex" alignItems="center" justifyContent="center"
                  >
                    {deficiencia === "Não" && <Box w="8px" h="8px" borderRadius="full" bg="blue.500" />}
                  </Box>
                  <Text fontSize="sm" color="gray.700">Não</Text>
                </Flex>
              </HStack>
            </Box>

            {deficiencia !== "Não" && (
              <Box>
                <Text fontWeight="600" fontSize="sm" color="gray.700" mb={2}>
                  Selecione a deficiência?
                </Text>
                <select value={deficiencia} onChange={(e) => setDeficiencia(e.target.value)}
                  style={{ ...inputStyle, width: "100%" }}
                >
                  <option value="TEA">Autismo (TEA)</option>
                  <option value="Sim">Outra</option>
                </select>
              </Box>
            )}
          </VStack>
        </Box>

        {temTEA && (
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={{ base: 4, md: 6 }}>
            <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Resumo de Perfil do Paciente IA*:</Text>
            <Box border="1px solid" borderColor="gray.200" borderRadius="lg" p={4} bg="gray.50">
              <Text fontSize="sm" color="gray.600" lineHeight="1.6">{resumoTexto}</Text>
            </Box>
          </Box>
        )}

        {temTEA && (
          <>
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
                <HStack gap={4} flexWrap="wrap">
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
                <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" } as any} gap={3}>
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
                <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" } as any} gap={3}>
                  {["Espera prolongada", "Quebra de rotina", "Multidões", "Ambiente novo"].map((item) => (
                    <Checkbox key={item} label={item} checked={fatoresDesregulacao.includes(item)}
                      onChange={() => toggleFatoresDesregulacao(item)} />
                  ))}
                </Box>
              </Box>
              <Box>
                <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Dificuldades Sensoriais:</Text>
                <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" } as any} gap={3}>
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
                <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" } as any} gap={3}>
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
          </>
        )}

        <Flex justify="center" mb={4}>
          <Box as="button"
            bg={salvo ? "green.500" : "blue.600"} color="white" borderRadius="xl"
            py={3} px={12} fontWeight="600" fontSize="md" cursor="pointer"
            _hover={{ bg: salvo ? "green.600" : "blue.700" }}
            onClick={onSalvar}
          >
            {salvo ? "Salvo!" : "Salvar"}
          </Box>
        </Flex>

      </VStack>
    </Box>
  );
}
