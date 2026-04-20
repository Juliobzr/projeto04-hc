'use client'

import { Field, Input } from "@chakra-ui/react";
import InputTextProps from "@/types/InputTextType";

export default function InputText({ placeholder, icon, label, ...rest }: InputTextProps) {
  return (
    <Field.Root>
      {label && (
        <Field.Label className="text-sm font-medium text-gray-700">
          {label}
        </Field.Label>
      )}

      <div className="relative flex items-center w-full">
        {icon && (
          <span className="absolute left-3 text-gray-400 z-10">
            {icon}
          </span>
        )}

        <Input
            bg="white"
             border="1px solid"
             borderColor="gray.300"
            _focus={{ borderColor: "gray.800", boxShadow: "0 0 0 1px #2D3748" }} // <-- Isso tira o anel azul e coloca um cinza escuro
             {...rest}
        />

      </div>
    </Field.Root>
  );
}