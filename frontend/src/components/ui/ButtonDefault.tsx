'use client'

import { Button } from '@chakra-ui/react'
import LoadingButtonProps from '@/types/LoadingButtonType'


export function LoadingButton({
  children,
  loading = false,
  loadingText = 'Carregando...',
  type = 'button',
  colorPalette = 'blue',
  size = 'md',
  width = 'full',
  onClick,
  disabled,
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      colorPalette={colorPalette}
      size={size}
      loading={loading}
      loadingText={loadingText}
      w={width}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
    </Button>
  )
}