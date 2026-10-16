import { PageHeader } from "@/components/page-header"
import { AuditTabs } from "@/features/ml-auditing/components/audit-tabs"
import { StatsGrid } from "@/features/ml-auditing/components/stats-grid"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/ml-auditing/")({
  component: MLAuditingPage,
})

function MLAuditingPage() {
  return (
    <div className="flex flex-col gap-8 lg:min-h-0 lg:flex-1">
      <PageHeader
        eyebrow="Restricted Access"
        title="ML Quality Auditing"
        description="Batch prediction logs and computer vision defect review · System Admins Only"
      />

      <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1">
        <StatsGrid />
        <AuditTabs />
      </div>
    </div>
  )
}
