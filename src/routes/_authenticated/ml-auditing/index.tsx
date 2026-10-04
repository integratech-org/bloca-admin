import { PageHeader } from "@/components/page-header"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/ml-auditing/")({
  component: MLAuditingPage,
})

function MLAuditingPage() {
  return (
    <PageHeader
      eyebrow="Restricted Access"
      title="ML Quality Auditing"
      description="Batch prediction logs and computer vision defect review · System Admins Only"
    />
  )
}
