import { useMachines } from "../../api/get-machines"
import { Card } from "@/components/ui/card"
import { MachinesToolbar } from "@/features/system-health/components/machines/machines-toolbar"
import { machinesColumns } from "@/features/system-health/components/machines/machines-columns"
import { DataTable } from "@/components/data-table"
import { DataTablePagination } from "@/components/pagination"
import { getRouteApi } from "@tanstack/react-router"

const routeApi = getRouteApi("/_authenticated/system-health/")

export function MachinesList() {
  const { page, pageSize } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const machinesQuery = useMachines({
    params: { page, page_size: pageSize },
  })

  const machines = machinesQuery?.data
  const totalPages = Math.ceil((machines?.count ?? 0) / pageSize)

  return (
    <>
      <MachinesToolbar total={machines?.count} />
      <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
        <DataTable
          columns={machinesColumns}
          data={machines?.results ?? []}
          isLoading={machinesQuery.isLoading}
          isDimmed={machinesQuery.isPlaceholderData}
        />
      </Card>
      <DataTablePagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={(newPage) => {
          navigate({ search: (prev) => ({ ...prev, page: newPage }) })
        }}
        onPageSizeChange={(newPageSize) => {
          navigate({
            search: (prev) => ({ ...prev, pageSize: newPageSize, page: 1 }),
          })
        }}
      />
    </>
  )
}
