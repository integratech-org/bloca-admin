import { createColumnHelper } from "@tanstack/react-table"
import type { Machine } from "@/types/api"
import { MachinesRowActions } from "./machines-row-actions"
import { TokenStatusBadge } from "./token-status-badge"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import type { DataTableFeatures } from "@/components/data-table/data-table-features"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Machine>()

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Machine",
    meta: { skeleton: <Skeleton className="h-5 w-32" /> },
  }),
  columnHelper.accessor("site", {
    header: "Site",
    meta: { skeleton: <Skeleton className="h-5 w-24" /> },
  }),
  columnHelper.accessor("token_status", {
    header: "Token",
    cell: ({ getValue }) => <TokenStatusBadge status={getValue()} />,
    meta: { skeleton: <Skeleton className="h-5 w-16 rounded-full" /> },
  }),
  columnHelper.accessor("created_at", {
    header: "Created",
    cell: ({ getValue }) => format(getValue(), "dd MMM yyyy, HH:mm:ss"),
    meta: { skeleton: <Skeleton className="h-5 w-28" /> },
  }),
  columnHelper.accessor("deleted_at", {
    header: "Deleted",
    cell: ({ getValue }) => {
      const value = getValue()
      if (!value) return "—"
      return format(value, "dd MMM yyyy, HH:mm:ss")
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <MachinesRowActions machine={row.original} />
      </div>
    ),
    meta: { skeleton: <Skeleton className="ml-auto size-8" /> },
  }),
])
