import type { components, paths } from "./schema"

// machine types
export type Machine = components["schemas"]["MachineOut"]
export type MachinePage =
  components["schemas"]["PaginatedResponseSchema_MachineOut_"]
export type MachineFilter = components["schemas"]["MachineFilterSchema"]
export type MachineQuery = NonNullable<
  paths["/api/machines/"]["get"]["parameters"]["query"]
>
export type MachineCreateInput = components["schemas"]["MachineCreateIn"]
export type MachineCreateResult = components["schemas"]["MachineCreateOut"]
export type MachineUpdateInput = components["schemas"]["MachineUpdateIn"]
export type MachineUpdateResult = components["schemas"]["MachineUpdateOut"]
export type MachineTokenResult = components["schemas"]["MachineIssueTokenOut"]
export type Deleted = components["schemas"]["DeletedEnum"]
export type TokenStatus = components["schemas"]["TokenStatus"]

// user types
export type User = components["schemas"]["UserOut"]
export type Role = components["schemas"]["RoleEnum"]
export type UserQuery = NonNullable<
  paths["/api/users/"]["get"]["parameters"]["query"]
>
export type UserPage = components["schemas"]["PaginatedResponseSchema_UserOut_"]
export type UserCreateInput = components["schemas"]["UserCreateIn"]
export type UserCreateResult = components["schemas"]["UserCreateOut"]
