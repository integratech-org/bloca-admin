import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { ProfileData } from "../types/profile"

interface ProfileInformationCardProps {
  data: ProfileData
}

export function ProfileInformationCard({ data }: ProfileInformationCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const initials = `${data.firstName[0] || ""}${data.lastName[0] || ""}`

  const handleToggleEdit = () => {
    if (isEditing) {
      // TODO: Save logic here
      console.log("Saving...")
    }
    setIsEditing(!isEditing)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-base font-semibold">
            Profile information
          </h3>
          <p className="text-sm text-muted-foreground">
            Update your personal details and photo.
          </p>
        </div>
        <Button size="sm" onClick={handleToggleEdit}>
          {isEditing ? "Save changes" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar section */}
        <div className="flex items-center gap-4">
          <Avatar size="lg">
            {data.avatarUrl ? (
              <AvatarImage src={data.avatarUrl} alt="Profile" />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {data.firstName} {data.lastName}
              </span>
              <span className="text-xs text-muted-foreground">{data.role}</span>
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-primary hover:underline"
              >
                Change photo
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Form fields */}
        <FieldGroup>
          {/* First Name & Last Name - Two column grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                defaultValue={data.firstName}
                placeholder="First name"
                disabled={!isEditing}
              />
            </Field>

            <Field>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                defaultValue={data.lastName}
                placeholder="Last name"
                disabled={!isEditing}
              />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
