"use client";

import SettingsView from "@/components/configuracoes/SettingsView";
import { useSettings } from "@/hooks/useSettings";

export default function SettingsPage() {
  const props = useSettings();
  return <SettingsView {...props} />;
}
