"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { AdminViewProps } from "@/types/Admin";

export default function AdminView({
  funcionarios,
  abertoId,
  onToggleDropdown,
  onAdicionar,
  onExibir,
  onEditar,
  onExcluir,
}: AdminViewProps) {
  const [menuPos, setMenuPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const funcionarioSelecionado = funcionarios.find(
    (funcionario) => funcionario.id === abertoId
  );

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" overflow="visible">
        <Flex
          align={{ base: "stretch", md: "center" }}
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          gap={4}
          px={{ base: 4, md: 6 }}
          py={4}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize="lg" fontWeight="600" color="gray.800">
            Administração de Funcionários
          </Text>
          <Button colorPalette="blue" size="sm" onClick={onAdicionar}>
            <FiPlus /> Novo funcionário
          </Button>
        </Flex>

        <Box overflowX="auto" overflowY="visible">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "13px", fontWeight: "500", color: "#6b7280" }}>Nome</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "13px", fontWeight: "500", color: "#6b7280" }}>Email</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "13px", fontWeight: "500", color: "#6b7280" }}>Perfil</th>
                <th style={{ textAlign: "right", padding: "12px 16px", fontSize: "13px", fontWeight: "500", color: "#6b7280" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "32px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                    Nenhum funcionário encontrado.
                  </td>
                </tr>
              ) : (
                funcionarios.map((funcionario) => {
                  return (
                  <tr key={funcionario.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#111827" }}>{funcionario.nome}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{funcionario.email}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>{funcionario.role}</td>
                    <td style={{ padding: "14px 16px", textAlign: "right", position: "relative" }}>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={(e) => {
                          const rect = (
                            e.currentTarget as HTMLButtonElement
                          ).getBoundingClientRect();

                          setMenuPos({
                            top: rect.bottom + 6,
                            left: rect.right,
                          });
                          onToggleDropdown(funcionario.id);
                        }}
                      >
                        Opções <FiChevronDown />
                      </Button>
                    </td>
                  </tr>
                )})
              )}
            </tbody>
          </table>
        </Box>
      </Box>
      {typeof window !== "undefined" &&
        abertoId &&
        funcionarioSelecionado &&
        menuPos &&
        createPortal(
          <Box
            position="fixed"
            top={`${menuPos.top}px`}
            left={`${menuPos.left}px`}
            transform="translateX(-100%)"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="md"
            minW="150px"
            zIndex={2000}
          >
            <Box px={3} py={2} cursor="pointer" _hover={{ bg: "gray.50" }} onClick={() => onExibir(funcionarioSelecionado)}>
              Exibir dados
            </Box>
            <Box px={3} py={2} cursor="pointer" _hover={{ bg: "gray.50" }} onClick={() => onEditar(funcionarioSelecionado)}>
              Editar
            </Box>
            <Box px={3} py={2} cursor="pointer" color="red.500" _hover={{ bg: "red.50" }} onClick={() => onExcluir(funcionarioSelecionado)}>
              Excluir
            </Box>
          </Box>,
          document.body
        )}
    </Box>
  );
}
