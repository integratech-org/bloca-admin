import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

interface Props {
  isEditing: boolean
}

export function ContactNumberForm({ isEditing }: Props) {
  return (
    <form>
      <Field>
        <FieldLabel htmlFor="contactNumber">Contact number</FieldLabel>
        <InputGroup>
          <InputGroupInput id="contactNumber" disabled={!isEditing} required />
          <InputGroupAddon>
            +63
            <Separator orientation="vertical" className="h-5" />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </form>
  )
}
