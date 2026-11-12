import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { ContactNumberForm } from "./contact-number-form"

export function ContactNumberCard() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-6">
          <CardTitle className="text-xl font-semibold">
            Contact number
          </CardTitle>
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
          Changes are only saved after you verify a one-time password (OTP).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContactNumberForm
          key={isEditing ? "edit" : "view"}
          isEditing={isEditing}
        />
      </CardContent>
    </Card>
  )
}
