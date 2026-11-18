import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/react-query"
import type { GetMachinesParams, MachinePage } from "@/types/api"

export const getMachines = (
  params: GetMachinesParams = {}
): Promise<MachinePage> => {
  return api.get("/api/machines", {
    params,
  })
}

export const getMachinesQueryOptions = (params: GetMachinesParams = {}) => {
  return queryOptions({
    queryKey: ["machines", params],
    queryFn: () => getMachines(params),
  })
}

type UseMachinesOptions = {
  params?: GetMachinesParams
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
