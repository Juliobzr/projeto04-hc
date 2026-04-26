"use client";

import SignUpView from "@/components/cadastro/SignUpView";
import { useSignUp } from "@/hooks/useSignUp";

export default function SignUpPage() {
  const props = useSignUp();
  return <SignUpView {...props}/>;
}