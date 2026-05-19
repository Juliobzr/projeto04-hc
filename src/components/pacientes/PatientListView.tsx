"use client";

import { Box, Flex, Text, Input, Button, HStack } from "@chakra-ui/react";
import { FiSearch, FiFilter, FiChevronDown, FiChevronLeft, FiChevronRight, FiTrash2 } from "react-icons/fi";
import { PatientListViewProps } from "@/types/PatientList";

export default function PatientListView({
  pacientesPagina,
  busca,
  selecionados,
  itensPorPagina,
  itensPorPaginaOpcoes,
  menuAcaoAberto,
  menuRef,
  paginaAtual,
  totalPaginas,
  inicio,
  pacientesFiltradosLength,
  onBuscaChange,
  onToggleMenuAcao,
  onToggleSelecionado,
  onToggleTodos,
  onExcluirSelecionados,
  onIrParaPaciente,
  onItensPorPaginaChange,
  onPaginaAnterior,
  onPaginaProxima,
}: PatientListViewProps) {
  const checkboxStyle: React.CSSProperties = {
    cursor: "pointer",
    width: "16px",
    height: "16px",
    accentColor: "#2563eb",
    backgroundColor: "white",
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" overflow="hidden">

        <Flex
          align={{ base: "stretch", md: "center" }}
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 0 }}
          px={{ base: 4, md: 6 }}
          py={4}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize="lg" fontWeight="600" color="gray.800">Lista de Pacientes</Text>
          <HStack gap={3} flexWrap="wrap" w={{ base: "100%", md: "auto" }}>
            <Flex align="center" border="1px solid" borderColor="gray.200" borderRadius="lg"
              px={3} py={2} gap={2} bg="white" flex={1} minW={{ base: "100%", md: "220px" }} w={{ base: "100%", md: "220px" }}>
              <Box color="gray.400"><FiSearch size={16} /></Box>
              <Input
                placeholder="Buscar por CPF"
                border="none" p={0} h="auto" fontSize="sm" color="gray.700"
                _placeholder={{ color: "gray.400" }} _focus={{ boxShadow: "none" }}
                value={busca} onChange={(e) => onBuscaChange(e.target.value)}
              />
            </Flex>
            <Button variant="outline" size="sm" borderColor="gray.200" color="gray.600" fontSize="sm" gap={2}>
              <FiFilter size={14} /> Filtros
            </Button>

            <Box position="relative" ref={menuRef}>
              <Button
                variant="outline" size="sm" borderColor="gray.200" color="gray.600" fontSize="sm" gap={2}
                onClick={onToggleMenuAcao}
              >
                Ação <FiChevronDown size={14} />
              </Button>
              {menuAcaoAberto && (
                <Box
                  position="absolute" top="110%" right={0} bg="white" borderRadius="lg"
                  border="1px solid" borderColor="gray.200" boxShadow="md" zIndex={10} minW="180px"
                >
                  <Flex
                    align="center" gap={2} px={4} py={3} cursor="pointer" color="red.500"
                    _hover={{ bg: "red.50" }} borderRadius="lg"
                    onClick={onExcluirSelecionados}
                  >
                    <FiTrash2 size={14} />
                    <Text fontSize="sm" fontWeight="500">
                      Excluir selecionados {selecionados.length > 0 && `(${selecionados.length})`}
                    </Text>
                  </Flex>
                </Box>
              )}
            </Box>
          </HStack>
        </Flex>

        <Box overflowX="auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ width: "48px", padding: "12px 16px" }}
                  onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox"
                    checked={selecionados.length === pacientesPagina.length && pacientesPagina.length > 0}
                    onChange={onToggleTodos}
                    style={checkboxStyle}
                  />
                </th>
                {["Nome", "Data de Nascimento", "CPF", "Deficiência", "Telefone"].map((col) => (
                  <th key={col} style={{ textAlign: "left", padding: "12px 16px", fontSize: "13px", fontWeight: "500", color: "#6b7280", whiteSpace: "nowrap" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pacientesPagina.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              ) : (
                pacientesPagina.map((paciente) => (
                  <tr key={paciente.id}
                    style={{ borderBottom: "1px solid #f3f4f6", backgroundColor: selecionados.includes(paciente.id) ? "#eff6ff" : "white", cursor: "pointer" }}
                    onClick={() => onIrParaPaciente(paciente.id)}
                    onMouseEnter={(e) => { if (!selecionados.includes(paciente.id)) (e.currentTarget as HTMLElement).style.backgroundColor = "#f9fafb"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = selecionados.includes(paciente.id) ? "#eff6ff" : "white"; }}
                  >
                    <td style={{ padding: "14px 16px" }}
                      onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selecionados.includes(paciente.id)}
                        onChange={() => onToggleSelecionado(paciente.id)}
                        style={checkboxStyle}
                      />
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#111827" }}>{paciente.nome}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{paciente.dataNascimento}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{paciente.cpf}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{paciente.deficiencia}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{paciente.telefone}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Box>

        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column", sm: "row" }}
          gap={4}
          flexWrap="wrap"
          px={{ base: 4, md: 6 }}
          py={4}
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <HStack gap={2} flexWrap="wrap">
            <select value={itensPorPagina}
              onChange={(e) => onItensPorPaginaChange(Number(e.target.value))}
              style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "4px 8px", fontSize: "13px", color: "#374151", cursor: "pointer" }}
            >
              {itensPorPaginaOpcoes.map((op) => <option key={op} value={op}>{op}</option>)}
            </select>
            <Text fontSize="13px" color="gray.500">
              {pacientesFiltradosLength === 0 ? "0 items" : `${inicio + 1}-${Math.min(inicio + itensPorPagina, pacientesFiltradosLength)} de ${pacientesFiltradosLength} items`}
            </Text>
          </HStack>

          <HStack gap={2}>
            <Text fontSize="13px" color="gray.500">Página {paginaAtual} de {totalPaginas}</Text>
            <Button variant="ghost" size="sm" p={1} onClick={onPaginaAnterior} disabled={paginaAtual === 1} color="gray.500">
              <FiChevronLeft size={18} />
            </Button>
            <Button variant="ghost" size="sm" p={1} onClick={onPaginaProxima} disabled={paginaAtual === totalPaginas} color="gray.500">
              <FiChevronRight size={18} />
            </Button>
          </HStack>
        </Flex>

      </Box>
    </Box>
  );
}
