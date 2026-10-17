import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, ListFilter } from "lucide-react"
import { JOINED, ROLES, STATUS, type Joined } from "../constants"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

export function UsersFilters() {
  const [joined, setJoined] = useState<Joined | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()

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

        <FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Role</FieldLegend>
            <FieldGroup>
              {ROLES.map((role) => (
                <Field key={role.value} orientation="horizontal">
                  <Checkbox id={role.value} />
                  <FieldLabel htmlFor={role.value}>{role.label}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <ToggleGroup
              multiple
              variant="outline"
              className="flex flex-wrap justify-start"
            >
              {STATUS.map((status) => (
                <ToggleGroupItem key={status.value} value={status.value}>
                  {status.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Joined date</FieldLegend>
            <ToggleGroup
              variant="outline"
              value={joined ? [joined] : []}
              onValueChange={(value) => {
                const selected = value[0] as Joined | undefined
                setJoined(selected)
                if (selected !== "custom") setRange(undefined)
              }}
              className="flex flex-wrap justify-start"
            >
              {JOINED.map((joined) => (
                <ToggleGroupItem key={joined.value} value={joined.value}>
                  {joined.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>
        </FieldGroup>

        {joined === "custom" && (
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <CalendarIcon />
              {range?.from
                ? range.to
                  ? `${format(range.from, "MMM d")} - ${format(range.to, "MMM d, yyyy")}`
                  : format(range.from, "MMM d, yyyy")
                : "Pick a date range"}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar mode="range" selected={range} onSelect={setRange} />
            </PopoverContent>
          </Popover>
        )}

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
