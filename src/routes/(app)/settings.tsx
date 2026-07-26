import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)/settings")({
  staticData: {
    breadcrumb: "Settings",
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/settings"!</div>
}
