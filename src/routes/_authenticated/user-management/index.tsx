import { createFileRoute } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"

import { PageHeader } from "@/components/page-header"
import { UsersList } from "@/features/user-management/components/user-list"

const usersSearchSchema = z.object({
  search: z.string().optional(),
  page: z.number().default(1),
  pageSize: z.number().default(25),
  deleted: z.enum(["exclude", "only", "include"]).default("exclude"),
  show: z.enum(["active", "inactive", "all"]).default("active"),
  role: z.enum(["system_admin", "admin", "operator", "all"]).default("all"),
  dateJoinedAfter: z.string().optional(),
  dateJoinedBefore: z.string().optional(),
})

export const Route = createFileRoute("/_authenticated/user-management/")({
  validateSearch: zodValidator(usersSearchSchema),
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
        <UsersList />
      </div>
    </div>
  )
}
