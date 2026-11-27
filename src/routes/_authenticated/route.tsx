import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/auth/sign-in" })
    }
  },
  staticData: { breadcrumb: "Overview" },
  component: OverviewLayout,
})

function OverviewLayout() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </AdminPanelLayout>
  )
}
