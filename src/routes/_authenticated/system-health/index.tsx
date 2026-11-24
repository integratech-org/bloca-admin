import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "@/components/page-header"
import { MachinesList } from "@/features/system-health/components/machines/machines-list"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"

const machineSearchSchema = z.object({
  search: z.string().optional(),
  page: z.number().default(1),
  pageSize: z.number().default(25),
  show: z.enum(["active", "deleted", "all"]).default("active"),
  tokenStatus: z.enum(["active", "revoked", "not_issued"]).default("active"),
  createdAfter: z.string().optional(),
  createdBefore: z.string().optional(),
})

export const Route = createFileRoute("/_authenticated/system-health/")({
  validateSearch: zodValidator(machineSearchSchema),
  component: SystemHealthPage,
})

function SystemHealthPage() {
  return (
    <div className="flex flex-col gap-8 lg:flex-1">
      <PageHeader
        eyebrow="Hardware Monitoring"
        title="System Health & Maintenance"
        description="Select a machine to view its filtration lifespan and hardware diagnostics."
      />

      <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
        <MachinesList />
      </div>
    </div>
  )
}
