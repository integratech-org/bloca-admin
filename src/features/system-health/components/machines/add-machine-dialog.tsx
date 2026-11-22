import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { KeyRound, Plus } from "lucide-react"

export function AddMachineDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button />}>
          <Plus />
          Add Machine
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add machine</DialogTitle>
            <DialogDescription>
              Register a new machine in the system.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Machine name</FieldLabel>
              <Input id="name" name="name" placeholder="e.g. BLOCA-machine0" />
              <FieldDescription>
                A name to identify this machine in the dashboard.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="site">Site</FieldLabel>
              <Input
                id="site"
                name="site"
                placeholder="e.g. Bagong Silang, Caloocan"
              />
              <FieldDescription>
                Where the machine is installed.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <KeyRound />
            <AlertTitle>Access token</AlertTitle>
            <AlertDescription>
              A token will be generated after saving. It's only shown once, so
              copy it right away.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Add machine</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
