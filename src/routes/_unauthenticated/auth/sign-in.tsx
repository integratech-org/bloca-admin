import { createFileRoute } from "@tanstack/react-router"
import { SignInForm } from "@/features/auth/components/sign-in-form"
import { PageHeader } from "@/components/page-header"

export const Route = createFileRoute("/_unauthenticated/auth/sign-in")({
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="flex w-full max-w-sm flex-col justify-center gap-8">
      <PageHeader eyebrow="Welcome back" title="Sign in to your account" />

      <SignInForm />
    </div>
  )
}
