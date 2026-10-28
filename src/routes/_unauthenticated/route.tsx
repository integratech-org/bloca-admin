import { cn } from "@/lib/utils"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_unauthenticated")({
  component: UnauthenticatedLayout,
})

function UnauthenticatedLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[3fr_2fr]">
      <div className="relative hidden items-center justify-center bg-[oklch(0.1878_0.0181_50.3007)] lg:flex">
        {/* grid bg */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[80px_80px]",
            "bg-[linear-gradient(to_right,rgba(201,111,74,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,111,74,0.15)_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* content */}
        <div className="relative max-w-2xl">
          <p className="font-heading text-5xl leading-tight font-bold tracking-tight text-primary-foreground xl:text-6xl">
            BLOCA:
            <br />
            <span className="text-primary">Community Impact &</span>
            <br />
            SWM Tracker
          </p>
          <p className="max-w-xl text-base leading-relaxed text-[oklch(0.673_0.026_50.9966)]">
            A closed-loop monitoring system for LDPE waste diversion, eco-brick
            production, and community deployment tracking across Barangay 176-D
            Bagong Silang, Caloocan City
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  )
}
