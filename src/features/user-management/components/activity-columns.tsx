import { createColumnHelper } from "@tanstack/react-table"
import type { DataTableFeatures } from "./data-table-features"
import type { BatchActivity } from "../types/activity"
import { CVInspectionBadge } from "./cv-inspection-badge"
import { ActivityStatusBadge } from "./activity-status-badge"

const columnHelper = createColumnHelper<DataTableFeatures, BatchActivity>()

// Format time as "4:11 PM"
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

// Format predictive strength
const formatPredictiveStrength = (activity: BatchActivity) => {
  if (activity.isPending) return "Pending"
  if (activity.predictiveStrength === null) return "N/A"
  return `${activity.predictiveStrength.toFixed(1)} MPa`
}

export const activityColumns = columnHelper.columns([
  columnHelper.accessor("time", {
    header: "Time",
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap">{formatTime(getValue())}</span>
    ),
  }),
  columnHelper.accessor("batchId", {
    header: "Batch ID",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs whitespace-nowrap">{getValue()}</span>
    ),
  }),
  columnHelper.display({
    id: "ldpeSand",
    header: "LDPE:SAND",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {row.original.ldpe}:{row.original.sand}
      </span>
    ),
  }),
  columnHelper.display({
    id: "predictiveStrength",
    header: "Predictive Strength",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatPredictiveStrength(row.original)}
      </span>
    ),
  }),
  columnHelper.accessor("cvInspection", {
    header: "CV Inspection",
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap">
        <CVInspectionBadge status={getValue()} />
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => (
      <span className="whitespace-nowrap">
        <ActivityStatusBadge status={getValue()} />
      </span>
    ),
  }),
])
