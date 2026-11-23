import { api } from "@/lib/api-client"
import type { MutationConfig } from "@/lib/react-query"
import type { MachineUpdateInput, MachineUpdateResult } from "@/types/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import z from "zod"
import { getMachinesQueryOptions } from "./get-machines"

export const updateMachineInputSchema = z.object({
  name: z
    .string()
    .min(1, "Machine name is required")
    .max(100, "Machine name must be less than 100 characters"),
  site: z.string().max(100, "Site must be less than 100 characters").optional(),
}) satisfies z.ZodType<MachineUpdateInput>

export type UpdateMachineDTO = {
  data: MachineUpdateInput
  machineId: string
}

export const updateMachine = ({
  data,
  machineId,
}: UpdateMachineDTO): Promise<MachineUpdateResult> => {
  return api.post(`/api/machines/${machineId}/`, data)
}

type UseUpdateMachineOptions = {
  mutationConfig?: MutationConfig<typeof updateMachine>
}

export const useUpdateMachine = ({
  mutationConfig,
}: UseUpdateMachineOptions = {}) => {
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
    mutationFn: updateMachine,
  })
}
