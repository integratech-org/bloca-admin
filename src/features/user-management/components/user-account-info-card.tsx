import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleBadge } from "./role-badge"
import { StatusBadge } from "./status-badge"
import type { User } from "../types"
import { Separator } from "@/components/ui/separator"

interface UserAccountInfoCardProps {
  user: User
}

export function UserAccountInfoCard({ user }: UserAccountInfoCardProps) {
  // Format dates consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Joined Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Joined Date
            </label>
            <p className="font-medium">{formatDate(user.createdAt)}</p>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Role
            </label>
            <div>
              <RoleBadge role={user.role} />
            </div>
          </div>

          {/* Last Login */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Last Login
            </label>
            <p className="font-medium">{formatDate(user.lastActive)}</p>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Status
            </label>
            <div>
              <StatusBadge status={user.status} />
            </div>
          </div>

          {/* Assigned Machine - spans full width */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs text-muted-foreground uppercase">
              Assigned Machine
            </label>
            <p className="font-medium">{user.assignedMachine || "—"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
