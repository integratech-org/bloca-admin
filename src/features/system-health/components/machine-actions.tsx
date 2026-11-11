import { useState } from "react"
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
import { RevokeTokenDialog } from "./revoke-token-dialog"
import type { Machine } from "../types"

interface MachineActionsProps {
  machine: Machine
}

export function MachineActions({ machine }: MachineActionsProps) {
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false)

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
            <DropdownMenuItem>
              <KeyRound />
              Rotate Token
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRevokeDialogOpen(true)}>
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

      <RevokeTokenDialog
        machine={machine}
        open={revokeDialogOpen}
        onOpenChange={setRevokeDialogOpen}
      />
    </>
  )
}
