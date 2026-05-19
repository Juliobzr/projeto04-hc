'use client'

import { Box } from "@chakra-ui/react";

export default function Card({ children }: { children: React.ReactNode }) {
  return(
    <Box
      p={{ base: 4, md: 8 }}
      borderRadius="xl"
      bg="white"
      w="100%"
    >
      {children}
    </Box>
  )
}