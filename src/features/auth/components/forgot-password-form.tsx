import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function ForgotPasswordForm() {
  return (
    <form>
      <FieldGroup>
        {/* email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@bloca.gov.ph"
            required
            className="h-12"
          />
        </Field>

        <Field orientation="horizontal">
          <Button type="submit" className="h-12 w-full">
            Send verification code
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
