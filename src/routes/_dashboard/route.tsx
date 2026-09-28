import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard")({
  // beforeLoad: ({ context }) => {
  //   const { isAuthenticated } = context.session
  //   throw redirect({ to: isAuthenticated ? "/dashboard" : "/auth/sign-in" })
  // },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </AdminPanelLayout>
  )
}
