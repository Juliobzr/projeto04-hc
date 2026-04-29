import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react"
import { useSelectField } from "@/hooks/useSelectField"
import { SelectFieldProps } from "@/types/SelectField"

export function SelectField({ options, value, onChange, placeholder = "Selecione..." }: SelectFieldProps) {
  const { collection } = useSelectField(options)

  return (
    <SelectRoot
      collection={collection}
      value={[value]}
      onValueChange={(e) => onChange(e.value[0])}
      w="full"
    >
      <SelectTrigger
        px={3}
        py={2.5}
        fontSize="sm"
        borderColor="gray.200"
        borderRadius="xl"
        bg="gray.50"
        color="gray.700"
        cursor="pointer"
      >
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((opt) => (
          <SelectItem key={opt.value} item={opt}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}