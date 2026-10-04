import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/ml-auditing/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/ml-auditing/"!</div>
}
