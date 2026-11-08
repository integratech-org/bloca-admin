import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ActivityStatus } from "../types/activity"

const activityStatusBadgeVariants = cva("", {
  variants: {
    status: {
      "In Progress":
        "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      Completed:
        "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
      "Emergency Stop":
        "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    },
  },
})

interface ActivityStatusBadgeProps extends VariantProps<
  typeof activityStatusBadgeVariants
> {
  status: ActivityStatus
}

export function ActivityStatusBadge({ status }: ActivityStatusBadgeProps) {
  return (
    <Badge className={cn(activityStatusBadgeVariants({ status }))}>
      {status}
    </Badge>
  )
}
