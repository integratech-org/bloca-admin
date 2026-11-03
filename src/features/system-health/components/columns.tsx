import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

import type { DataTableFeatures } from "./data-table-features"
import type { DiagnosticLog } from "../types"
import { ReadingCell } from "./reading-cell"
import { StatusBadge } from "./status-badge"

const columnHelper = createColumnHelper<DataTableFeatures, DiagnosticLog>()

export const columns = columnHelper.columns([
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
    cell: ({ getValue, row }) => (
      <ReadingCell value={getValue()} status={row.original.status} />
    ),
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
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground">{getValue() ?? "—"}</span>
    ),
  }),
])
