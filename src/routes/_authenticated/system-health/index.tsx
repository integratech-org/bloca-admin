import { PageHeader } from "@/components/page-header"
import { StatsGrid } from "@/features/system-health/components/stats-grid"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/system-health/")({
  component: SystemHealthPage,
})

function SystemHealthPage() {
  return (
    <div className="flex flex-col gap-8 lg:flex-1 lg:self-start">
      <PageHeader
        eyebrow="Hardware Monitoring"
        title="System Health & Maintenance"
        description="Edge device diagnostics · BLOCA Physical Unit v2.1 · Last synced 7 min ago"
      />

      <div className="flex flex-col gap-6">
        <StatsGrid />
      </div>
    </div>
  )
}
