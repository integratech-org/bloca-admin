import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface Props {
  isEditing: boolean
}

export function ChangePasswordForm({ isEditing }: Props) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
          <Input
            id="currentPassword"
            name="currentPassword"
            disabled={!isEditing}
            placeholder="Enter current password"
            required
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="newPassword">New password</FieldLabel>
            <Input
              id="newPassword"
              name="newPassword"
              disabled={!isEditing}
              placeholder="Enter new password"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmNewPassword">
              Confirm password
            </FieldLabel>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              disabled={!isEditing}
              placeholder="Enter confirm new password"
              required
            />
          </Field>
        </div>
      </FieldGroup>
    </form>
  )
}
