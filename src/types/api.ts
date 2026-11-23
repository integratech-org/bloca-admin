import type { components, paths } from "./schema"

// machine types
export type Machine = components["schemas"]["MachineOut"]
export type MachinePage =
  components["schemas"]["PaginatedResponseSchema_MachineOut_"]
export type MachineQuery = NonNullable<
  paths["/api/machines/"]["get"]["parameters"]["query"]
>
export type MachineCreateInput = components["schemas"]["MachineCreateIn"]
export type MachineCreateResult = components["schemas"]["MachineCreateOut"]
export type MachineUpdateInput = components["schemas"]["MachineUpdateIn"]
export type MachineUpdateResult = components["schemas"]["MachineUpdateOut"]
export type MachineTokenResult = components["schemas"]["MachineIssueTokenOut"]
export type TokenStatus = components["schemas"]["TokenStatus"]
