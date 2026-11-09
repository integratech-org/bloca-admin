import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/settings/security")({
  staticData: { breadcrumb: "Security" },
  component: SecurityPage,
})

function SecurityPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Security configuration will be implemented here.
        </p>
      </CardContent>
    </Card>
  )
}
