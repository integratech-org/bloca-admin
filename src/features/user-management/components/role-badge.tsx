import { Badge } from "@/components/ui/badge"

// TODO: Import UserRole from ../types when feat/user-mock-data branch merges
type UserRole = "system_admin" | "barangay_admin" | "operator"

const roleLabels: Record<UserRole, string> = {
  system_admin: "System Admin",
  barangay_admin: "Barangay Admin",
  operator: "Operator",
}

const roleColors: Record<UserRole, string> = {
  system_admin: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  barangay_admin: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  operator: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
}

interface RoleBadgeProps {
  role: UserRole
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return <Badge className={roleColors[role]}>{roleLabels[role]}</Badge>
}
