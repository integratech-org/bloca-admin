import { api } from "@/lib/api-client"
import type { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getMachinesQueryOptions } from "./get-machines"
import type { MachineTokenResult } from "@/types/api"

export type IssueTokenDTO = {
  machineId: string
}

export const issueToken = ({
  machineId,
}: IssueTokenDTO): Promise<MachineTokenResult> => {
  return api.post(`/api/machines/${machineId}/token/`)
}

type UseIssueTokenOptions = {
  mutationConfig?: MutationConfig<typeof issueToken>
}

export const useIssueToken = ({
  mutationConfig,
}: UseIssueTokenOptions = {}) => {
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
    mutationFn: issueToken,
  })
}
