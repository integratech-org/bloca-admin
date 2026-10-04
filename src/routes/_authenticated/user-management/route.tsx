import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/user-management")({
  staticData: { breadcrumb: "User Management" },
  component: UserManagementLayout,
})

function UserManagementLayout() {
  return <Outlet />
}
