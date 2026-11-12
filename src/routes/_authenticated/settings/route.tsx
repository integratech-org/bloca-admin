import { PageHeader } from "@/components/page-header"
import { SettingsNav } from "@/features/settings/components/settings-nav"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/settings")({
  staticData: { breadcrumb: "Settings" },
  component: SettingsLayout,
})

function SettingsLayout() {
  return (
    <div className="flex flex-col gap-8 lg:min-h-0 lg:flex-1">
      <PageHeader
        eyebrow="ACCOUNT DETAILS"
        title="Settings"
        description="Manage your profile details and account security."
      />

      <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:min-h-0 lg:flex-1">
        <SettingsNav />
        <Outlet />
      </div>
    </div>
  )
}
