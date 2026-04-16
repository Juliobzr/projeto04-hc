"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text, HStack, VStack } from "@chakra-ui/react";
import { FiArrowLeft, FiPrinter } from "react-icons/fi";

export default function Confirmacao() {
  const router = useRouter();
  const [paciente, setPaciente] = useState<any>(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const usuarioString = localStorage.getItem("usuario_logado");
    if (usuarioString) setNomeUsuario(JSON.parse(usuarioString).nome);

    const pacientes = JSON.parse(localStorage.getItem("pacientes_mock") || "[]");
    if (pacientes.length > 0) setPaciente(pacientes[pacientes.length - 1]);
  }, []);

  function calcularIdade(dataNascimento: string) {
    if (!dataNascimento) return "";
    const [dia, mes, ano] = dataNascimento.split("/");
    const nascimento = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    if (hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) idade--;
    return idade;
  }

  function imprimirPulseira() {
    if (!paciente) return;
    const idade = calcularIdade(paciente.dataNascimento);
    const nivelTEA = paciente.tea?.nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : paciente.tea?.nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : paciente.tea?.nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacao = paciente.tea?.comunicacao === "verbal" ? "Verbal"
      : paciente.tea?.comunicacao === "nao_verbal" ? "Não verbal"
      : paciente.tea?.comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";
    const sensorial = paciente.tea?.dificuldadesSensoriais?.[0] || "";

    const html = `<html><head><title>Pulseira</title>
      <style>
        body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
        .p{border:2px solid #333;padding:10px 20px;width:320px;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px}
        .l{font-weight:bold;font-size:15px}.r{text-align:right;color:#555}
      </style></head>
      <body><div class="p">
        <div class="l">
          <div>${paciente.nome}</div>
          <div style="font-weight:normal;font-size:12px;margin-top:4px">${nivelTEA}</div>
          <div style="font-weight:normal;font-size:12px">${idade} anos</div>
        </div>
        <div class="r"><div>${comunicacao}</div><div>${sensorial}</div></div>
      </div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  function imprimirFolha() {
    if (!paciente) return;
    const idade = calcularIdade(paciente.dataNascimento);
    const nivelTEA = paciente.tea?.nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
      : paciente.tea?.nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
      : paciente.tea?.nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo" : "";
    const comunicacao = paciente.tea?.comunicacao === "verbal" ? "Verbal"
      : paciente.tea?.comunicacao === "nao_verbal" ? "Não verbal"
      : paciente.tea?.comunicacao === "verbal_suporte" ? "Verbal com suporte" : "";

    const html = `<html><head><title>Folha</title>
      <style>
        body{font-family:Arial,sans-serif;margin:0;padding:0}
        .f{width:400px;margin:20px auto;border:2px solid #111;padding:16px;font-size:12px}
        .h{background:#111;color:white;text-align:center;padding:8px;font-weight:bold;font-size:14px;margin:-16px -16px 12px -16px}
        .n{font-size:22px;font-weight:bold;text-align:center;margin:8px 0}
        .l{font-weight:bold;font-size:11px;color:#333;margin-bottom:2px}.v{font-size:12px}
        .s{border-top:1px solid #ccc;padding-top:8px;margin-top:8px}
        .t{display:inline-block;background:#f0f0f0;border-radius:4px;padding:2px 6px;font-size:11px;margin:2px}
        .a{background:#111;color:white;padding:6px 10px;border-radius:4px;font-weight:bold;font-size:11px;margin-bottom:4px}
        .ft{text-align:center;font-size:10px;color:#888;margin-top:12px;border-top:1px solid #ccc;padding-top:8px}
      </style></head>
      <body><div class="f">
        <div class="h">HC — ALERTA DE CUIDADO SENSORIAL - TEA</div>
        <div class="n">${paciente.nome}</div>
        <div class="l">IDADE</div><div class="v">${idade} ANOS</div>
        <div class="s"><div class="l">PRONTUÁRIO</div><div class="v">${paciente.prontuario || "—"}</div></div>
        <div class="s"><div class="l">RESPONSÁVEL</div><div class="v">${paciente.nomeResponsavel || "—"}</div></div>
        <div class="s"><div class="l">NÍVEL DE SUPORTE</div><div class="v">${nivelTEA || "—"}</div></div>
        <div class="s"><div class="l">COMUNICAÇÃO</div><div class="v">${comunicacao || "—"}</div>
        ${paciente.tea?.comunicacaoAlternativa ? `<div class="v">Alternativa: ${paciente.tea.comunicacaoAlternativa}</div>` : ""}</div>
        ${paciente.tea?.fatoresDesregulacao?.length > 0 ? `<div class="s"><div class="a">GATILHOS (EVITAR)</div><div>${paciente.tea.fatoresDesregulacao.map((f: string) => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
        ${paciente.tea?.dificuldadesSensoriais?.length > 0 ? `<div class="s"><div class="l">ALERTAS SENSORIAIS</div><div>${paciente.tea.dificuldadesSensoriais.map((f: string) => `<span class="t">${f}</span>`).join("")}</div></div>` : ""}
        ${paciente.tea?.hiperfoco ? `<div class="s"><div class="a">BOTÃO DE RESGATE</div><div class="v" style="margin-top:6px">Fale sobre: <strong>${paciente.tea.hiperfoco.toUpperCase()}</strong></div></div>` : ""}
        <div class="ft">Emitido por: ${nomeUsuario}</div>
      </div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <HStack w="fit-content" color="gray.600" mb={6} cursor="pointer"
        onClick={() => router.back()} _hover={{ color: "blue.500" }}>
        <FiArrowLeft />
        <Text fontSize="sm" fontWeight="medium">Voltar</Text>
      </HStack>

      {/* Cadastro Finalizado */}
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={10} textAlign="center" mb={6}>
        <Box w="64px" h="64px" borderRadius="full" bg="green.500"
          display="flex" alignItems="center" justifyContent="center" mx="auto" mb={4}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16L12 22L26 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Box>
        <Text fontSize="2xl" fontWeight="700" color="green.500">Cadastro Finalizado!</Text>
      </Box>

      {/* Cards de impressão */}
      <Flex gap={6} mb={6} direction={{ base: "column", md: "row" }}>

        {/* Pulseira */}
        <Box flex={1} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={6}>
          <Text fontWeight="600" fontSize="md" color="gray.800" mb={6}>1. Visualizar Pulseira de Indentificação</Text>
          {paciente && (
            <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={4} mb={6}>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="700" fontSize="md" color="gray.800">{paciente.nome}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {paciente.tea?.nivelSuporte === "nivel1" ? "TEA Nível 1 - Leve"
                      : paciente.tea?.nivelSuporte === "nivel2" ? "TEA Nível 2 - Moderado"
                      : paciente.tea?.nivelSuporte === "nivel3" ? "TEA Nível 3 - Severo"
                      : paciente.deficiencia}
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="sm" color="gray.600">
                    {paciente.tea?.comunicacao === "verbal" ? "Verbal"
                      : paciente.tea?.comunicacao === "nao_verbal" ? "Não verbal"
                      : paciente.tea?.comunicacao === "verbal_suporte" ? "Verbal com suporte" : "—"}
                  </Text>
                  <Text fontSize="sm" color="gray.600">{paciente.tea?.dificuldadesSensoriais?.[0] || "—"}</Text>
                </Box>
              </Flex>
            </Box>
          )}
          <Box as="button" w="full" bg="blue.600" color="white" borderRadius="lg"
            py={3} fontWeight="600" fontSize="sm" cursor="pointer"
            _hover={{ bg: "blue.700" }} display="flex" alignItems="center" justifyContent="center" gap={2}
            onClick={imprimirPulseira}>
            <FiPrinter size={16} /> Imprimir Pulseira
          </Box>
        </Box>

        {/* Folha */}
        <Box flex={1} bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p={6}>
          <Text fontWeight="600" fontSize="md" color="gray.800" mb={6}>1. Visualizar Folha de Indentificação</Text>
          {paciente && (
            <Box border="2px solid" borderColor="gray.800" borderRadius="md" p={3} mb={6} fontSize="xs">
              <Box bg="gray.800" color="white" textAlign="center" py={1} px={2} fontWeight="bold" fontSize="11px" mx={-3} mt={-3} mb={2}>
                HC — ALERTA DE CUIDADO SENSORIAL - TEA
              </Box>
              <Text fontWeight="700" fontSize="sm" textAlign="center">{paciente.nome}</Text>
              <Text textAlign="center" fontSize="11px" color="gray.600">{calcularIdade(paciente.dataNascimento)} anos</Text>
              <Text fontSize="11px" mt={1}><strong>Responsável:</strong> {paciente.nomeResponsavel || "—"}</Text>
              <Text fontSize="11px"><strong>Prontuário:</strong> {paciente.prontuario || "—"}</Text>
              {paciente.tea?.hiperfoco && (
                <Text fontSize="11px" mt={1}><strong>Hiperfoco:</strong> {paciente.tea.hiperfoco}</Text>
              )}
            </Box>
          )}
          <Box as="button" w="full" bg="blue.600" color="white" borderRadius="lg"
            py={3} fontWeight="600" fontSize="sm" cursor="pointer"
            _hover={{ bg: "blue.700" }} display="flex" alignItems="center" justifyContent="center" gap={2}
            onClick={imprimirFolha}>
            <FiPrinter size={16} /> Imprimir Folha
          </Box>
        </Box>
      </Flex>

      {/* Botão Início */}
      <Flex justify="center">
        <Box as="button" bg="blue.600" color="white" borderRadius="xl"
          py={4} px={16} fontWeight="600" fontSize="md" cursor="pointer"
          _hover={{ bg: "blue.700" }} display="flex" alignItems="center" gap={2}
          onClick={() => router.push("/dashboard")}>
          Início
        </Box>
      </Flex>
    </Box>
  );
}