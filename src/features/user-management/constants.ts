export const ROLES = [
  { value: "system_admin", label: "System Admin" },
  { value: "admin", label: "Admin" },
  { value: "operator", label: "Operator" },
] as const

export const STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "all", label: "All" },
] as const

export const DELETED = [
  { value: "exclude", label: "Active only" },
  { value: "only", label: "Deleted only" },
  { value: "include", label: "All" },
] as const

export const JOINED = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "custom", label: "Custom" },
] as const

export type Role = (typeof ROLES)[number]["value"]
export type Status = (typeof STATUS)[number]["value"]
export type Deleted = (typeof DELETED)[number]["value"]
export type Joined = (typeof JOINED)[number]["value"]
