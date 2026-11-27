import { DashRing } from "@/components/loading-ui/dash-ring"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import type { SessionResponse } from "@/lib/allauth"
import { signInInputSchema, useLogin } from "@/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import type z from "zod"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof signInInputSchema>>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: { email: "", password: "" },
  })

  const login = useLogin({
    onSuccess: () => navigate({ to: "/" }),
    onError: (error) => {
      const res = error as unknown as SessionResponse

      if (res.status === 400) {
        form.setError("root", {
          type: "manual",
          message: "Invalid email or password",
        })
      } else if (
        res.status === 401 &&
        res.data.flows.some((f) => f.id === "verify_email" && f.is_pending)
      ) {
        form.setError("root", {
          type: "manual",
          message: "Please verify your email before signing in.",
        })
      } else {
        form.setError("root", {
          type: "manual",
          message: "An unexpected error occurred. Please try again later.",
        })
      }
    },
  })

  return (
    <form onSubmit={form.handleSubmit((values) => login.mutate(values))}>
      <FieldGroup>
        {form.formState.errors.root && (
          <Alert className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        )}

        {/* email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="email"
                type="email"
                placeholder="you@bloca.gov.ph"
                className="h-12"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">
                Password <span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup className="h-12">
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

              <Link
                to="/auth/forgot-password"
                className="text-right text-sm font-light text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <Button
            type="submit"
            className="h-12 w-full"
            disabled={login.isPending || !form.formState.isDirty}
          >
            {login.isPending ? (
              <>
                <DashRing />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
