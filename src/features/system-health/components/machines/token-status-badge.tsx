import { Badge } from "@/components/ui/badge"
import type { TokenStatus } from "@/types/api"
import { cva, type VariantProps } from "class-variance-authority"

const tokenStatusBadgeVariants = cva("", {
  variants: {
    status: {
      active:
        "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
      revoked: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
      not_issued:
        "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
    },
  },
  defaultVariants: {
    status: "not_issued",
  },
})

const statusLabels = {
  active: "Active",
  revoked: "Revoked",
  not_issued: "Not issued",
}

type Props = VariantProps<typeof tokenStatusBadgeVariants> & {
  status: TokenStatus
}

export function TokenStatusBadge({ status }: Props) {
  return (
    <Badge className={tokenStatusBadgeVariants({ status })}>
      {statusLabels[status]}
    </Badge>
  )
}
