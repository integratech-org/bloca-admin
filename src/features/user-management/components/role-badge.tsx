import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// TODO: Import UserRole from ../types when feat/user-mock-data branch merges
type UserRole = "system_admin" | "barangay_admin" | "operator"

const roleLabels: Record<UserRole, string> = {
  system_admin: "System Admin",
  barangay_admin: "Barangay Admin",
  operator: "Operator",
}

const roleBadgeVariants = cva("", {
  variants: {
    role: {
      system_admin:
        "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      barangay_admin:
        "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      operator: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
    },
  },
})

interface RoleBadgeProps extends VariantProps<typeof roleBadgeVariants> {
  role: UserRole
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge className={cn(roleBadgeVariants({ role }))}>
      {roleLabels[role]}
    </Badge>
  )
}
