import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/system-health/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/system-health/"!</div>
}
