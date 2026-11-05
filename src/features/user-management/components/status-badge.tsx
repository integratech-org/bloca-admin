import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// TODO: Import UserStatus from ../types when feat/user-mock-data branch merges
type UserStatus = "active" | "pending" | "disabled"

const statusLabels: Record<UserStatus, string> = {
  active: "Active",
  pending: "Pending",
  disabled: "Disabled",
}

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      active:
        "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
      pending:
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
      disabled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    },
  },
})

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  status: UserStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={cn(statusBadgeVariants({ status }))}>
      {statusLabels[status]}
    </Badge>
  )
}
