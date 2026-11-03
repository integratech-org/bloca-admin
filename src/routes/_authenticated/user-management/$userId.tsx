import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/user-management/$userId")(
  {
    // TODO: change the breadcrumb to the user's name once we have that data available
    staticData: { breadcrumb: "User Detail" },
    component: UserDetailPage,
  }
)

function UserDetailPage() {
  return <div>Hello "/_authenticated/user-management/$userId"!</div>
}
