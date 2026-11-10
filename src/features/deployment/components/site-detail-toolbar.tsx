import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { SiteDetailFilters } from "./site-detail-filters"

export function SiteDetailToolbar() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-heading text-base font-semibold">
          Site Detail
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="flex-1 sm:max-w-xs">
          <InputGroupInput placeholder="Search sites..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <SiteDetailFilters />
      </div>
    </div>
  )
}
