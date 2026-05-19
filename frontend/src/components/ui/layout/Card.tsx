'use client'

import { Box } from "@chakra-ui/react";

export default function Card({ children }: { children: React.ReactNode }) {
  return(
    <Box
      p={8}
      borderRadius="xl"
      bg="white"
    >
      {children}
    </Box>
  )
}