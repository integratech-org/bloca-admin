import { cn } from "@/lib/utils"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-full">
      {/* Left Panel - Branding with Grid Background */}
      <div className="relative hidden w-1/2 bg-[#1a1410] lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Grid Background */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[40px_40px]",
            "bg-[linear-gradient(to_right,rgba(201,111,74,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,111,74,0.15)_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[#1a1410] mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Content */}
        <div className="relative max-w-md">
          <h1 className="font-heading text-5xl leading-tight font-bold text-white">
            BLOCA:
          </h1>
          <h2 className="font-heading text-5xl leading-tight font-bold text-[#c96f4a]">
            Community Impact &
          </h2>
          <h2 className="font-heading text-5xl leading-tight font-bold text-white">
            SWM Tracker
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-neutral-400">
            A closed-loop monitoring system for LDPE waste diversion,
            <br />
            eco-brick production, and community deployment tracking
            <br />
            across Barangay 176-D Bagong Silang, Caloocan City
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="relative flex w-full items-center justify-center bg-white lg:w-1/2 dark:bg-black">
        {/* Form Content */}
        <div className="relative z-20 w-full max-w-md px-6">{children}</div>
      </div>
    </div>
  )
}
