import { api } from "@/lib/api-client"
import type { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getMachinesQueryOptions } from "./get-machines"

export type DeleteMachineDTO = {
  machineId: string
}

export const deleteMachine = ({ machineId }: DeleteMachineDTO) => {
  return api.post(`/api/machines/${machineId}/`)
}

type UseDeleteMachineOptions = {
  mutationConfig?: MutationConfig<typeof deleteMachine>
}

export const useRevokeToken = ({
  mutationConfig,
}: UseDeleteMachineOptions = {}) => {
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
    mutationFn: deleteMachine,
  })
}
