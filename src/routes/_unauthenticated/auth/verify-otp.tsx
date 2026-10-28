import { createFileRoute, Link } from "@tanstack/react-router"
import { VerifyOtpForm } from "@/features/auth/components/verify-otp-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export const Route = createFileRoute("/_unauthenticated/auth/verify-otp")({
  component: VerifyOtpPage,
})

function VerifyOtpPage() {
  return (
    <div className="flex w-full max-w-sm flex-col justify-center gap-8">
      <Button
        nativeButton={false}
        render={<Link to="/auth/sign-in" />}
        variant="link"
        className="w-fit px-0"
      >
        <ArrowLeft />
        Back to sign in
      </Button>

      <PageHeader
        eyebrow="Verify your identity"
        title="Enter verification code"
        description="We sent a six-digit code to example@email.com."
      />

      <VerifyOtpForm />
    </div>
  )
}
