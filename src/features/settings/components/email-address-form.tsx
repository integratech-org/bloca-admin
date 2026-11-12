import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface Props {
  isEditing: boolean
}

export function EmailAddressForm({ isEditing }: Props) {
  return (
    <form>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          disabled={!isEditing}
          placeholder="Email address"
          required
        />
      </Field>
    </form>
  )
}
