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
import { useRestoreMachineStore } from "../../stores/restore-machine-store"
import { useRestoreMachine } from "../../api/restore-machine"

export function RestoreMachineDialog() {
  const open = useRestoreMachineStore((s) => s.open)
  const machine = useRestoreMachineStore((s) => s.machine)
  const close = useRestoreMachineStore((s) => s.close)
  const reset = useRestoreMachineStore((s) => s.reset)

  const restoreMachineMutation = useRestoreMachine()

  function handleConfirm() {
    if (!machine?.id) return

    restoreMachineMutation.mutate(
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
          if (restoreMachineMutation.isPending) {
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
          <DialogTitle>Restore machine?</DialogTitle>
          <DialogDescription>
            This will bring {machine?.name} back to your machines list and allow
            it to connect again.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose disabled={restoreMachineMutation.isPending}>
            Cancel
          </DialogClose>
          <Button
            onClick={handleConfirm}
            disabled={restoreMachineMutation.isPending}
          >
            {restoreMachineMutation.isPending ? (
              <>
                <DashRing />
                Restoring...
              </>
            ) : (
              "Restore machine"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
