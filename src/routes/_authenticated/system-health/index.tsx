import { createFileRoute } from "@tanstack/react-router"

import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { columns } from "@/features/system-health/components/columns"
import { DataTable } from "@/features/system-health/components/data-table"
import { DiagnosticsFilters } from "@/features/system-health/components/filters"
import { DiagnosticsPagination } from "@/features/system-health/components/pagination"
import { StatsGrid } from "@/features/system-health/components/stats-grid"
import { mockDiagnosticLogs } from "@/features/system-health/data/mock-logs"

export const Route = createFileRoute("/_authenticated/system-health/")({
  component: SystemHealthPage,
})

function SystemHealthPage() {
  return (
    <div className="flex flex-col gap-8 lg:min-h-0 lg:flex-1">
      <PageHeader
        eyebrow="Hardware Monitoring"
        title="System Health & Maintenance"
        description="Edge device diagnostics · BLOCA Physical Unit v2.1 · Last synced 7 min ago"
      />

      <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1">
        <section className="flex flex-col gap-3">
          <p className="font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Filtration Lifespan
          </p>
          <StatsGrid />
        </section>

        <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
          {/* Title and filter moved outside table per SE feedback */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-heading text-base font-semibold">
                Hardware Diagnostics Log
              </h3>
              <p className="text-sm text-muted-foreground">
                ESP32 &amp; Raspberry Pi sensor readings
              </p>
            </div>
            <DiagnosticsFilters />
          </div>

          <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
            <DataTable columns={columns} data={mockDiagnosticLogs} />
          </Card>

          <DiagnosticsPagination />
        </div>
      </div>
    </div>
  )
}
