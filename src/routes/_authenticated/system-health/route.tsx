import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/system-health")({
  staticData: { breadcrumb: "System Health" },
  component: SystemHealthLayout,
})

function SystemHealthLayout() {
  return <Outlet />
}
