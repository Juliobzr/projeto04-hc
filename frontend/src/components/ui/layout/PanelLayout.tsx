"use client";

import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Se estivermos na tela de Login ou na raiz, não mostra o painel
  if (pathname === "/login" || pathname === "/") {
    return <>{children}</>;
  }

  // Para todas as outras páginas, o painel fica fixo e só o {children} (miolo) recarrega
  return (
    <Flex minH="100vh" bg="#f4f5f9" direction={{ base: "column", md: "row" }}>
      <Sidebar />
      <Flex flex={1} direction="column" overflowX="hidden">
        <Header />
        {children}
      </Flex>
    </Flex>
  );
}