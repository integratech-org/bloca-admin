export type UserRole = "admin" | "operator" | "system_admin"

export type UserStatus = "Active" | "Inactive" | "Pending"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  status: UserStatus
  avatarUrl: string
  createdAt: string
  lastActive: string
  mobile: string
  address: string
  assignedMachine?: string | null
}
