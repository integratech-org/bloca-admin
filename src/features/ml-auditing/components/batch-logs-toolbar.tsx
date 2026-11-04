import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { BatchLogsFilters } from "./batch-logs-filters"

interface Props {
  total: number
}

export function BatchLogsToolbar({ total }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium">
        Batch Prediction Logs{" "}
        <span className="text-muted-foreground">{total}</span>
      </h2>

      <div className="flex items-center gap-2">
        <InputGroup>
          <InputGroupInput placeholder="Search logs..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <BatchLogsFilters />
      </div>
    </div>
  )
}
