import { useMachines } from "../../api/get-machines"
import { columns } from "@/features/system-health/components/machines/columns"
import { DataTable } from "@/components/data-table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { getRouteApi } from "@tanstack/react-router"
import { Card } from "@/components/ui/card"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { MachinesFilters } from "./filters"
import { AddMachineDialog } from "./add-machine-dialog"
import { MachineTokenDialog } from "./machine-token-dialog"

const routeApi = getRouteApi("/_authenticated/system-health/")

export function MachinesList() {
  const { search, page, pageSize } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const machinesQuery = useMachines({
    params: { search, page, page_size: pageSize },
  })

  const machines = machinesQuery?.data
  const totalPages = Math.ceil((machines?.count ?? 0) / pageSize)
  return (
    <>
      <DataTableToolbar
        title="All machines"
        total={machines?.count}
        searchPlaceholder="Search machines..."
        searchValue={search}
        onSearchChange={(newSearch) => {
          navigate({
            search: (prev) => ({ ...prev, search: newSearch, page: 1 }),
          })
        }}
        isLoading={machinesQuery.isLoading}
        filters={<MachinesFilters />}
        actions={<AddMachineDialog />}
      />
      <Card className="overflow-hidden py-0 lg:min-h-0 lg:flex-1">
        <DataTable
          columns={columns}
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
      <MachineTokenDialog />
    </>
  )
}
