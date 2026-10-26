import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@tanstack/react-router"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in:", { email, password })
    // TODO: Integrate with API
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Sign in to your account
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Email / Username
          </Label>
          <Input
            id="email"
            type="text"
            placeholder="you@bloca.gov.ph"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-neutral-100 dark:bg-neutral-800"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-neutral-100 pr-10 dark:bg-neutral-800"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="h-12 w-full bg-[#c96f4a] font-medium text-white hover:bg-[#b56240]"
        >
          Sign In
        </Button>
      </form>
    </div>
  )
}
