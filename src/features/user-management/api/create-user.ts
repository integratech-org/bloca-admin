import { api } from "@/lib/api-client"
import type { MutationConfig } from "@/lib/react-query"
import type { UserCreateInput, UserCreateResult } from "@/types/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import z from "zod"
import { getUsersQueryOptions } from "./get-users"

export const createUserInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  role: z.enum(["system_admin", "admin", "operator"]),
}) satisfies z.ZodType<UserCreateInput>

export const createUser = ({
  data,
}: {
  data: UserCreateInput
}): Promise<UserCreateResult> => {
  return api.post("/api/users/", data)
}

type UseCreateUserOptions = {
  mutationConfig?: MutationConfig<typeof createUser>
}

export const useCreateUser = ({
  mutationConfig,
}: UseCreateUserOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createUser,
  })
}
