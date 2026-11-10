import { useState, useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { machinesColumns } from "@/features/system-health/components/machines-columns"
import { MachinesDataTable } from "@/features/system-health/components/machines-data-table"
import { MachinesPagination } from "@/features/system-health/components/machines-pagination"
import { MachinesToolbar } from "@/features/system-health/components/machines-toolbar"
import { getAllMachines } from "@/features/system-health/data/mock-machines"
import type { Machine } from "@/features/system-health/types"

export const Route = createFileRoute("/_authenticated/system-health/")({
  component: SystemHealthPage,
})

function SystemHealthPage() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMachines() {
      setIsLoading(true)
      const data = await getAllMachines()
      setMachines(data)
      setIsLoading(false)
    }
    loadMachines()
  }, [])

  return (
    <div className="flex flex-col gap-8 lg:flex-1">
      <PageHeader
        eyebrow="HARDWARE MONITORING"
        title="System Health & Maintenance"
        description="Select a machine to view its filtration lifespan and hardware diagnostics."
      />

      <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
        <MachinesToolbar total={machines.length} />
        <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
          <MachinesDataTable
            columns={machinesColumns}
            data={machines}
            isLoading={isLoading}
          />
        </Card>
        <MachinesPagination total={machines.length} />
      </div>
    </div>
  )
}
