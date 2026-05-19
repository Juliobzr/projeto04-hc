export type SelectOption = {
  label: string
  value: string
}

export type SelectFieldProps = {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}