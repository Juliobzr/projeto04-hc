type LoadingButtonProps = {
  children: React.ReactNode
  loading?: boolean
  loadingText?: string
  type?: 'submit' | 'button' | 'reset'
  colorPalette?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  width?: string
  onClick?: () => void
  disabled?: boolean
}

export default LoadingButtonProps