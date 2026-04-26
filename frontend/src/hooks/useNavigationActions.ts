"use client";

import { useRouter } from "next/navigation";

export function useNavigationActions() {
  const router = useRouter();

  return {
    onVoltar: () => router.back(),
    onInicio: () => router.push("/dashboard"),
  };
}
