import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Machine } from "../types"

interface DeleteMachineDialogProps {
  machine: Machine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteMachineDialog({
  machine,
  open,
  onOpenChange,
}: DeleteMachineDialogProps) {
  const [confirmText, setConfirmText] = useState("")

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
    if (!newOpen) {
      setConfirmText("")
    }
  }

  const handleDelete = () => {
    // TODO: Implement machine deletion
    onOpenChange(false)
    setConfirmText("")
  }

  const isDeleteEnabled = confirmText === machine.name

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete machine?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes <strong>{machine.name}</strong>, its token
            and its maintenance history. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Alert variant="warning">
          <AlertDescription>
            Deployment at {machine.site} will have no active machine.
          </AlertDescription>
        </Alert>

        <Field>
          <FieldLabel htmlFor="confirm-delete">
            Type <strong>{machine.name}</strong> to confirm
          </FieldLabel>
          <Input
            id="confirm-delete"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={machine.name}
          />
        </Field>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={!isDeleteEnabled}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
