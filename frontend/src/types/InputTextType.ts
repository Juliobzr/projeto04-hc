import { InputProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type InputTextProps = InputProps & {
  icon?: ReactNode;
  label?: string;
};

export default InputTextProps;