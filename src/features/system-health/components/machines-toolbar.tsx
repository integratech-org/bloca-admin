import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Filter, Plus, Search } from "lucide-react"

interface Props {
  total: number
}

export function MachinesToolbar({ total }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium">
        All Machines <span className="text-muted-foreground">{total}</span>
      </h2>

      <div className="flex items-center gap-2">
        <InputGroup>
          <InputGroupInput placeholder="Search Machine..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Button variant="outline">
          <Filter />
          Filter
        </Button>
        <Button>
          <Plus />
          Add Machine
        </Button>
      </div>
    </div>
  )
}
