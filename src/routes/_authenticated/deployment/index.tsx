import { PageHeader } from "@/components/page-header"
import { DeploymentStats } from "@/features/deployment/components/deployment-stats"
import { DeploymentMap } from "@/features/deployment/components/deployment-map"
import { SiteDetailPanel } from "@/features/deployment/components/site-detail-panel"
import { mockDeploymentSites } from "@/features/deployment/data/mock-sites"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/_authenticated/deployment/")({
  component: DeploymentPage,
})

function DeploymentPage() {
  const [selectedSiteId, setSelectedSiteId] = useState<string>()

  return (
    <div className="flex flex-col gap-8 lg:flex-1">
      <PageHeader
        eyebrow="Community Lifecycle"
        title="Deployment Tracking"
        description="Block placement log across Barangay Bagong Silang community projects"
      />

      <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1">
        <DeploymentStats />

        <div className="grid grid-cols-1 gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-2">
          <DeploymentMap
            sites={mockDeploymentSites}
            selectedSiteId={selectedSiteId}
            onSiteSelect={setSelectedSiteId}
          />
          <SiteDetailPanel
            sites={mockDeploymentSites}
            selectedSiteId={selectedSiteId}
            onSiteSelect={setSelectedSiteId}
          />
        </div>
      </div>
    </div>
  )
}
