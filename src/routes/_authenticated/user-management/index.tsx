import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { UsersDataTable } from "@/features/user-management/components/data-table"
import { UsersToolbar } from "@/features/user-management/components/toolbar"
import { createFileRoute } from "@tanstack/react-router"
import { columns } from "@/features/user-management/components/columns"
import { UsersPagination } from "@/features/user-management/components/pagination"

export const Route = createFileRoute("/_authenticated/user-management/")({
  component: UserManagementPage,
})

function UserManagementPage() {
  return (
    <div className="flex flex-col gap-8 lg:flex-1">
      <PageHeader
        eyebrow="Access Control"
        title="User Management"
        description="Manage user accounts, roles, and permissions · System Admins Only"
      />

      <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
        <UsersToolbar total={10} />
        <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
          <UsersDataTable columns={columns} data={[]} />
        </Card>
        <UsersPagination />
      </div>
    </div>
  )
}
