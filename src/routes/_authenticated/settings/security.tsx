import { createFileRoute } from "@tanstack/react-router"
import { EmailAddressCard } from "@/features/settings/components/email-address-card"
import { ChangePasswordCard } from "@/features/settings/components/change-password-card"
import { mockEmailData } from "@/features/settings/data/mock-security"

export const Route = createFileRoute("/_authenticated/settings/security")({
  staticData: { breadcrumb: "Security" },
  component: SecurityPage,
})

function SecurityPage() {
  return (
    <div className="space-y-6">
      <EmailAddressCard data={mockEmailData} />

      <ChangePasswordCard />
    </div>
  )
}
