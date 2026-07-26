import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)/dashboard")({
  staticData: {
    breadcrumb: "Dashboard",
  },
  component: DashboardPage,
})

function DashboardPage() {
  return <div>Hello "/dashboard/"!</div>
}
