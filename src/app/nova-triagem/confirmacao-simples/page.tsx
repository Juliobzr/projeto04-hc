"use client";

import NavigationActionsView from "@/components/novaTriagem/NavigationActionsView";
import { useNavigationActions } from "@/hooks/useNavigationActions";

export default function ConfirmationPage() {
  const props = useNavigationActions();
  return <NavigationActionsView {...props} />;
}
