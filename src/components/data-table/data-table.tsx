import type { ColumnDef, RowData } from "@tanstack/react-table"
import { useTable } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { DataTableFeatures } from "./data-table-features"
import { features } from "./data-table-features"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/lib/utils"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  isLoading?: boolean
  isDimmed?: boolean
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  isLoading,
  isDimmed,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  return (
    <div className="scrollbar-thin lg:min-h-0 lg:flex-1 lg:overflow-auto">
      <Table containerClassName="lg:overflow-visible">
        <TableHeader className="sticky top-0 z-10 bg-card shadow-[0_1px_0_var(--border)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          className={cn(
            "transition-opacity",
            isDimmed && "pointer-events-none opacity-50"
          )}
        >
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="odd:bg-card even:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
