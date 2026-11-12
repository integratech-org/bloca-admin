import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock user data - replace with actual auth context later
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@bloca.local",
  role: "System Admin",
}

export function UserNav() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const initials = `${mockUser.firstName[0]}${mockUser.lastName[0]}`

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    console.log("Sign out clicked")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="gap-2 px-2 py-5">
            <Avatar size="sm">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start text-left lg:flex">
              <span className="text-sm font-medium">
                {mockUser.firstName} {mockUser.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {mockUser.role}
              </span>
            </div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">
                {mockUser.firstName} {mockUser.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{mockUser.role}</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <DropdownMenuItem
            render={
              <Link to="/settings/profile" className="flex w-full items-center">
                <User className="mr-2" />
                <span>My profile</span>
              </Link>
            }
            className={cn(
              pathname === "/settings/profile" &&
                "bg-accent text-accent-foreground"
            )}
          />
          <DropdownMenuItem
            render={
              <Link
                to="/settings/security"
                className="flex w-full items-center"
              >
                <Settings className="mr-2" />
                <span>Security</span>
              </Link>
            }
            className={cn(
              pathname === "/settings/security" &&
                "bg-accent text-accent-foreground"
            )}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
