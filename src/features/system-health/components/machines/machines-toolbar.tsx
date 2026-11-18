import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { MachinesFilters } from "./machines-filters"
import { AddMachineDialog } from "./add-machine-dialog"

interface Props {
  total?: number
}

export function MachinesToolbar({ total }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium">
        All machines <span className="text-muted-foreground">{total}</span>
      </h2>

      <div className="flex items-center gap-2">
        <InputGroup>
          <InputGroupInput placeholder="Search machines..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <MachinesFilters />
        <AddMachineDialog />
      </div>
    </div>
  )
}
