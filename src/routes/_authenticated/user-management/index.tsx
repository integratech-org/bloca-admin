import { PageHeader } from "@/components/page-header"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/user-management/")({
  component: UserManagementPage,
})

function UserManagementPage() {
  return (
    <PageHeader
      eyebrow="Access Control"
      title="User Management"
      description="Manage user accounts, roles, and permissions · System Admins Only"
    />
  )
}
