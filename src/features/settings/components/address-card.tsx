import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { AddressForm } from "./address-form"

export function AddressCard() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-6">
          <CardTitle className="text-xl font-semibold">Address</CardTitle>
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
              {isEditing ? "Save changes" : "Edit"}
            </Button>
          </div>
        </div>
        <CardDescription>
          Used for official records and correspondence.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddressForm key={isEditing ? "edit" : "view"} isEditing={isEditing} />
      </CardContent>
    </Card>
  )
}
