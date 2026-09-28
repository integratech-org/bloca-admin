import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/user-management")({
  staticData: { breadcrumb: "User Management" },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
