import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Machine } from "@/types/api"
import {
  Ban,
  Eye,
  KeyRound,
  MoreHorizontal,
  Pencil,
  RefreshCw,
  RotateCcw,
  Trash2,
} from "lucide-react"

export function MachinesRowActions({ machine }: { machine: Machine }) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
            <MoreHorizontal />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>More actions</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-fit" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Eye /> View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil /> Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {machine.token_status === "active" ? (
            <>
              <DropdownMenuItem>
                <RefreshCw />
                Rotate token
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Ban />
                Revoke token
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <KeyRound /> Issue token
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {machine.deleted_at ? (
            <DropdownMenuItem>
              <RotateCcw />
              Restore
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
