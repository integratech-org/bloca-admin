import { cva, type VariantProps } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CVInspectionStatus } from "../types/activity"

const cvInspectionBadgeVariants = cva("", {
  variants: {
    status: {
      Pending:
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
      Successful:
        "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
      Unsuccessful: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    },
  },
})

interface CVInspectionBadgeProps extends VariantProps<
  typeof cvInspectionBadgeVariants
> {
  status: CVInspectionStatus
}

export function CVInspectionBadge({ status }: CVInspectionBadgeProps) {
  return (
    <Badge className={cn(cvInspectionBadgeVariants({ status }))}>
      {status}
    </Badge>
  )
}
