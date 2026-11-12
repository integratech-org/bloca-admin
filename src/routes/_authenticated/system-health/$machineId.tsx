import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { StatsGrid } from "@/features/system-health/components/stats-grid"
import { DiagnosticsToolbar } from "@/features/system-health/components/toolbar"
import { DataTable } from "@/features/system-health/components/data-table"
import { columns } from "@/features/system-health/components/columns"
import { DiagnosticsPagination } from "@/features/system-health/components/pagination"
import { mockDiagnosticLogs } from "@/features/system-health/data/mock-logs"
import { mockMachines } from "@/features/system-health/data/mock-machines"

export const Route = createFileRoute(
  "/_authenticated/system-health/$machineId"
)({
  staticData: { breadcrumb: "Machine Details" },
  component: MachineDetailPage,
})

function MachineDetailPage() {
  const { machineId } = Route.useParams()
  const machine = mockMachines.find((m) => m.machineId === machineId)

  if (!machine) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h2 className="text-2xl font-semibold">Machine not found</h2>
        <p className="text-muted-foreground">
          The machine with ID "{machineId}" does not exist.
        </p>
        <Button
          render={<Link to="/system-health">Back to machine list</Link>}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-1">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit"
          render={
            <Link to="/system-health">
              <ArrowLeft />
              Back to machine list
            </Link>
          }
        />

        <PageHeader
          eyebrow="HARDWARE MONITORING"
          title={`${machine.name} (${machine.machineId})`}
          description={`${machine.hardwareVersion || "Physical Unit"} • Last synced ${getRelativeTime(machine.lastSynced)}`}
        />
      </div>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">
            Filtration Lifespan
          </h2>
          <p className="text-sm text-muted-foreground">
            Filter capacity and service schedule
          </p>
        </div>
        <StatsGrid />
      </section>

      <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
        <DiagnosticsToolbar />
        <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
          <DataTable columns={columns} data={mockDiagnosticLogs} />
        </Card>
        <DiagnosticsPagination />
      </div>
    </div>
  )
}

function getRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
}
