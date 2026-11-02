// TODO: This is minimal mock data for column development
// Replace with full mock data from feat/user-mock-data branch
export type UserRole = "system_admin" | "barangay_admin" | "operator"
export type UserStatus = "active" | "pending" | "disabled"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdDate: string
  lastActive: string
}
