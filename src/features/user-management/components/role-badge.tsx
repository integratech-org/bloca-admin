import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { UserRole } from "../types"
import type { Role } from "@/types/api"

const roleLabels: Record<UserRole, string> = {
  system_admin: "System Admin",
  admin: "Admin",
  operator: "Operator",
}

const roleBadgeVariants = cva("", {
  variants: {
    role: {
      system_admin: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
      admin:
        "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      operator: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
    },
  },
})

interface RoleBadgeProps extends VariantProps<typeof roleBadgeVariants> {
  role: Role | null | undefined
}

export function RoleBadge({ role }: RoleBadgeProps) {
  if (!role) return <span className="text-muted-foreground">-</span>

  return (
    <Badge className={cn(roleBadgeVariants({ role }))}>
      {roleLabels[role]}
    </Badge>
  )
}
