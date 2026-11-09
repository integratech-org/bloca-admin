import { createFileRoute } from "@tanstack/react-router"
import { ProfileInformationCard } from "@/features/settings/components/profile-information-card"
import { ContactCard } from "@/features/settings/components/contact-card"
import {
  mockProfileData,
  mockContactData,
} from "@/features/settings/data/mock-profile"

export const Route = createFileRoute("/_authenticated/settings/profile")({
  staticData: { breadcrumb: "Profile" },
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileInformationCard data={mockProfileData} />

      {/* TODO: Address card will be added here */}

      <ContactCard data={mockContactData} />
    </div>
  )
}
