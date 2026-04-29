import {
  SelectContent,
  SelectItem,
  SelectPositioner,
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
      positioning={{ placement: "bottom", flip: true, sameWidth: true }}
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
      <SelectPositioner>
        <SelectContent borderColor="gray.200" boxShadow="sm" bg="white">
          {collection.items.map((opt) => (
            <SelectItem key={opt.value} item={opt} borderColor="gray.200" bg="white" _hover={{ bg: "gray.100" }}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </SelectRoot>
  )
}