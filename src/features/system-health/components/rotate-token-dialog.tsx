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
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Eye,
  EyeOff,
  Copy,
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react"
import type { Machine } from "../types"

interface RotateTokenDialogProps {
  machine: Machine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RotateTokenDialog({
  machine,
  open,
  onOpenChange,
}: RotateTokenDialogProps) {
  console.log("RotateTokenDialog render - open:", open) // ADD THIS

  const [tokenCreatedOpen, setTokenCreatedOpen] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const placeholderToken = "blc_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"

  // Handler for Create button
  const handleCreate = () => {
    onOpenChange(false)
    setTokenCreatedOpen(true)
  }

  // Handler for Done button
  const handleDone = () => {
    setTokenCreatedOpen(false)
    setShowToken(false)
  }

  return (
    <>
      {/* Dialog 1: Rotate Token Confirmation */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold"> Rotate token</DialogTitle>
            <DialogDescription>
              Generate a new token for <strong>{machine.name}</strong>. The
              current token stops working as soon as the new one is created.
            </DialogDescription>
          </DialogHeader>

          <Alert variant="warning" className="max-w-md">
            <AlertCircleIcon />
            <AlertDescription>
              Update the machine with the new token right after creating it, or
              it will stop syncing.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog 2: Token Created Success */}
      <Dialog open={tokenCreatedOpen} onOpenChange={setTokenCreatedOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">Token Created</DialogTitle>
            <DialogDescription>
              Your new token has been created.{" "}
              <strong>Copy it now, as it will not be shown again.</strong>
            </DialogDescription>
          </DialogHeader>

          <Field>
            <FieldLabel>New token</FieldLabel>
            <div className="flex gap-2">
              <InputGroup className="flex-1">
                <InputGroupInput
                  type={showToken ? "text" : "password"}
                  value={placeholderToken}
                  readOnly
                  className="font-mono"
                />
                <InputGroupAddon>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowToken(!showToken)}
                  >
                    {showToken ? <EyeOff /> : <Eye />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <Button variant="outline">
                <Copy />
                Copy
              </Button>
            </div>
          </Field>

          <Alert variant="success" className="max-w-md">
            <CheckCircle2Icon />
            <AlertDescription>
              {machine.name} will resume syncing once it is updated with this
              token. The old token is now invalid.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button onClick={handleDone}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
