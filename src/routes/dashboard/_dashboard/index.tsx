import { ContentLayout } from "@/components/admin-panel/content-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/_dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentLayout>
      <div>Hello "/dashboard/_dashboard/"!</div>
    </ContentLayout>
  )
}
