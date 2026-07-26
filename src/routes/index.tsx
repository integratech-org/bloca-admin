import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    const { isAuthenticated } = context.session
    throw redirect({ to: isAuthenticated ? "/dashboard" : "/auth/sign-in" })
  },
})
