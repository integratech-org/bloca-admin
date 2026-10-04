import { PageHeader } from "@/components/page-header"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/system-health/")({
  component: SystemHealthPage,
})

function SystemHealthPage() {
  return (
    <PageHeader
      eyebrow="Hardware Monitoring"
      title="System Health & Maintenance"
      description="Edge device diagnostics · BLOCA Physical Unit v2.1 · Last synced 7 min ago"
    />
  )
}
