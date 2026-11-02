import { createColumnHelper } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"

import type { User } from "../types"
import type { DataTableFeatures } from "./data-table-features"
import { RoleBadge } from "./role-badge"
import { StatusBadge } from "./status-badge"
import { UserActions } from "./user-actions"

const columnHelper = createColumnHelper<DataTableFeatures, User>()

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: ({ getValue }) => <RoleBadge role={getValue()} />,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  }),
  columnHelper.accessor("lastActive", {
    header: "Last Active",
    cell: ({ getValue }) => {
      const date = new Date(getValue())
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      )
    },
  }),
  columnHelper.accessor("createdDate", {
    header: "Joined",
    cell: ({ getValue }) => {
      const date = new Date(getValue())
      return (
        <span className="text-sm text-muted-foreground tabular-nums">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  }),
])
