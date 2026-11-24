import { Button } from "@/components/ui/button"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Machine } from "@/types/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  updateMachineInputSchema,
  useUpdateMachine,
} from "../../api/update-machine"
import { z } from "zod"
import { DashRing } from "@/components/loading-ui/dash-ring"
import { useUpdateMachineStore } from "../../stores/update-machine-store"

interface Props {
  machine: Machine
}

export function UpdateMachineForm({ machine }: Props) {
  const close = useUpdateMachineStore((s) => s.close)

  const updateMachineMutation = useUpdateMachine()

  const form = useForm<z.infer<typeof updateMachineInputSchema>>({
    resolver: zodResolver(updateMachineInputSchema),
    defaultValues: {
      name: machine?.name,
      site: machine?.site ?? "",
    },
  })

  function onSubmit(data: z.infer<typeof updateMachineInputSchema>) {
    if (!machine?.id) return

    updateMachineMutation.mutate(
      { data, machineId: machine.id },
      {
        onSuccess: () => {
          close()
        },
      }
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>Update {machine?.name ?? "machine"}</DialogTitle>
        <DialogDescription>
          Edit the details of {machine?.name ?? "this machine"}. Its access
          token won't change.
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
                id="name"
                aria-invalid={fieldState.invalid}
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
                id="site"
                aria-invalid={fieldState.invalid}
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

      <DialogFooter>
        <DialogClose
          render={
            <Button
              type="button"
              variant="outline"
              disabled={updateMachineMutation.isPending}
            >
              Cancel
            </Button>
          }
        />
        <Button
          type="submit"
          disabled={updateMachineMutation.isPending || !form.formState.isDirty}
        >
          {updateMachineMutation.isPending ? (
            <>
              <DashRing />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
