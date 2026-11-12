import { ChangePasswordCard } from "@/features/settings/components/change-password-card"
import { EmailAddressCard } from "@/features/settings/components/email-address-card"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/settings/security")({
  staticData: { breadcrumb: "Security" },
  component: SecurityPage,
})

function SecurityPage() {
  return (
    <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1">
      <EmailAddressCard />
      <ChangePasswordCard />
    </div>
  )
}
