import { useUsers } from "../api/get-users"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { getRouteApi } from "@tanstack/react-router"
import { Card } from "@/components/ui/card"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { UsersFilters } from "./filters"
import { AddUserDialog } from "./add-user-dialog"

const routeApi = getRouteApi("/_authenticated/user-management/")

export function UsersList() {
  const {
    search,
    page,
    pageSize,
    deleted,
    show,
    role,
    dateJoinedAfter,
    dateJoinedBefore,
  } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const usersQuery = useUsers({
    params: {
      search,
      page,
      page_size: pageSize,
      deleted,
      show,
      role,
      date_joined_after: dateJoinedAfter,
      date_joined_before: dateJoinedBefore,
    },
  })

  const users = usersQuery?.data
  const totalPages = Math.ceil((users?.count ?? 0) / pageSize)

  return (
    <>
      <DataTableToolbar
        title="All users"
        total={users?.count}
        searchPlaceholder="Search users..."
        searchValue={search}
        onSearchChange={(newSearch) => {
          navigate({
            search: (prev) => ({ ...prev, search: newSearch, page: 1 }),
          })
        }}
        isLoading={usersQuery.isLoading}
        filters={
          <UsersFilters
            values={{
              deleted,
              show,
              role,
              date_joined_after: dateJoinedAfter,
              date_joined_before: dateJoinedBefore,
            }}
            onApply={(newFilters) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  deleted: newFilters.deleted,
                  show: newFilters.show,
                  role: newFilters.role,
                  dateJoinedAfter: newFilters.date_joined_after ?? undefined,
                  dateJoinedBefore: newFilters.date_joined_before ?? undefined,
                  page: 1,
                }),
              })
            }}
          />
        }
        actions={<AddUserDialog />}
      />
      <Card className="overflow-hidden py-0 lg:min-h-0 lg:flex-1">
        <DataTable
          columns={columns}
          data={users?.results ?? []}
          isLoading={usersQuery.isLoading}
          isDimmed={usersQuery.isPlaceholderData}
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
