import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useUpdateMachineStore } from "../../stores/update-machine-store"
import { UpdateMachineForm } from "./update-machine-form"

export function UpdateMachineDialog() {
  const open = useUpdateMachineStore((s) => s.open)
  const machine = useUpdateMachineStore((s) => s.machine)
  const close = useUpdateMachineStore((s) => s.close)
  const reset = useUpdateMachineStore((s) => s.reset)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) close()
      }}
      onOpenChangeComplete={(next) => {
        if (!next) reset()
      }}
    >
      <DialogContent>
        {machine && <UpdateMachineForm key={machine.id} machine={machine} />}
      </DialogContent>
    </Dialog>
  )
}
