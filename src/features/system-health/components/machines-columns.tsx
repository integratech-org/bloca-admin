import { createColumnHelper } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MachineActions } from "./machine-actions"
import type { MachinesDataTableFeatures } from "./machines-data-table-features"
import type { Machine, TokenStatus } from "../types"

const columnHelper = createColumnHelper<MachinesDataTableFeatures, Machine>()

const tokenStatusConfig: Record<
  TokenStatus,
  { className: string; label: string }
> = {
  Active: {
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    label: "Active",
  },
  Revoked: {
    className: "bg-destructive/10 text-destructive",
    label: "Revoked",
  },
  "Not Issued": {
    className: "bg-muted text-muted-foreground",
    label: "Not Issued",
  },
}

export const machinesColumns = columnHelper.columns([
  // Machine Column
  columnHelper.accessor("name", {
    header: "Machine",
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
  }),
  // Site Column
  columnHelper.accessor("site", {
    header: "Site",
    cell: ({ getValue }) => getValue(),
  }),
  // Token Column
  columnHelper.accessor("tokenStatus", {
    header: "Token",
    cell: ({ getValue }) => {
      const status = getValue()
      const config = tokenStatusConfig[status]
      return (
        <Badge className={cn("font-mono", config.className)}>
          {config.label}
        </Badge>
      )
    },
  }),
  // Last synced Column
  columnHelper.accessor("lastSynced", {
    header: "Last synced",
    cell: ({ getValue, row }) => {
      const date = new Date(getValue())
      const relativeTime = formatDistanceToNow(date, { addSuffix: true })

      // Check if stale (more than 1 day) or revoked
      const isStale = Date.now() - date.getTime() > 24 * 60 * 60 * 1000
      const isRevoked = row.original.tokenStatus === "Revoked"

      return (
        <span className={isStale || isRevoked ? "text-destructive" : ""}>
          {relativeTime}
        </span>
      )
    },
  }),
  // Actions Column
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => <MachineActions />,
  }),
])
