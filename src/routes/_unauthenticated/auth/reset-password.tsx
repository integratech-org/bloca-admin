import { createFileRoute, Link } from "@tanstack/react-router"
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"

export const Route = createFileRoute("/_unauthenticated/auth/reset-password")({
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
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
        eyebrow="Secure your account"
        title="Set a new password"
        description="Enter your new password below. Make sure it's strong and secure."
      />

      <ResetPasswordForm />
    </div>
  )
}
