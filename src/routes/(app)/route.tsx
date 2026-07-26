import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)")({
  component: AppLayout,
})

function AppLayout() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </AdminPanelLayout>
  )
}
