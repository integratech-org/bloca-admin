import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useEffect, useState } from "react"

export function VerifyOtpForm() {
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleResend = () => {
    setTimeLeft(60)
  }

  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="otp">Verification code</FieldLabel>
          <InputOTP id="otp" maxLength={6} containerClassName="w-full">
            <InputOTPGroup className="w-full gap-3 *:data-[slot=input-otp-slot]:aspect-square *:data-[slot=input-otp-slot]:h-auto *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>

        <Field orientation="horizontal">
          <Button type="submit" className="h-12 w-full">
            Verify code
          </Button>
        </Field>

        <p className="text-center text-xs text-muted-foreground">
          {timeLeft > 0 ? (
            `Resend available in ${formatTime(timeLeft)}`
          ) : (
            <>
              Didn't get the code?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleResend()
                }}
                className="underline hover:text-primary"
              >
                Resend code
              </a>
            </>
          )}
        </p>
      </FieldGroup>
    </form>
  )
}
