import { PageHeader } from "@/components/page-header"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/deployment/")({
  component: DeploymentPage,
})

function DeploymentPage() {
  return (
    <PageHeader
      eyebrow="Community Lifecycle"
      title="Deployment Tracking"
      description="Block placement log across Barangay Bagong Silang community projects"
    />
  )
}
