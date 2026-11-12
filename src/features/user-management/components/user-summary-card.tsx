import { Card, CardContent } from "@/components/ui/card"
import { RoleBadge } from "./role-badge"
import type { User } from "../types"

interface UserSummaryCardProps {
  user: User
}

export function UserSummaryCard({ user }: UserSummaryCardProps) {
  // Getting initials from first and last name
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()

  return (
    <Card>
      <CardContent className="flex items-center gap-4 px-6">
        {/* Avatar with initials */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold">
          {initials}
        </div>

        {/* Name and Email */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="trnucate text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h3>
        </div>

        {/* Role Badge */}
        <div className="shrink-0">
          <RoleBadge role={user.role} />
        </div>
      </CardContent>
    </Card>
  )
}
