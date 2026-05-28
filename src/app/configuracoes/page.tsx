"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SettingsView from "@/components/configuracoes/SettingsView";
import { useSettings } from "@/hooks/useSettings";
import { LoggedUser } from "@/types/User";

export default function SettingsPage() {
  const props = useSettings();
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario_logado");

    if (!usuarioSalvo) {
      router.push("/login");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo) as LoggedUser;
    if (usuario.role !== "GESTOR") {
      router.push("/inicio");
      return;
    }

    setAutorizado(true);
  }, [router]);

  if (!autorizado) return null;

  return <SettingsView {...props} />;
}
