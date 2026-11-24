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
import { UpdateMachineDialog } from "./update-machine-dialog"
import { IssueTokenDialog } from "./issue-token-dialog"
import { RevokeTokenDialog } from "./revoke-token-dialog"
import { DeleteMachineDialog } from "./delete-machine-dialog"
import { RestoreMachineDialog } from "./restore-machine-dialog"

const routeApi = getRouteApi("/_authenticated/system-health/")

export function MachinesList() {
  const {
    search,
    page,
    pageSize,
    show,
    tokenStatus,
    createdAfter,
    createdBefore,
  } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const machinesQuery = useMachines({
    params: {
      search,
      page,
      page_size: pageSize,
      show,
      token_status: tokenStatus,
      created_after: createdAfter,
      created_before: createdBefore,
    },
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
        filters={
          <MachinesFilters
            values={{
              show,
              token_status: tokenStatus,
              created_after: createdAfter,
              created_before: createdBefore,
            }}
            onApply={(newFilters) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  show: newFilters.show,
                  tokenStatus: newFilters.token_status ?? undefined,
                  createdAfter: newFilters.created_after ?? undefined,
                  createdBefore: newFilters.created_before ?? undefined,
                  page: 1,
                }),
              })
            }}
          />
        }
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
      <UpdateMachineDialog />
      <IssueTokenDialog />
      <RevokeTokenDialog />
      <DeleteMachineDialog />
      <RestoreMachineDialog />
    </>
  )
}
