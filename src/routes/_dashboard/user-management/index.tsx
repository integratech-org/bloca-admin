import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/user-management/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/user-management/"!</div>
}
