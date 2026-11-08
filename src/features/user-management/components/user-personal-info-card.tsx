import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "../types"
import { Separator } from "@/components/ui/separator"

interface UserPersonalInfoCardProps {
  user: User
}

export function UserPersonalInfoCard({ user }: UserPersonalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Full Name
            </label>
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Mobile Number
            </label>
            <p className="font-medium">{user.mobile || "—"}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Email
            </label>
            <p className="font-medium break-all">{user.email || "—"}</p>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground uppercase">
              Address
            </label>
            <p className="font-medium">{user.address || "—"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
