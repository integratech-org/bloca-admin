import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type z from "zod"
import {
  useCreateMachine,
  createMachineInputSchema,
} from "../../api/create-machine"
import { useState } from "react"
import { useMachineTokenStore } from "../../stores/machine-token-store"
import { AddMachineForm } from "./add-machine-form"

export function AddMachineDialog() {
  const [open, setOpen] = useState(false)
  const createMachineMutation = useCreateMachine()
  const show = useMachineTokenStore((s) => s.show)

  function onSubmit(data: z.infer<typeof createMachineInputSchema>) {
    createMachineMutation.mutate(
      { data },
      {
        onSuccess: (res) => {
          setOpen(false)
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
        <AddMachineForm
          onSubmit={onSubmit}
          isPending={createMachineMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
