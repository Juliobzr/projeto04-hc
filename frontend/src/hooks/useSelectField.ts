import { createListCollection } from "@chakra-ui/react"
import { useMemo } from "react"
import { SelectOption } from "../types/SelectField"

export function useSelectField(options: SelectOption[]) {
  const collection = useMemo(
    () => createListCollection({ items: options }),
    [options]
  )

  return { collection }
}