import { createFileRoute } from "@tanstack/react-router"
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form"

export const Route = createFileRoute("/_unauthenticated/auth/reset-password")({
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  return <ResetPasswordForm />
}
