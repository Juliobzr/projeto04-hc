'use client'

import { useState, useEffect } from 'react'
import { 
  Flex, Text, VStack, HStack, IconButton, 
  Drawer, useBreakpointValue, Box 
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
// IMPORTANTE: Adicionamos o FiX aqui para o botão de fechar
import { FiMenu, FiGrid, FiFileText, FiUsers, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi"
import Image from "next/image"
import Logo from '@/assets/logo.png'
import SidebarLink from './SidebarLink'
import { logout } from '@/services/auth'
import { LoggedUser } from '@/types/User'

const NAV_ITEMS_BASE = [
  { label: 'Início', href: '/inicio', icon: <FiGrid size={20} /> },
  { label: 'Nova Triagem', href: '/nova-triagem', icon: <FiFileText size={20} /> },
  { label: 'Pacientes', href: '/pacientes', icon: <FiUsers size={20} /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const [open, setOpen] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [role, setRole] = useState<LoggedUser["role"] | null>(null)
  
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    setIsMounted(true)
    const usuarioSalvo = localStorage.getItem("usuario_logado")
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo) as LoggedUser
      setRole(usuario.role)
    }

    const savedState = localStorage.getItem("sidebar_recolhida")
    if (savedState !== null) {
      setOpen(savedState === "true")
    }
  }, [])

  const navItems = [
    ...NAV_ITEMS_BASE,
    ...(role === "GESTOR"
      ? [
          { label: 'Admin', href: '/admin', icon: <FiUsers size={20} /> },
        ]
      : []),
  ]

  const handleToggle = () => {
    const newState = !open
    setOpen(newState)
    localStorage.setItem("sidebar_recolhida", String(newState))
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const SidebarContent = () => (
    <Flex direction="column" h="full" py={6} px={4}>
      
      {/* HEADER DA SIDEBAR: Agora possui flex para separar o Logo do Botão "X" */}
      <HStack px={2} mb={8} justify="space-between" w="100%">
        <HStack gap={2} justify={!open && !isMobile ? "center" : "flex-start"} w={!open && !isMobile ? "100%" : "auto"}>
          <Image src={Logo} alt="Logo" width={40} height={40} />
          {(open || isMobile) && (
            <Text fontWeight="700" fontSize="lg" color="gray.800">HC</Text>
          )}
        </HStack>

        {/* BOTÃO DE FECHAR (Aparece apenas na visão mobile) */}
        {isMobile && (
          <IconButton 
            variant="ghost" 
            size="sm" 
            onClick={() => setOpen(false)} 
            aria-label="Fechar menu"
          >
            <FiX size={22} color="gray.600" />
          </IconButton>
        )}
      </HStack>

      <VStack gap={1} align="stretch" flex={1}>
        {navItems.map((item) => (
          <SidebarLink
            key={item.href}
            icon={item.icon}
            label={(open || isMobile) ? item.label : ""}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </VStack>

      <Flex
        as="button"
        align="center"
        justify={!open && !isMobile ? "center" : "flex-start"}
        gap={3}
        px={4}
        py={3}
        borderRadius="xl"
        color="red.400"
        onClick={handleLogout}
        _hover={{ bg: 'red.50', color: 'red.500' }}
        transition="all 0.2s"
      >
        <FiLogOut size={20} />
        {(open || isMobile) && <Text fontSize="sm">Sair</Text>}
      </Flex>
    </Flex>
  )

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          variant="ghost"
          position="absolute"
          top={4}
          left={4}
          zIndex={20}
        >
          <FiMenu size={24} />
        </IconButton>

        {isMounted && (
          <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
            {/* Forçamos posições absolutas e fixas para garantir que a gaveta flutue e não desmonte a tela */}
            <Drawer.Backdrop position="fixed" top={0} left={0} w="100vw" h="100vh" zIndex={1300} />
            <Drawer.Content 
              bg="white" 
              maxW="250px" 
              h="100vh" 
              m={0} 
              borderRadius={0}
              position="fixed"
              top={0}
              left={0}
              zIndex={1400}
              boxShadow="2xl"
            >
              <SidebarContent />
            </Drawer.Content>
          </Drawer.Root>
        )}
      </>
    )
  }

  return (
    <Box
      w={open ? "240px" : "80px"}
      bg="white"
      borderRight="1px solid"
      borderColor="gray.100"
      transition="width 0.3s ease"
      position="relative"
    >
      <SidebarContent />
      <IconButton
        aria-label="Recolher menu"
        onClick={handleToggle}
        size="xs"
        position="absolute"
        right="-12px"
        top="36px"
        borderRadius="full"
        boxShadow="md"
        bg="white"
        _hover={{ bg: "gray.50" }}
      >
        {open ? <FiChevronLeft /> : <FiChevronRight />}
      </IconButton>
    </Box>
  )
}