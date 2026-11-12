import { ChevronsUpDown, LogOut, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useLocation } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

const items = [
  { to: "/settings/profile", label: "Profile", icon: User },
  { to: "/settings/security", label: "Security", icon: Shield },
]

export function UserNav() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  return (
    <DropdownMenu>
      <Tooltip disableHoverablePopup>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  aria-label="Open user menu"
                  className="size-9 rounded-full p-0 md:h-9 md:w-auto md:gap-2 md:pr-2.5"
                >
                  <Avatar className="size-9 md:size-8">
                    <AvatarImage src="#" alt="Avatar" />
                    <AvatarFallback className="bg-transparent">
                      JD
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden min-w-0 flex-col items-start text-left leading-none md:flex">
                    <span className="truncate text-[13px] font-medium">
                      John Doe
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      System Admin
                    </span>
                  </span>

                  <ChevronsUpDown className="hidden size-3.5 text-muted-foreground md:block" />
                </Button>
              }
            />
          }
        />
        <TooltipContent side="bottom">Account</TooltipContent>
      </Tooltip>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">
                johndoe@example.com
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          {items.map((item) => {
            const isActive = pathname.startsWith(item.to)

            return (
              <DropdownMenuItem
                key={item.to}
                className={cn(
                  "cursor-pointer focus:bg-sidebar-accent focus:text-sidebar-accent-foreground not-data-[variant=destructive]:focus:**:text-sidebar-accent-foreground",
                  isActive &&
                    "bg-primary/10 text-primary focus:bg-primary/10 focus:text-primary not-data-[variant=destructive]:focus:**:text-primary"
                )}
                render={
                  <Link to={item.to} className="flex items-center">
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Link>
                }
              />
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="hover:cursor-pointer"
          onClick={() => {}}
        >
          <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
