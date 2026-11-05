import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import type { DeploymentStatus } from "../types"

export function AddDeploymentDialog() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<DeploymentStatus | "">("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const deploymentData = {
      siteName: formData.get("siteName") as string,
      location: formData.get("location") as string,
      status: status,
      contact: formData.get("contact") as string,
      blocksUsed: formData.get("blocksUsed")
        ? Number(formData.get("blocksUsed"))
        : undefined,
      description: formData.get("description") as string,
    }

    // TODO: Add new deployment to sites data
    console.log("New deployment data:", deploymentData)

    setOpen(false)
    e.currentTarget.reset()
    setStatus("")
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setStatus("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size="sm" />}>
        <Plus />
        Add Deployment
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Deployment</DialogTitle>
            <DialogDescription>
              Create a new deployment site for block placement tracking.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <FieldLabel htmlFor="siteName">Site Name</FieldLabel>
              <Input
                id="siteName"
                name="siteName"
                type="text"
                placeholder="e.g., Phase 1 Pathway Repair"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g., Blk 76, Bagong Silang"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as DeploymentStatus)}
                required
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="contact">Contact (Optional)</FieldLabel>
              <Input
                id="contact"
                name="contact"
                type="text"
                placeholder="e.g., Kagawad R. Santos"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="blocksUsed">
                Blocks Used (Optional)
              </FieldLabel>
              <Input
                id="blocksUsed"
                name="blocksUsed"
                type="number"
                min="0"
                placeholder="e.g., 240"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">
                Description (Optional)
              </FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the deployment project"
                rows={3}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Deployment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
