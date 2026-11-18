import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ListFilter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function MachinesFilters() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <ListFilter />
        Filters
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex items-center justify-between gap-4">
          <PopoverHeader>
            <PopoverTitle>
              <span className="text-base">Filter</span>
            </PopoverTitle>
          </PopoverHeader>

          <Button variant="outline">Reset filters</Button>
        </div>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Apply filters</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
