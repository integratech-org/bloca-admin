import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AuthLayout } from "@/features/auth/components/auth-layout"

export const Route = createFileRoute("/_unauthenticated")({
  component: UnauthenticatedLayout,
})

function UnauthenticatedLayout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
