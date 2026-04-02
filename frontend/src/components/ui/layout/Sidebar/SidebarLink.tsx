"use client";

import { Flex, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import SidebarLinkProps from "@/types/SidebarLinkType";


export default function SidebarLink({
  icon,
  label,
  href,
  active = false,
}: SidebarLinkProps) {
  const router = useRouter();

  return (
    <Flex
      as="button"
      onClick={() => router.push(href)}
      align="center"
      gap={3}
      w="full"
      px={4}
      py={3}
      borderRadius="xl"
      bg={active ? "blue.500" : "transparent"}
      color={active ? "white" : "gray.600"}
      fontWeight={active ? "500" : "400"}
      fontSize="sm"
      cursor="pointer"
      transition="all 0.15s"
      _hover={active ? {} : { bg: "gray.100", color: "gray.800" }}
    >
      <Box flexShrink={0}>{icon}</Box>
      <Text>{label}</Text>
    </Flex>
  );
}