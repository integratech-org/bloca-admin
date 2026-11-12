import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { EmailAddressForm } from "./email-address-form"

export function EmailAddressCard() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-6">
          <CardTitle className="text-xl font-semibold">Email address</CardTitle>
          <div className="flex items-center gap-2">
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            )}
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Send verification code" : "Edit"}
            </Button>
          </div>
        </div>
        <CardDescription>
          This is the address you use to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EmailAddressForm
          key={isEditing ? "edit" : "view"}
          isEditing={isEditing}
        />
      </CardContent>
    </Card>
  )
}
