import { api } from "@/lib/api-client"
import type { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getMachinesQueryOptions } from "./get-machines"

export type RevokeTokenDTO = {
  machineId: string
}

export const revokeToken = ({ machineId }: RevokeTokenDTO) => {
  return api.post(`/api/machines/${machineId}/token/revoke/`)
}

type UseRevokeTokenOptions = {
  mutationConfig?: MutationConfig<typeof revokeToken>
}

export const useRevokeToken = ({
  mutationConfig,
}: UseRevokeTokenOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getMachinesQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: revokeToken,
  })
}
