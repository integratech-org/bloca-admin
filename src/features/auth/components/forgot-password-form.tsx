import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Request password reset for:", email)
    // TODO: Integrate with API and navigate to verify-otp
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <Link
          to="/auth/sign-in"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Forgot your password?
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a verification code to
          reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@bloca.gov.ph"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-neutral-100 dark:bg-neutral-800"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-12 w-full bg-[#c96f4a] font-medium text-white hover:bg-[#b56240]"
        >
          Send Verification Code
        </Button>
      </form>
    </div>
  )
}
