import { PageHeader } from "@/components/page-header"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/")({
  component: OverviewPage,
})

function OverviewPage() {
  return (
    <PageHeader
      eyebrow="Global Impact Overview"
      title="Environmental Dashboard"
      description="Bagong Silang BLOCA Program · Caloocan City · August 11, 2026"
    />
  )
}
