import { createColumnHelper } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"
import type { User } from "@/types/api"
import type { DataTableFeatures } from "@/components/data-table/data-table-features"
import { RoleBadge } from "./role-badge"
import { StatusBadge } from "./status-badge"
import { UserActions } from "./user-actions"

const columnHelper = createColumnHelper<DataTableFeatures, User>()

export const columns = columnHelper.columns([
  // User Column (firstname + lastname + email)
  columnHelper.accessor("first_name", {
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {/* Avatar circle */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
          {row.original.first_name?.[0] ?? ""}
          {row.original.last_name?.[0] ?? ""}
        </div>

        {/* Name + Email */}
        <div className="flex flex-col">
          <span className="font-medium">
            {row.original.first_name} {row.original.last_name}
          </span>
          <span className="text-sm text-muted-foreground">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
  }),
  // Role Column
  columnHelper.accessor("role", {
    header: "Role",
    cell: ({ getValue }) => <RoleBadge role={getValue()} />,
  }),
  // Status Column
  columnHelper.accessor("is_active", {
    header: "Status",
    cell: ({ getValue }) => (
      <StatusBadge status={getValue() ? "Active" : "Inactive"} />
    ),
  }),
  // Last Active Column
  columnHelper.accessor("last_login", {
    header: "Last Active",
    cell: ({ getValue }) => {
      const lastLogin = getValue()
      if (!lastLogin)
        return <span className="text-muted-foreground">Never</span>
      const date = new Date(lastLogin)
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      )
    },
  }),
  // Created At Column
  columnHelper.accessor("date_joined", {
    header: "Joined",
    cell: ({ getValue }) => {
      const dateJoined = getValue()
      if (!dateJoined) return null
      const date = new Date(dateJoined)
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
  // Actions Column
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  }),
])
