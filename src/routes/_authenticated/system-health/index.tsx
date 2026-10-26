import { PageHeader } from "@/components/page-header"
import { StatsGrid } from "@/features/system-health/components/stats-grid"
import { DiagnosticsPanel } from "@/features/system-health/components/diagnostics-panel"
import { DiagnosticsPagination } from "@/features/system-health/components/diagnostics-pagination"
import { createFileRoute } from "@tanstack/react-router"

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
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Filtration Lifespan
          </p>
          <StatsGrid />
        </section>

        <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
          <DiagnosticsPanel />
          <DiagnosticsPagination />
        </div>
      </div>
    </div>
  )
}
