import { createFileRoute, Link, useParams } from "@tanstack/react-router"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  ArrowLeft,
  PencilIcon,
  LockIcon,
  UserRoundXIcon,
} from "lucide-react"
import { mockUsers } from "@/features/user-management/data/mock-users"
import { UserSummaryCard } from "@/features/user-management/components/user-summary-card"
import { UserPersonalInfoCard } from "@/features/user-management/components/user-personal-info-card"

export const Route = createFileRoute("/_authenticated/user-management/$userId")(
  {
    // TODO: change the breadcrumb to the user's name once we have that data available
    staticData: { breadcrumb: "User Detail" },
    component: UserDetailPage,
  }
)

function UserDetailPage() {
  const { userId } = useParams({
    from: "/_authenticated/user-management/$userId",
  })
  const user = mockUsers.find((u) => u.id === userId)

  // User Not Found Fallback
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">User Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The user with ID <span className="font-mono">{userId}</span> does
            not exist.
          </p>
        </div>
        <Button render={<Link to="/user-management" />}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User Management
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-1">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          eyebrow="USER MANAGEMENT"
          title="User Details"
          description="Complete user profile and production activity"
        />

        {/* Select Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button>
                Select Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-45">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LockIcon className="mr-2 h-4 w-4" />
                Reset Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => console.log("Delete", user.id)}
                variant="destructive"
              >
                <UserRoundXIcon className="mr-2 h-4 w-4" />
                Disable Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content Area - Placeholder */}
      <div className="flex flex-col gap-6 lg:flex-1">
        {/* Summary Card */}
        <UserSummaryCard user={user} />

        {/* Personal Infomration Card  */}
        <UserPersonalInfoCard user={user} />

        {/* Placeholder for future content */}
        <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Account Information and Recent Activity sections will be added in
            separate tasks
          </p>
        </div>
      </div>
    </div>
  )
}
