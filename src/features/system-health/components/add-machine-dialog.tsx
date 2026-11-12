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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Copy } from "lucide-react"

interface AddMachineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMachineDialog({
  open,
  onOpenChange,
}: AddMachineDialogProps) {
  const [machineName, setMachineName] = useState("")
  const [site, setSite] = useState("")
  const [issueToken, setIssueToken] = useState(true)
  const [tokenCreatedOpen, setTokenCreatedOpen] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [tokenCopied, setTokenCopied] = useState(false)

  const placeholderToken = "blc_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
    if (!newOpen) {
      // Reset form
      setMachineName("")
      setSite("")
      setIssueToken(true)
    }
  }

  const handleCreateMachine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: Implement machine creation
    console.log("Creating machine:", { name: machineName, site, issueToken })

    if (issueToken) {
      // Close add dialog and open token dialog
      onOpenChange(false)
      setTokenCreatedOpen(true)
    } else {
      // Just close the dialog
      handleOpenChange(false)
    }
  }

  const handleTokenDialogClose = () => {
    setTokenCreatedOpen(false)
    setShowToken(false)
    setTokenCopied(false)
  }

  const isCreateDisabled = machineName.trim() === "" || site.trim() === ""

  return (
    <>
      {/* Dialog 1: Add machine */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleCreateMachine}>
            <DialogHeader>
              <DialogTitle>Add machine</DialogTitle>
              <DialogDescription>
                Register a new BLOCA machine in the system.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="py-4">
              <Field>
                <FieldLabel htmlFor="machine-name">Machine name</FieldLabel>
                <Input
                  id="machine-name"
                  value={machineName}
                  onChange={(e) => setMachineName(e.target.value)}
                  placeholder="e.g. BLOCA machine06"
                  required
                  autoFocus
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="site">Site</FieldLabel>
                <Input
                  id="site"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  placeholder="e.g. Barangay 176-D"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Operators only see machines in their assigned sites.
                </p>
              </Field>

              <Field orientation="horizontal">
                <Checkbox
                  id="issue-token"
                  checked={issueToken}
                  onCheckedChange={(checked) => setIssueToken(checked === true)}
                />
                <FieldLabel htmlFor="issue-token">
                  Issue a token after creating
                </FieldLabel>
              </Field>
            </FieldGroup>

            <Alert variant="warning" className="mb-4">
              <AlertDescription>
                You'll get a <strong>token</strong> on the next screen. The
                token is shown <strong>once</strong>, so copy it into the
                machine's <code>.env</code> before closing it.
              </AlertDescription>
            </Alert>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreateDisabled}>
                Create machine
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog 2: Machine created */}
      <Dialog open={tokenCreatedOpen} onOpenChange={setTokenCreatedOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Machine created</DialogTitle>
            <DialogDescription>
              <strong>{machineName}</strong> is registered. Add this line to the
              machine's <code>.env</code> on the Pi.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <div className="relative rounded-lg bg-black p-4 font-mono text-sm dark:bg-zinc-950">
              <div className="mb-2 flex items-start justify-between gap-2">
                <code className="flex-1 break-all text-amber-400">
                  DEVICE_TOKEN={showToken ? placeholderToken : "•".repeat(40)}
                </code>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowToken(!showToken)}
                  className="text-black"
                >
                  {showToken ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  {showToken ? "Hide" : "Show"}
                </Button>
                <Button>
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>
          </div>

          <Alert variant="warning" className="mb-4">
            <AlertDescription>
              The token is shown <strong>once</strong>. Only a hash is stored,
              so it can't be recovered. If it's lost, rotate it from the actions
              menu.
            </AlertDescription>
          </Alert>

          <Field orientation="horizontal" className="mb-4">
            <Checkbox
              id="token-copied"
              checked={tokenCopied}
              onCheckedChange={(checked) => setTokenCopied(checked === true)}
            />
            <FieldLabel htmlFor="token-copied">
              I've copied the token into the machine's .env
            </FieldLabel>
          </Field>

          <DialogFooter>
            <Button onClick={handleTokenDialogClose} disabled={!tokenCopied}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
