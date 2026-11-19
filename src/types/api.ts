import type { components, paths } from "./schema"

export type Machine = components["schemas"]["MachineOut"]
export type MachinePage =
  components["schemas"]["PaginatedResponseSchema_MachineOut_"]
export type GetMachinesParams = NonNullable<
  paths["/api/machines/"]["get"]["parameters"]["query"]
>
export type TokenStatus = components["schemas"]["TokenStatus"]
