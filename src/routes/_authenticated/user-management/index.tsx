import { createFileRoute } from "@tanstack/react-router"

import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { columns } from "@/features/user-management/components/columns"
import { UsersDataTable } from "@/features/user-management/components/data-table"
import { UsersPagination } from "@/features/user-management/components/pagination"
import { UsersToolbar } from "@/features/user-management/components/toolbar"

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
        <UsersToolbar total={0} />
        <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
          <UsersDataTable columns={columns} data={[]} />
        </Card>
        <UsersPagination />
      </div>
    </div>
  )
}
