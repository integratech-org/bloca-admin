import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/ml-auditing/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/ml-auditing/"!</div>
}
