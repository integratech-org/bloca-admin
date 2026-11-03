import { Badge } from "@/components/ui/badge"

// TODO: Import UserStatus from ../types when feat/user-mock-data branch merges
type UserStatus = "active" | "pending" | "disabled"

const statusLabels: Record<UserStatus, string> = {
  active: "Active",
  pending: "Pending",
  disabled: "Disabled",
}

const statusColors: Record<UserStatus, string> = {
  active: "bg-green-500/10 text-green-700 dark:text-green-400",
  pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  disabled: "bg-red-500/10 text-red-700 dark:text-red-400",
}

interface StatusBadgeProps {
  status: UserStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
}
