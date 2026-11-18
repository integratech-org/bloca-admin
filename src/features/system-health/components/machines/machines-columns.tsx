import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"
import type { Machine } from "@/types/api"
import { MachinesRowActions } from "./machines-row-actions"
import { TokenStatusBadge } from "./token-status-badge"
import { formatDistanceToNow } from "date-fns"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Machine>()

export const machinesColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Machine",
  }),
  columnHelper.accessor("site", {
    header: "Site",
  }),
  columnHelper.accessor("token_status", {
    header: "Token",
    cell: ({ getValue }) => <TokenStatusBadge status={getValue()} />,
  }),
  columnHelper.accessor("created_at", {
    header: "Created",
    cell: ({ getValue }) =>
      formatDistanceToNow(getValue(), { addSuffix: true }),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <MachinesRowActions machine={row.original} />
      </div>
    ),
    meta: { headerClassName: "w-12", cellClassName: "w-12" },
  }),
])
