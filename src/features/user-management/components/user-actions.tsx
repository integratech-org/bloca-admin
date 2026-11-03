import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserCog, Ban, Trash2 } from "lucide-react"

// TODO: Import User from ../types when feat/user-mock-data branch merges
interface User {
  id: string
  name: string
  email: string
  role: "system_admin" | "barangay_admin" | "operator"
  status: "active" | "pending" | "disabled"
  createdDate: string
  lastActive: string
}

interface UserActionsProps {
  user: User
}

export function UserActions({ user }: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => console.log("Edit", user.id)}>
          <UserCog className="mr-2 h-4 w-4" />
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Toggle status", user.id)}>
          <Ban className="mr-2 h-4 w-4" />
          {user.status === "active" ? "Disable" : "Enable"} Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => console.log("Delete", user.id)}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
