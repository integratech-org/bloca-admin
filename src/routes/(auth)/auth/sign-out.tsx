import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/auth/sign-out")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/auth/sign-out"!</div>
}
