import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { DiagnosticsFilters } from "./filters"

interface Props {
  total: number
}

export function DiagnosticsToolbar({ total }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-heading text-lg font-semibold">
          Hardware Diagnostics Log{" "}
          <span className="text-muted-foreground">{total}</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          ESP32 &amp; Raspberry Pi sensor readings
        </p>
      </div>

      <div className="flex items-center gap-2">
        <InputGroup>
          <InputGroupInput placeholder="Search diagnostics..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <DiagnosticsFilters />
      </div>
    </div>
  )
}
