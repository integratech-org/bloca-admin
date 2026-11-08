import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { DefectStatusFilters } from "./defect-status-filters"

interface Props {
  total: number
}

export function DefectReviewToolbar({ total }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="text-lg font-medium">
        Defect Review Panel{" "}
        <span className="text-muted-foreground">{total}</span>
      </h2>

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <InputGroup>
          <InputGroupInput placeholder="Search defects..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <DefectStatusFilters />
      </div>
    </div>
  )
}
