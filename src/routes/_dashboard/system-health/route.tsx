import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/system-health")({
  staticData: { breadcrumb: "System Health" },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
