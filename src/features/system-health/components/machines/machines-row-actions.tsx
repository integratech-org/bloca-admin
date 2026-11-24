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
import { useUpdateMachineStore } from "../../stores/update-machine-store"
import { useIssueTokenStore } from "../../stores/issue-token-store"
import { useRevokeTokenStore } from "../../stores/revoke-token-store"
import { useDeleteMachineStore } from "../../stores/delete-machine-store"
import { useRestoreMachineStore } from "../../stores/restore-machine-store"

export function MachinesRowActions({ machine }: { machine: Machine }) {
  const showUpdateMachineDialog = useUpdateMachineStore((s) => s.show)
  const showIssueTokenDialog = useIssueTokenStore((s) => s.show)
  const showRevokeTokenDialog = useRevokeTokenStore((s) => s.show)
  const showDeleteMachineDialog = useDeleteMachineStore((s) => s.show)
  const showRestoreMachineDialog = useRestoreMachineStore((s) => s.show)

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Actions</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-fit" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Eye /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => showUpdateMachineDialog(machine)}>
            <Pencil /> Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {machine.token_status === "active" ? (
            <>
              <DropdownMenuItem onClick={() => showIssueTokenDialog(machine)}>
                <RefreshCw />
                Rotate token
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => showRevokeTokenDialog(machine)}
              >
                <Ban />
                Revoke token
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => showIssueTokenDialog(machine)}>
              <KeyRound /> Issue token
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {machine.deleted_at ? (
            <DropdownMenuItem onClick={() => showRestoreMachineDialog(machine)}>
              <RotateCcw />
              Restore
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => showDeleteMachineDialog(machine)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
