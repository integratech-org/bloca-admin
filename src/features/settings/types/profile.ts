export interface ProfileData {
  firstName: string
  lastName: string
  role: string
  avatarUrl?: string | null
}

export interface AddressData {
  street: string
  barangay: string
  city: string
}

export interface ContactData {
  contactNumber: string
}
