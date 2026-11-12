import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { EmailData } from "../types/security"

interface EmailAddressCardProps {
  data: EmailData
}

export function EmailAddressCard({ data }: EmailAddressCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleToggleEdit = () => {
    if (isEditing) {
      // TODO: Save logic here
      console.log("Changing email...")
    }
    setIsEditing(!isEditing)
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="font-heading text-base font-semibold">Email address</h3>
        <p className="text-sm text-muted-foreground">
          This is the address you use to sign in.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Field */}
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue={data.email}
            placeholder="you@example.com"
            disabled={!isEditing}
          />
          <p className="text-sm text-muted-foreground">
            We will send a verification link to the new address before the
            change applies.
          </p>
        </Field>

        {/* Change Email Button */}
        <div className="flex justify-start">
          <Button onClick={handleToggleEdit}>
            {isEditing ? "Save email" : "Change email"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
