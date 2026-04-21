'use client'

import { Button } from '@chakra-ui/react'
import { LoadingButtonProps } from '@/types/LoadingButtonType'


export function LoadingButton({
  children,
  loading = false,
  loadingText = 'Carregando...',
  type = 'button',
  colorPalette = 'blue',
  size = 'md',
  onClick,
  disabled,
}: LoadingButtonProps) {
  return (
    <Button
      borderRadius="0.75rem"
      px={10}
      type={type}
      colorPalette={colorPalette}
      size={size}
      loading={loading}
      loadingText={loadingText}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
    </Button>
  )
}