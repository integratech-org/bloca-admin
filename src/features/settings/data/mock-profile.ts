import type { ProfileData, AddressData, ContactData } from "../types/profile"

export const mockProfileData: ProfileData = {
  firstName: "John",
  lastName: "Doe",
  role: "System Admin",
  avatarUrl: null,
}

export const mockAddressData: AddressData = {
  street: "123 Sample St.",
  barangay: "Bagong Silang",
  city: "Caloocan",
}

export const mockContactData: ContactData = {
  contactNumber: "+63 912 345 6789",
}
