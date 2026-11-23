import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { KeyRound, Plus } from "lucide-react"
import type z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  useCreateMachine,
  createMachineInputSchema,
} from "../../api/create-machine"
import { DashRing } from "@/components/loading-ui/dash-ring"
import { useState } from "react"
import { useMachineTokenStore } from "../../stores/machine-token-store"

export function AddMachineDialog() {
  const [open, setOpen] = useState(false)
  const createMachineMutation = useCreateMachine()
  const show = useMachineTokenStore((s) => s.show)

  const form = useForm<z.infer<typeof createMachineInputSchema>>({
    resolver: zodResolver(createMachineInputSchema),
    defaultValues: {
      name: "",
      site: "",
    },
  })

  function onSubmit(data: z.infer<typeof createMachineInputSchema>) {
    createMachineMutation.mutate(
      { data },
      {
        onSuccess: (res) => {
          setOpen(false)
          form.reset()
          show(res, "created")
        },
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next, eventDetails) => {
        if (!next && createMachineMutation.isPending) {
          eventDetails.cancel()
          return
        }
        setOpen(next)
      }}
    >
      <DialogTrigger render={<Button />}>
        <Plus />
        Add Machine
      </DialogTrigger>
      <DialogContent>
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
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. BLOCA-machine0"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    A name to identify this machine in the dashboard.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <KeyRound />
            <AlertTitle>Access token</AlertTitle>
            <AlertDescription>
              A token will be generated after saving. It's only shown once, so
              copy it right away.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={createMachineMutation.isPending}
                >
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={createMachineMutation.isPending}>
              {createMachineMutation.isPending ? (
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
      </DialogContent>
    </Dialog>
  )
}
