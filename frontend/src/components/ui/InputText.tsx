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
          pl={icon ? "2.5rem" : "1rem"}
          placeholder={placeholder}
          size="md"
          bg="#eff1f999"
          border="none"
          {...rest}
        />
      </div>
    </Field.Root>
  );
}