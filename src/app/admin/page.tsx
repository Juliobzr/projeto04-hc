"use client";

import AdminView from "@/components/admin/AdminView";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminPage() {
  const props = useAdmin();
  return <AdminView {...props} />;
}
