import { z } from "zod"
import { createMachineInputSchema } from "../../api/create-machine"
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
import { DashRing } from "@/components/loading-ui/dash-ring"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  onSubmit: (data: z.infer<typeof createMachineInputSchema>) => void
  isPending: boolean
}

export function AddMachineForm({ onSubmit, isPending }: Props) {
  const form = useForm<z.infer<typeof createMachineInputSchema>>({
    resolver: zodResolver(createMachineInputSchema),
    defaultValues: {
      name: "",
      site: "",
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>Add machine</DialogTitle>
        <DialogDescription>
          Register a new machine in the system.
        </DialogDescription>
      </DialogHeader>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">
                Machine name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="name"
                placeholder="e.g. BLOCA-machine0"
                autoComplete="off"
              />
              <FieldDescription>
                A name to identify this machine in the dashboard.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="site"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="site">Site</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="site"
                placeholder="e.g. Bagong Silang, Caloocan"
                autoComplete="off"
              />
              <FieldDescription>
                Where the machine is installed.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
        <KeyRound />
        <AlertTitle>Access token</AlertTitle>
        <AlertDescription>
          A token will be generated after saving. It's only shown once, so copy
          it right away.
        </AlertDescription>
      </Alert>

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
            "Create machine"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
