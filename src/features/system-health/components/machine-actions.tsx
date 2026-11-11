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
import { Eye, Pencil, KeyRound, X, Trash2, MoreVertical } from "lucide-react"
import { useState } from "react"
import { RotateTokenDialog } from "./rotate-token-dialog"
import type { Machine } from "../types"

interface MachineActionProps {
  machine: Machine
}

export function MachineActions({ machine }: MachineActionProps) {
  const [rotateDialogOpen, setRotateDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon" />}
          aria-label="Open menu"
        >
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log("Rotate Token clicked")
                setRotateDialogOpen(true)
              }}
            >
              <KeyRound />
              Rotate Token
            </DropdownMenuItem>
            <DropdownMenuItem>
              <X />
              Revoke Token
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <RotateTokenDialog
        machine={machine}
        open={rotateDialogOpen}
        onOpenChange={setRotateDialogOpen}
      />
    </>
  )
}
