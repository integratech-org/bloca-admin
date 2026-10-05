import { PageHeader } from "@/components/page-header"
import { BrickProductionChart } from "@/features/overview/components/brick-production-chart"
import { StatsGrid } from "@/features/overview/components/stats-grid"
import { WasteDiversionChart } from "@/features/overview/components/waste-diversion-chart"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/")({
  component: OverviewPage,
})

function OverviewPage() {
  return (
    <div className="flex h-full flex-col gap-8">
      <PageHeader
        eyebrow="Global Impact Overview"
        title="Environmental Dashboard"
        description="Bagong Silang BLOCA Program · Caloocan City · August 11, 2026"
      />

      <div className="flex h-full flex-col gap-6">
        <StatsGrid />
        <WasteDiversionChart />
        <BrickProductionChart />
      </div>
    </div>
  )
}
