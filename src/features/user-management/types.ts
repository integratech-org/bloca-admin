export type UserRole = "Admin" | "Operator"

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
}
