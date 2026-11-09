import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/settings/profile")({
  staticData: { breadcrumb: "Profile" },
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Profile configuration will be implemented here.
        </p>
      </CardContent>
    </Card>
  )
}
