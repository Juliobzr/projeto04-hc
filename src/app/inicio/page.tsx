"use client";

import MainScreenView from "@/components/inicio/MainScreenView";
import { useMainScreen } from "@/hooks/useMainScreen";

export default function MainScreenPage() {
  const props = useMainScreen();
  return <MainScreenView {...props} />;
}
