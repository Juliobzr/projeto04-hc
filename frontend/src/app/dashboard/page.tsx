"use client";

import DashboardView from "@/components/dashboard/DashboardView";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const props = useDashboard();
  return <DashboardView {...props} />;
}
