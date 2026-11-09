import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { ContactData } from "../types/profile"

interface ContactCardProps {
  data: ContactData
}

export function ContactCard({ data }: ContactCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleToggleEdit = () => {
    if (isEditing) {
      // TODO: Save logic here
      console.log("Updating contact...")
    }
    setIsEditing(!isEditing)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex flex-1 flex-col">
          <h3 className="font-heading text-base font-semibold">Contact</h3>
          <p className="text-sm text-muted-foreground">
            How we reach you about account activity and alerts.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Number */}
        <Field>
          <Label htmlFor="contactNumber">Contact number</Label>
          <div className="flex gap-2">
            <div className="flex h-8 shrink-0 items-center rounded-lg border border-input bg-muted px-2.5 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs font-medium text-primary">PH</span>
                +63
              </span>
            </div>
            <Input
              id="contactNumber"
              defaultValue={data.contactNumber.replace("+63 ", "")}
              placeholder="9XX XXX XXXX"
              className="flex-1"
              disabled={!isEditing}
            />
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-xs">
              i
            </span>
            Only used for security alerts and account recovery.
          </p>
        </Field>

        {/* Update Button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleToggleEdit}>
            {isEditing ? "Save contact" : "Update contact"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
