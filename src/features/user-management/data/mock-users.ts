import type { User } from "../types"

// TODO: This is minimal mock data for column development (1 entry only)
// Replace with full mock data (12+ entries) from feat/user-mock-data branch
export const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "Test User",
    email: "test@example.com",
    role: "operator",
    status: "active",
    createdDate: "2026-11-02",
    lastActive: "2026-11-02",
  },
]
