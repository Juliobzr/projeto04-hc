"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Box, Flex, Text, HStack, VStack } from "@chakra-ui/react";
import { FiArrowLeft, FiPrinter } from "react-icons/fi";

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

export default function PerfilPaciente() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [prontuario, setProntuario] = useState("");
  const [cartaoSUS, setCartaoSUS] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [deficiencia, setDeficiencia] = useState("Não");
  const [salvo, setSalvo] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");

  const [temTEA, setTemTEA] = useState(false);
  const [nivelSuporte, setNivelSuporte] = useState("");
  const [autonomia, setAutonomia] = useState("");
  const [comunicacao, setComunicacao] = useState("");
  const [comunicacaoAlternativa, setComunicacaoAlternativa] = useState("");
  const [interacaoSocial, setInteracaoSocial] = useState<string[]>([]);
  const [fatoresDesregulacao, setFatoresDesregulacao] = useState<string[]>([]);
  const [dificuldadesSensoriais, setDificuldadesSensoriais] = useState<string[]>([]);
  const [fatoresClinicos, setFatoresClinicos] = useState<string[]>([]);
  const [hiperfoco, setHiperfoco] = useState("");

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (usuarioString) setNomeUsuario(JSON.parse(usuarioString).nome);
    else router.push("/login");

    const pacientes = JSON.parse(localStorage.getItem("pacientes_mock") || "[]");
    const paciente = pacientes.find((p: any) => p.id === id);
    if (paciente) {
      setNome(paciente.nome || "");
      setNomeSocial(paciente.nomeSocial || "");
      setDataNascimento(paciente.dataNascimento || "");
      setCpf(paciente.cpf || "");
      setNomeResponsavel(paciente.nomeResponsavel || "");
      setTelefone(paciente.telefone || "");
      setProntuario(paciente.prontuario || "");
      setCartaoSUS(paciente.cartaoSUS || "");
      setEspecialidade(paciente.especialidade || "");
      setUnidade(paciente.unidade || "");
      setDeficiencia(paciente.deficiencia || "Não");

      if (paciente.tea) {
        setTemTEA(true);
        setNivelSuporte(paciente.tea.nivelSuporte || "");
        setAutonomia(paciente.tea.autonomia || "");
        setComunicacao(paciente.tea.comunicacao || "");
        setComunicacaoAlternativa(paciente.tea.comunicacaoAlternativa || "");
        setInteracaoSocial(paciente.tea.interacaoSocial || []);
        setFatoresDesregulacao(paciente.tea.fatoresDesregulacao || []);
        setDificuldadesSensoriais(paciente.tea.dificuldadesSensoriais || []);
        setFatoresClinicos(paciente.tea.fatoresClinicos || []);
        setHiperfoco(paciente.tea.hiperfoco || "");
      }
    }
  }, [id, router]);

  function toggleItem(list: string[], setList: (v: string[]) => void, item: string) {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }

  function calcularIdade(dataNasc: string) {
    if (!dataNasc) return "";
    const [dia, mes, ano] = dataNasc.split("/");
    const nasc = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    if (hoje.getMonth() < nasc.getMonth() || (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  }

  function gerarResumo() {
    const partes = [
      `Paciente com nível de suporte ${nivelSuporte === "nivel1" ? "leve (Nível 1)" : nivelSuporte === "nivel2" ? "moderado (Nível 2)" : "severo (Nível 3)"}.`,
      autonomia === "total" ? "Totalmente dependente." : autonomia === "parcial" ? "Parcialmente dependente." : "Independente.",
      comunicacao === "nao_verbal" ? "Apresenta perfil não verbal." : comunicacao === "verbal_suporte" ? "Comunica-se com suporte." : "Comunicação verbal preservada.",
      interacaoSocial.length > 0 ? `Tendência ao ${interacaoSocial.join(", ").toLowerCase()}.` : "",
      fatoresDesregulacao.length > 0 ? `Principais causas de desregulação: ${fatoresDesregulacao.join(", ").toLowerCase()}.` : "",
      dificuldadesSensoriais.length > 0 ? `Perfil sensorial: ${dificuldadesSensoriais.join(", ").toLowerCase()}.` : "",
      fatoresClinicos.length > 0 ? `Apresenta ${fatoresClinicos.join(", ").toLowerCase()}.` : "",
      hiperfoco ? `Hiperfoco em ${hiperfoco}.` : "",
    ];
    return partes.filter(Boolean).join(" ");
  }

  function handleSalvar() {
    const pacientes = JSON.parse(localStorage.getItem("pacientes_mock") || "[]");
    const index = pacientes.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      pacientes[index] = {
        ...pacientes[index],
        nome, nomeSocial, dataNascimento, cpf, nomeResponsavel,
        telefone, prontuario, cartaoSUS, especialidade, unidade, deficiencia,
        ...(temTEA && {
          tea: {
            nivelSuporte, autonomia, comunicacao, comunicacaoAlternativa,
            interacaoSocial, fatoresDesregulacao, dificuldadesSensoriais,
            fatoresClinicos, hiperfoco,
          }
        })
      };
      localStorage.setItem("pacientes_mock", JSON.stringify(pacientes));
      setSalvo(true);
      setTimeout(() => setSalvo(false), 2000);
    }
  }

  function imprimirPulseira() {
    const nivelLabel = nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacaoLabel = comunicacao === "verbal" ? "Verbal"
      : comunicacao === "nao_verbal" ? "Não verbal"
      : comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";
    const html = `<html><head><title>Pulseira</title>
      <style>body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
      .p{border:2px solid #333;padding:10px 20px;width:320px;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px}
      .l{font-weight:bold;font-size:15px}.r{text-align:right;color:#555}</style></head>
      <body><div class="p"><div class="l"><div>${nome}</div>
      <div style="font-weight:normal;font-size:12px;margin-top:4px">${nivelLabel}</div>
      <div style="font-weight:normal;font-size:12px">${calcularIdade(dataNascimento)} anos</div></div>
      <div class="r"><div>${comunicacaoLabel}</div><div>${dificuldadesSensoriais[0] || ""}</div></div></div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  function imprimirFolha() {
    const nivelLabel = nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacaoLabel = comunicacao === "verbal" ? "Verbal"
      : comunicacao === "nao_verbal" ? "Não verbal"
      : comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";
    const html = `<html><head><title>Folha</title>
      <style>body{font-family:Arial,sans-serif;margin:0;padding:0}
      .f{width:400px;margin:20px auto;border:2px solid #111;padding:16px;font-size:12px}
      .h{background:#111;color:white;text-align:center;padding:8px;font-weight:bold;font-size:14px;margin:-16px -16px 12px -16px}
      .n{font-size:22px;font-weight:bold;text-align:center;margin:8px 0}
      .l{font-weight:bold;font-size:11px;color:#333;margin-bottom:2px}.v{font-size:12px}
      .s{border-top:1px solid #ccc;padding-top:8px;margin-top:8px}
      .t{display:inline-block;background:#f0f0f0;border-radius:4px;padding:2px 6px;font-size:11px;margin:2px}
      .a{background:#111;color:white;padding:6px 10px;border-radius:4px;font-weight:bold;font-size:11px;margin-bottom:4px}
      .ft{text-align:center;font-size:10px;color:#888;margin-top:12px;border-top:1px solid #ccc;padding-top:8px}</style></head>
      <body><div class="f"><div class="h">HC — ALERTA DE CUIDADO SENSORIAL - TEA</div>
      <div class="n">${nome}</div>
      <div class="l">IDADE</div><div class="v">${calcularIdade(dataNascimento)} ANOS</div>
      <div class="s"><div class="l">PRONTUÁRIO</div><div class="v">${prontuario || "—"}</div></div>
      <div class="s"><div class="l">RESPONSÁVEL</div><div class="v">${nomeResponsavel || "—"}</div></div>
      <div class="s"><div class="l">NÍVEL DE SUPORTE</div><div class="v">${nivelLabel || "—"}</div></div>
      <div class="s"><div class="l">COMUNICAÇÃO</div><div class="v">${comunicacaoLabel || "—"}</div>
      ${comunicacaoAlternativa ? `<div class="v">Alternativa: ${comunicacaoAlternativa}</div>` : ""}</div>
      ${fatoresDesregulacao.length > 0 ? `<div class="s"><div class="a">GATILHOS (EVITAR)</div><div>${fatoresDesregulacao.map(f => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
      ${dificuldadesSensoriais.length > 0 ? `<div class="s"><div class="l">ALERTAS SENSORIAIS</div><div>${dificuldadesSensoriais.map(f => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
      ${hiperfoco ? `<div class="s"><div class="a">BOTÃO DE RESGATE</div><div class="v" style="margin-top:6px">Fale sobre: <strong>${hiperfoco.toUpperCase()}</strong></div></div>` : ""}
      <div class="ft">Emitido por: ${nomeUsuario}</div></div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <HStack w="fit-content" color="gray.600" mb={4} cursor="pointer"
        onClick={() => router.back()} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      {temTEA && (
        <Flex mb={6} gap={3} direction={{ base: "column", md: "row" }}>
          <Box as="button" bg="blue.600" color="white" borderRadius="lg" py={3} px={6}
            fontWeight="600" fontSize="sm" cursor="pointer" _hover={{ bg: "blue.700" }}
            display="flex" alignItems="center" justifyContent="center" gap={2} onClick={imprimirPulseira}
          >
            <FiPrinter size={16} /> Imprimir Pulseira
          </Box>
          <Box as="button" bg="blue.600" color="white" borderRadius="lg" py={3} px={6}
            fontWeight="600" fontSize="sm" cursor="pointer" _hover={{ bg: "blue.700" }}
            display="flex" alignItems="center" justifyContent="center" gap={2} onClick={imprimirFolha}
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

            {/* Deficiência */}
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
              <Text fontSize="sm" color="gray.600" lineHeight="1.6">{gerarResumo()}</Text>
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
                      onChange={() => toggleItem(interacaoSocial, setInteracaoSocial, item)} />
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
                      onChange={() => toggleItem(fatoresDesregulacao, setFatoresDesregulacao, item)} />
                  ))}
                </Box>
              </Box>
              <Box>
                <Text fontWeight="600" fontSize="sm" color="gray.700" mb={3}>Dificuldades Sensoriais:</Text>
                <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" } as any} gap={3}>
                  {["Sensível a barulho", "Gosta de barulho", "Sensível a odores fortes", "Temperatura",
                    "Aversão a toque físico", "Aversão a certos tecidos"].map((item) => (
                    <Checkbox key={item} label={item} checked={dificuldadesSensoriais.includes(item)}
                      onChange={() => toggleItem(dificuldadesSensoriais, setDificuldadesSensoriais, item)} />
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
                      onChange={() => toggleItem(fatoresClinicos, setFatoresClinicos, item)} />
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
            onClick={handleSalvar}
          >
            {salvo ? "Salvo!" : "Salvar"}
          </Box>
        </Flex>

      </VStack>
    </Box>
  );
}