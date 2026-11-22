import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/react-query"
import type { MachineQuery, MachinePage } from "@/types/api"

export const getMachines = (
  params: MachineQuery = {}
): Promise<MachinePage> => {
  return api.get("/api/machines", {
    params,
  })
}

export const getMachinesQueryOptions = (params: MachineQuery = {}) => {
  return queryOptions({
    queryKey: ["machines", params],
    queryFn: () => getMachines(params),
  })
}

type UseMachinesOptions = {
  params?: MachineQuery
  queryConfig?: QueryConfig<typeof getMachinesQueryOptions>
}

export const useMachines = ({
  params,
  queryConfig,
}: UseMachinesOptions = {}) => {
  return useQuery({
    ...getMachinesQueryOptions(params),
    ...queryConfig,
    placeholderData: keepPreviousData,
  })
}
