import { z } from "zod"
import { createUserInputSchema } from "../api/create-user"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DashRing } from "@/components/loading-ui/dash-ring"
import { Button } from "@/components/ui/button"

interface Props {
  onSubmit: (data: z.infer<typeof createUserInputSchema>) => void
  isPending: boolean
}

export function AddUserForm({ onSubmit, isPending }: Props) {
  const form = useForm<z.infer<typeof createUserInputSchema>>({
    resolver: zodResolver(createUserInputSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      role: undefined,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>Add New User</DialogTitle>
        <DialogDescription>
          Fill in the details to create a new user account.
        </DialogDescription>
      </DialogHeader>
      <FieldGroup>
        <Controller
          name="first_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="first_name">
                First Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="first_name"
                aria-invalid={fieldState.invalid}
                placeholder="Enter first name"
                autoComplete="given-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="last_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="last_name">
                Last Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="last_name"
                aria-invalid={fieldState.invalid}
                placeholder="Enter last name"
                autoComplete="family-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter email address"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="role">
                Role <span className="text-destructive">*</span>
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="system_admin">System Admin</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                The user's access level in the system.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter>
        <DialogClose
          render={
            <Button type="button" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          }
        />
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending ? (
            <>
              <DashRing />
              Creating...
            </>
          ) : (
            "Create User"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
