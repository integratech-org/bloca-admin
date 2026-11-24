import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DashRing } from "@/components/loading-ui/dash-ring"
import { Button } from "@/components/ui/button"
import { useDeleteMachineStore } from "../../stores/delete-machine-store"
import { useDeleteMachine } from "../../api/delete-machine"

export function DeleteMachineDialog() {
  const open = useDeleteMachineStore((s) => s.open)
  const machine = useDeleteMachineStore((s) => s.machine)
  const close = useDeleteMachineStore((s) => s.close)
  const reset = useDeleteMachineStore((s) => s.reset)

  const deleteMachineMutation = useDeleteMachine()

  function handleConfirm() {
    if (!machine?.id) return

    deleteMachineMutation.mutate(
      { machineId: machine.id },
      {
        onSuccess: () => {
          close()
        },
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next, eventDetails) => {
        if (!next) {
          if (deleteMachineMutation.isPending) {
            eventDetails.cancel()
            return
          }
          close()
        }
      }}
      onOpenChangeComplete={(next) => {
        if (!next) reset()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete machine?</DialogTitle>
          <DialogDescription>
            This will remove {machine?.name} from your machines list. The
            machine will stop working until it's restored.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose disabled={deleteMachineMutation.isPending}>
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleteMachineMutation.isPending}
          >
            {deleteMachineMutation.isPending ? (
              <>
                <DashRing />
                Deleting...
              </>
            ) : (
              "Delete machine"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
