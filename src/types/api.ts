import type { components, operations } from "./schema"

export type Machine = components["schemas"]["MachineOut"]
export type MachinePage =
  components["schemas"]["PaginatedResponseSchema_MachineOut_"]
export type GetMachinesParams = NonNullable<
  operations["machine_get_machines_25859bb7"]["parameters"]["query"]
>
export type TokenStatus = components["schemas"]["TokenStatus"]
