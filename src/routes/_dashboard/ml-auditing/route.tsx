import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/ml-auditing")({
  staticData: { breadcrumb: "ML Auditing" },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
