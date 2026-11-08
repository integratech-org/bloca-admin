import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { UserRole } from "../types"

const roleLabels: Record<UserRole, string> = {
  Admin: "Admin",
  Operator: "Operator",
}

const roleBadgeVariants = cva("", {
  variants: {
    role: {
      Admin:
        "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      Operator: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
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
