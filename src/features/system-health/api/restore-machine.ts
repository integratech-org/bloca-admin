import { api } from "@/lib/api-client"
import type { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getMachinesQueryOptions } from "./get-machines"

export type RestoreMachineDTO = {
  machineId: string
}

export const restoreMachine = ({ machineId }: RestoreMachineDTO) => {
  return api.post(`/api/machines/${machineId}/`)
}

type UseRestoreMachineOptions = {
  mutationConfig?: MutationConfig<typeof restoreMachine>
}

export const useRevokeToken = ({
  mutationConfig,
}: UseRestoreMachineOptions = {}) => {
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
    mutationFn: restoreMachine,
  })
}
