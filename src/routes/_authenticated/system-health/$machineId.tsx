import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/_authenticated/system-health/$machineId"
)({
  staticData: { breadcrumb: "Machine Details" },
  component: MachineDetailPage,
})

function MachineDetailPage() {
  const { machineId } = Route.useParams()

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <p className="text-lg">Machine ID: {machineId}</p>
      <Link
        to="/system-health"
        className="text-sm text-primary hover:underline"
      >
        ← Back to System Health
      </Link>
    </div>
  )
}
