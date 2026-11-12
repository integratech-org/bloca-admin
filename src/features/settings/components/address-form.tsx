import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface Props {
  isEditing: boolean
}

export function AddressForm({ isEditing }: Props) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="addressLine">House no., street</FieldLabel>
          <Input
            id="addressLine"
            name="addressLine"
            placeholder="House no., street"
            disabled={!isEditing}
            required
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="barangay">Barangay</FieldLabel>
            <Input
              id="barangay"
              name="barangay"
              placeholder="Barangay"
              disabled={!isEditing}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="city">City / Municipality</FieldLabel>
            <Input
              id="cityMunicipality"
              name="cityMunicipality"
              placeholder="City or municipality"
              disabled={!isEditing}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="province">Province</FieldLabel>
            <Input
              id="province"
              name="province"
              placeholder="Province (or Metro Manila)"
              disabled={!isEditing}
              required
            />
          </Field>
        </div>
      </FieldGroup>
    </form>
  )
}
