export type UserRole = "system_admin" | "barangay_admin" | "operator"
export type UserStatus = "active" | "pending" | "disabled"

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string
  role: UserRole
  status: UserStatus
  lastActive: string
  createdDate: string
}
