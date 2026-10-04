import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/ml-auditing")({
  staticData: { breadcrumb: "ML Auditing" },
  component: MLAuditingLayout,
})

function MLAuditingLayout() {
  return <Outlet />
}
