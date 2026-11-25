export const DELETED = [
  { value: "exclude", label: "Exclude" },
  { value: "only", label: "Only" },
  { value: "include", label: "Include" },
] as const

export const TOKEN_STATUS = [
  { value: "active", label: "Active" },
  { value: "revoked", label: "Revoked" },
  { value: "not_issued", label: "Not issued" },
] as const
