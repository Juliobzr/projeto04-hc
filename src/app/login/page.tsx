"use client";

import LoginView from "@/components/login/LoginView";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const props = useLogin();
  return <LoginView {...props}/>
}