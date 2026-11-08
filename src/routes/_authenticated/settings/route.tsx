import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/_authenticated/settings")({
  staticData: { breadcrumb: "Settings" },
  component: SettingsLayout,
})

const tabs = [
  { id: "profile", label: "Profile", href: "/settings/profile" },
  { id: "security", label: "Security", href: "/settings/security" },
]

function SettingsLayout() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  return (
    <div className="flex flex-col gap-8 lg:flex-1">
      <PageHeader
        eyebrow="ACCOUNT"
        title="Settings"
        description="Manage your profile details and account security."
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Side Tabs */}
        <Card className="py-2 lg:w-60 lg:shrink-0">
          <nav className="flex flex-row gap-1 px-2 lg:flex-col">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href

              return (
                <div key={tab.id} className="relative w-full">
                  {isActive && (
                    <motion.div
                      className="absolute top-0 left-0 h-full w-1 rounded-md bg-primary"
                      layoutId="active-settings-indicator"
                    />
                  )}

                  {isActive && (
                    <motion.div
                      className="absolute top-0 left-0 h-full w-full rounded-md bg-primary/10"
                      layoutId="active-settings-background"
                    />
                  )}
                  <Link
                    to={tab.href}
                    className={cn(
                      "relative flex h-10 w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive &&
                        "text-primary! hover:bg-transparent! hover:text-primary!",
                      !isActive && "text-muted-foreground"
                    )}
                  >
                    {tab.label}
                  </Link>
                </div>
              )
            })}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
