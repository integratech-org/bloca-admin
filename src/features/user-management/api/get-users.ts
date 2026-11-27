import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/react-query"
import type { UserQuery, UserPage } from "@/types/api"

export const getUsers = (params: UserQuery = {}): Promise<UserPage> => {
  return api.get("/api/users/", {
    params,
  })
}

export const getUsersQueryOptions = (params: UserQuery = {}) => {
  return queryOptions({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  })
}

type UseUsersOptions = {
  params?: UserQuery
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({ params, queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(params),
    ...queryConfig,
    placeholderData: keepPreviousData,
  })
}
