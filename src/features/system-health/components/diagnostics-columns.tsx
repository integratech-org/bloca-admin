import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DataTableFeatures } from "./data-table-features"
import type { DiagnosticLog, DiagnosticStatus } from "../types"

// ---- Status display config ----

const statusConfig: Record<DiagnosticStatus, { badge: string; label: string }> =
  {
    normal: {
      badge: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
      label: "Normal",
    },
    warning: {
      badge:
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
      label: "Warning",
    },
    error: {
      badge: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
      label: "Error",
    },
  }

// Reading text color when out of range
const readingColorClass: Record<DiagnosticStatus, string> = {
  normal: "",
  warning: "text-orange-600 dark:text-orange-400",
  error: "text-red-600 dark:text-red-400",
}

// ---- Column definitions ----

const columnHelper = createColumnHelper<DataTableFeatures, DiagnosticLog>()

export const diagnosticsColumns = columnHelper.columns([
  columnHelper.accessor("timestamp", {
    header: "Timestamp ↓",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
        {getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("device", {
    header: "Device",
    cell: ({ getValue }) => (
      <Badge className="bg-primary/10 font-mono text-xs text-primary">
        {getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("sensor", {
    header: "Sensor",
    cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
  }),
  columnHelper.accessor("reading", {
    header: "Reading",
    cell: ({ getValue, row }) => {
      const status = row.original.status
      return (
        <span
          className={cn(
            "font-mono text-sm font-medium",
            readingColorClass[status]
          )}
        >
          {getValue()}
        </span>
      )
    },
  }),
  columnHelper.accessor("normalRange", {
    header: "Normal Range",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {getValue() ?? "—"}
      </span>
    ),
  }),
  columnHelper.accessor("power", {
    header: "Power",
    cell: ({ getValue }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {getValue() ?? "—"}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const config = statusConfig[getValue()]
      return <Badge className={config.badge}>{config.label}</Badge>
    },
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground">{getValue() ?? "—"}</span>
    ),
  }),
])
