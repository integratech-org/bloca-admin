import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import type { Machine } from "../types"

interface RevokeTokenDialogProps {
  machine: Machine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RevokeTokenDialog({
  machine,
  open,
  onOpenChange,
}: RevokeTokenDialogProps) {
  const [isChecked, setIsChecked] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
    if (!newOpen) {
      setIsChecked(false)
    }
  }

  const handleRevoke = () => {
    // TODO: Implement token revocation
    onOpenChange(false)
    setIsChecked(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Revoke token?</DialogTitle>
          <DialogDescription>
            You are about to revoke the token of <strong>{machine.name}</strong>{" "}
            ({machine.site}).
          </DialogDescription>
        </DialogHeader>

        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>The machine stops syncing immediately</li>
          <li>Filtration and hardware readings will no longer update</li>
          <li>You can issue a new token later using Rotate Token</li>
        </ul>

        <Field orientation="horizontal">
          <Checkbox
            id="confirm-revoke"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked === true)}
          />
          <FieldLabel htmlFor="confirm-revoke">
            I understand this machine will go offline.
          </FieldLabel>
        </Field>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleRevoke}
            disabled={!isChecked}
          >
            Revoke token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
