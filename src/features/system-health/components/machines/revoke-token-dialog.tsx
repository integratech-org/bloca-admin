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
import { useRevokeTokenStore } from "../../stores/revoke-token-store"
import { useRevokeToken } from "../../api/revoke-token"

export function RevokeTokenDialog() {
  const open = useRevokeTokenStore((s) => s.open)
  const machine = useRevokeTokenStore((s) => s.machine)
  const close = useRevokeTokenStore((s) => s.close)
  const reset = useRevokeTokenStore((s) => s.reset)

  const revokeTokenMutation = useRevokeToken()

  function handleConfirm() {
    if (!machine?.id) return

    revokeTokenMutation.mutate(
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
          if (revokeTokenMutation.isPending) {
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
          <DialogTitle>Revoke token?</DialogTitle>
          <DialogDescription>
            This will permanently revoke the device token for {machine?.name}.
            The machine will stop working immediately and won't be able to
            connect until you issue a new token.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose disabled={revokeTokenMutation.isPending}>
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={revokeTokenMutation.isPending}
          >
            {revokeTokenMutation.isPending ? (
              <>
                <DashRing />
                Revoking...
              </>
            ) : (
              "Revoke token"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
