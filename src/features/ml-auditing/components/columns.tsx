import { createColumnHelper } from "@tanstack/react-table"

import type { BatchPredictionLog } from "../types"
import type { DataTableFeatures } from "./data-table-features"
import { ConfidenceCell } from "./confidence-cell"
import { ErrorCell } from "./error-cell"
import { ResultBadge } from "./result-badge"

const columnHelper = createColumnHelper<DataTableFeatures, BatchPredictionLog>()

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "BATCH ID",
    cell: ({ getValue }) => (
      <span className="font-medium text-primary">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("date", {
    header: "DATE",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground tabular-nums">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("ldpeKg", {
    header: "LDPE (KG)",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{getValue().toFixed(1)}</span>
    ),
  }),
  columnHelper.accessor("fillerKg", {
    header: "FILLER (KG)",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{getValue().toFixed(1)}</span>
    ),
  }),
  columnHelper.accessor("tempCelsius", {
    header: "TEMP°C",
    cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span>,
  }),
  columnHelper.accessor("psi", {
    header: "PSI",
    cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span>,
  }),
  columnHelper.accessor("predictedMpa", {
    header: "PREDICTED MPA",
    cell: ({ getValue }) => (
      <span className="font-medium tabular-nums">{getValue().toFixed(2)}</span>
    ),
  }),
  columnHelper.accessor("actualMpa", {
    header: "ACTUAL MPA",
    cell: ({ getValue, row }) => {
      const isPass = row.original.result === "PASS"
      return (
        <span
          className={
            isPass
              ? "font-medium text-green-600 tabular-nums dark:text-green-400"
              : "font-medium text-red-600 tabular-nums dark:text-red-400"
          }
        >
          {getValue().toFixed(2)}
        </span>
      )
    },
  }),
  columnHelper.accessor("error", {
    header: () => (
      <span>
        <span className="font-normal">ERROR</span>
      </span>
    ),
    cell: ({ getValue }) => <ErrorCell value={getValue()} />,
  }),
  columnHelper.accessor("confidence", {
    header: "CONFIDENCE",
    cell: ({ getValue }) => <ConfidenceCell value={getValue()} />,
  }),
  columnHelper.accessor("modelVersion", {
    header: "MODEL",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("result", {
    header: "RESULT",
    cell: ({ getValue }) => <ResultBadge result={getValue()} />,
  }),
])
