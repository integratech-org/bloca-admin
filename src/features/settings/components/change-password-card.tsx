import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export function ChangePasswordCard() {
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleEdit = async () => {
    if (isEditing) {
      setIsLoading(true)
      // TODO: Add password change logic
      console.log("Updating password...")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsLoading(false)
    }
    setIsEditing(!isEditing)
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="font-heading text-base font-semibold">
          Change password
        </h3>
        <p className="text-sm text-muted-foreground">
          Set a new password for your account.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldGroup>
          {/* Current Password */}
          <Field>
            <Label htmlFor="currentPassword">Current password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                disabled={!isEditing}
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </Field>

          {/* New Password & Confirm Password - Two column grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="newPassword">New password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                At least 8 characters.
              </p>
            </Field>

            <Field>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </Field>
          </div>
        </FieldGroup>

        {/* Update Button */}
        <div className="flex justify-start">
          <Button onClick={handleToggleEdit} disabled={isLoading}>
            {isLoading
              ? "Updating..."
              : isEditing
                ? "Update password"
                : "Edit password"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
