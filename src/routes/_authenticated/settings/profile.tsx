import { AddressCard } from "@/features/settings/components/address-card"
import { ContactNumberCard } from "@/features/settings/components/contact-number-card"
import { ProfileInformationCard } from "@/features/settings/components/profile-information-card"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/settings/profile")({
  staticData: { breadcrumb: "Profile" },
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1">
      <ProfileInformationCard />
      <ContactNumberCard />
      <AddressCard />
    </div>
  )
}
