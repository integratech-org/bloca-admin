import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

export function VerifyOtpForm() {
  const [otp, setOtp] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Verify OTP:", otp)
    // TODO: Integrate with API and navigate to reset-password
  }

  const handleResend = () => {
    console.log("Resend OTP")
    // TODO: Integrate with API
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <Link
          to="/auth/forgot-password"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Verify your code
        </h1>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit verification code to your email address. Please
          enter it below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="otp"
            className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Verification Code
          </Label>
          <Input
            id="otp"
            type="text"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            className="h-12 bg-neutral-100 text-center text-2xl tracking-widest dark:bg-neutral-800"
            required
          />
        </div>

        <Button
          type="submit"
          className="h-12 w-full bg-[#c96f4a] font-medium text-white hover:bg-[#b56240]"
        >
          Verify Code
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Didn't receive the code?{" "}
            <span className="font-medium text-[#c96f4a]">Resend</span>
          </button>
        </div>
      </form>
    </div>
  )
}
