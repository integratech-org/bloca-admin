import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Link } from "@tanstack/react-router"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

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

        {/* password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup className="h-12">
            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            <InputGroupAddon align="inline-end">
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </InputGroupAddon>
          </InputGroup>

          <Link
            to="/auth/forgot-password"
            className="text-right text-sm font-semibold text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </Field>

        <Field orientation="horizontal">
          <Button type="submit" className="h-12 w-full">
            Sign In
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
