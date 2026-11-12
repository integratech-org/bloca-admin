import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"

const items = [
  { to: "/settings/profile", label: "Profile" },
  { to: "/settings/security", label: "Security" },
]

export function SettingsNav() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  return (
    <nav className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl border bg-card p-0.5 md:flex md:flex-col md:self-start">
      {items.map((item) => {
        const isActive = pathname.startsWith(item.to)
        return (
          <Button
            key={item.to}
            variant="ghost"
            nativeButton={false}
            render={<Link to={item.to} />}
            className={cn(
              "hover:text-text w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:justify-start",
              isActive &&
                "bg-primary/10 font-medium text-primary! hover:bg-primary/10 hover:text-primary!"
            )}
          >
            {item.label}
          </Button>
        )
      })}
    </nav>
  )
}
