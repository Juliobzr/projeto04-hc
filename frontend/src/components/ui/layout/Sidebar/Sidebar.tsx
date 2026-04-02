'use client'

import { Flex, Text, VStack, HStack } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import SidebarLink from './SidebarLink'
import Logo from '@/assets/logo.png'
import Image from "next/image";
import SidebarLinkProps from '@/types/SidebarLinkType'
import { logout } from '@/app/mock/auth'


const NAV_ITEMS: SidebarLinkProps[] = [
  { label: 'Início',        href: '/dashboard',      icon: "" },
  { label: 'Nova Triagem',  href: '/pacientes',      icon: "" },
  { label: 'Pacientes',     href: '/pacientes/lista',icon: "" },
  { label: 'Configurações', href: '/configuracoes',  icon: "" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <Flex
      direction="column"
      h="100vh"
      w="220px"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.100"
      py={6}
      px={4}
      flexShrink={0}
    >
      <HStack gap={2} px={2} mb={8}>
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <Text fontWeight="700" fontSize="lg" color="gray.800">
          HC
        </Text>
      </HStack>

      <VStack gap={1} align="stretch" flex={1}>
        {NAV_ITEMS.map((item) => (
          <SidebarLink
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
</VStack>

      <Flex
        as="button"
        align="center"
        gap={3}
        px={4}
        py={3}
        borderRadius="xl"
        color="red.400"
        fontSize="sm"
        onClick={handleLogout}
        cursor="pointer"
        w="full"
        transition="all 0.15s"
        _hover={{ bg: 'red.50', color: 'red.500' }}
      >
        
        <Text>Sair</Text>
      </Flex>
    </Flex>
  )
}