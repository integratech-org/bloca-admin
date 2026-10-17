import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { UsersFilters } from "./filters"
import { AddUserDialog } from "./add-user-dialog"

interface Props {
  total: number
}

export function UsersToolbar({ total }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium">
        All users <span className="text-muted-foreground">{total}</span>
      </h2>

      <div className="flex items-center gap-2">
        <InputGroup>
          <InputGroupInput placeholder="Search users..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <UsersFilters />
        <AddUserDialog />
      </div>
    </div>
  )
}
