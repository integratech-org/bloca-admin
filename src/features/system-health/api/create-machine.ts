import { api } from "@/lib/api-client"
import type { MutationConfig } from "@/lib/react-query"
import type { MachineCreateInput, MachineCreateResult } from "@/types/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import z from "zod"
import { getMachinesQueryOptions } from "./get-machines"

export const createMachineInputSchema = z.object({
  name: z
    .string()
    .min(1, "Machine name is required")
    .max(100, "Machine name must be less than 100 characters"),
  site: z.string().max(100, "Site must be less than 100 characters").optional(),
}) satisfies z.ZodType<MachineCreateInput>

export const createMachine = ({
  data,
}: {
  data: MachineCreateInput
}): Promise<MachineCreateResult> => {
  return api.post("/api/machines/", data)
}

type UseCreateMachineOptions = {
  mutationConfig?: MutationConfig<typeof createMachine>
}

export const useCreateMachine = ({
  mutationConfig,
}: UseCreateMachineOptions = {}) => {
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
    mutationFn: createMachine,
  })
}
