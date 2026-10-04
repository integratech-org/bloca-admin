import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/deployment")({
  staticData: { breadcrumb: "Deployment" },
  component: DeploymentLayout,
})

function DeploymentLayout() {
  return <Outlet />
}
