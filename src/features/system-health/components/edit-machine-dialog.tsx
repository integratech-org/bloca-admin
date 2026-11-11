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
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Machine } from "../types"

interface EditMachineDialogProps {
  machine: Machine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditMachineDialog({
  machine,
  open,
  onOpenChange,
}: EditMachineDialogProps) {
  const [machineName, setMachineName] = useState(machine.name)
  const [site, setSite] = useState(machine.site)

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
    // Reset form when dialog closes
    if (!newOpen) {
      setMachineName(machine.name)
      setSite(machine.site)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: Implement machine update
    console.log("Updated machine:", { name: machineName, site })

    handleOpenChange(false)
  }

  // Disable save if name or site is empty or only spaces
  const isSaveDisabled = machineName.trim() === "" || site.trim() === ""

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]" key={machine.machineId}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit machine</DialogTitle>
            <DialogDescription>
              Update this machine's name and site.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <FieldLabel htmlFor="machine-name">Machine name</FieldLabel>
              <Input
                id="machine-name"
                defaultValue={machine.name}
                onChange={(e) => setMachineName(e.target.value)}
                required
                autoFocus
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="site">Site</FieldLabel>
              <Input
                id="site"
                defaultValue={machine.site}
                onChange={(e) => setSite(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Changing the site changes which operators can see this machine.
              </p>
            </Field>
          </FieldGroup>

          <p className="text-sm text-muted-foreground">
            The token isn't changed here. Use <strong>Rotate token</strong> or{" "}
            <strong>Revoke token</strong> from the actions menu.
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaveDisabled}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
