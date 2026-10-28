import { createFileRoute, Link } from "@tanstack/react-router"
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"
import { PageHeader } from "@/components/page-header"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/_unauthenticated/auth/forgot-password")({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
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
        eyebrow="Account Recovery"
        title="Forgot your password?"
        description="Enter the email address connected to your account and we'll send you a verification code."
      />

      <ForgotPasswordForm />
    </div>
  )
}
