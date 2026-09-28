import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/deployment")({
  staticData: { breadcrumb: "Deployment" },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
