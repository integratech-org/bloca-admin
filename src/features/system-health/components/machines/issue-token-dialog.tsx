import type { TokenStatus } from "@/types/api"
import { useIssueTokenStore } from "../../stores/issue-token-store"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useIssueToken } from "../../api/issue-token"
import { useMachineTokenStore } from "../../stores/machine-token-store"
import { DashRing } from "@/components/loading-ui/dash-ring"
import { Button } from "@/components/ui/button"

const COPY: Record<
  Exclude<TokenStatus, "revoked">,
  {
    title: string
    description: (name?: string) => string
    confirm: string
    pending: string
  }
> = {
  active: {
    title: "Rotate token?",
    description: (name) =>
      `This will generate a new device token for ${name}. The current token stops working immediately, so you'll need to update the machine's edge config.`,
    confirm: "Rotate token",
    pending: "Rotating...",
  },
  not_issued: {
    title: "Issue a new token?",
    description: (name) =>
      `This will generate a device token for ${name}. You'll only see it once, so copy it right away.`,
    confirm: "Issue token",
    pending: "Issuing...",
  },
}

export function IssueTokenDialog() {
  const open = useIssueTokenStore((s) => s.open)
  const machine = useIssueTokenStore((s) => s.machine)
  const close = useIssueTokenStore((s) => s.close)
  const reset = useIssueTokenStore((s) => s.reset)
  const show = useMachineTokenStore((s) => s.show)

  const issueTokenMutation = useIssueToken()

  function handleConfirm() {
    if (!machine?.id) return

    issueTokenMutation.mutate(
      { machineId: machine.id },
      {
        onSuccess: (res) => {
          close()
          show(res, machine.token_status === "active" ? "rotated" : "issued")
        },
      }
    )
  }

  const copy =
    COPY[machine?.token_status === "active" ? "active" : "not_issued"]

  return (
    <Dialog
      open={open}
      onOpenChange={(next, eventDetails) => {
        if (!next) {
          if (issueTokenMutation.isPending) {
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
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>
            {copy.description(machine?.name)}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose disabled={issueTokenMutation.isPending}>
            Cancel
          </DialogClose>
          <Button
            onClick={handleConfirm}
            disabled={issueTokenMutation.isPending}
          >
            {issueTokenMutation.isPending ? (
              <>
                <DashRing />
                {copy.pending}
              </>
            ) : (
              copy.confirm
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
