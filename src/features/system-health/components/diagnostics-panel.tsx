import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DataTable } from "./data-table"
import { diagnosticsColumns } from "./diagnostics-columns"
import { DiagnosticsStatusFilter } from "./diagnostics-status-filter"
import { mockDiagnosticLogs } from "../data/mock-logs"

export function DiagnosticsPanel() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLogs =
    statusFilter === "all"
      ? mockDiagnosticLogs
      : mockDiagnosticLogs.filter((log) => log.status === statusFilter)

  return (
    <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
      <div className="flex flex-col lg:min-h-0 lg:flex-1">
        {/* Panel header: title + filter */}
        <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-4">
          <div>
            <h3 className="font-heading text-base font-semibold">
              Hardware Diagnostics Log
            </h3>
            <p className="text-sm text-muted-foreground">
              ESP32 &amp; Raspberry Pi sensor readings
            </p>
          </div>
          <DiagnosticsStatusFilter
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        <DataTable columns={diagnosticsColumns} data={filteredLogs} />
      </div>
    </Card>
  )
}
