import { Badge } from "@/components/ui/badge"

import type { DiagnosticStatus } from "../types"

const statusColors: Record<DiagnosticStatus, string> = {
  normal: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  warning:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  error: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
}

const statusLabels: Record<DiagnosticStatus, string> = {
  normal: "Normal",
  warning: "Warning",
  error: "Error",
}

interface StatusBadgeProps {
  status: DiagnosticStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
}
