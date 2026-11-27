import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, ListFilter } from "lucide-react"
import { DELETED, ROLES, STATUS } from "../constants"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import {
  endOfDay,
  format,
  startOfDay,
  subDays,
  subMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns"
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import type { Deleted } from "@/types/api"

type FilterValues = {
  deleted?: Deleted
  show?: "active" | "inactive" | "all"
  role?: "system_admin" | "admin" | "operator" | "all"
  date_joined_after?: string
  date_joined_before?: string
}

interface Props {
  values: FilterValues
  onApply: (filters: FilterValues) => void
}

export function UsersFilters({ values, onApply }: Props) {
  const today = new Date()
  const last7Days = {
    from: subDays(today, 6),
    to: today,
  }
  const last30Days = {
    from: subDays(today, 29),
    to: today,
  }
  const lastMonth = {
    from: startOfMonth(subMonths(today, 1)),
    to: endOfMonth(subMonths(today, 1)),
  }

  const [month, setMonth] = useState(today)
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState<Deleted>(values?.deleted ?? "exclude")
  const [show, setShow] = useState<"active" | "inactive" | "all">(
    values?.show ?? "active"
  )
  const [role, setRole] = useState<
    "system_admin" | "admin" | "operator" | "all"
  >(values?.role ?? "all")
  const [date, setDate] = useState<DateRange | undefined>(
    values?.date_joined_after
      ? {
          from: new Date(values.date_joined_after),
          to: values.date_joined_before
            ? new Date(values.date_joined_before)
            : undefined,
        }
      : undefined
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        <ListFilter />
        Filters
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex items-center justify-between gap-4">
          <PopoverHeader>
            <PopoverTitle>
              <span className="text-base">Filters</span>
            </PopoverTitle>
          </PopoverHeader>

          <Button
            variant="outline"
            onClick={() => {
              setDeleted("exclude")
              setShow("active")
              setRole("all")
              setDate(undefined)
              onApply({
                deleted: "exclude",
                show: "active",
                role: "all",
                date_joined_after: undefined,
                date_joined_before: undefined,
              })
              setOpen(false)
            }}
          >
            Reset filters
          </Button>
        </div>

        <Separator />

        <FieldGroup>
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <ToggleGroup
              variant="outline"
              value={[deleted]}
              onValueChange={(v) => {
                if (v[0]) setDeleted(v[0] as Deleted)
              }}
              className="flex flex-wrap justify-start"
            >
              {DELETED.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Show</FieldLegend>
            <ToggleGroup
              variant="outline"
              value={[show]}
              onValueChange={(v) => {
                if (v[0]) setShow(v[0] as typeof show)
              }}
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
            <FieldLegend variant="label">Role</FieldLegend>
            <ToggleGroup
              variant="outline"
              value={[role]}
              onValueChange={(v) => {
                if (v[0]) setRole(v[0] as typeof role)
              }}
              className="flex flex-wrap justify-start"
            >
              {ROLES.map((r) => (
                <ToggleGroupItem key={r.value} value={r.value}>
                  {r.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Joined date</FieldLegend>
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                <CalendarIcon />
                {date?.from
                  ? date.to
                    ? `${format(date.from, "MMM d")} - ${format(date.to, "MMM d, yyyy")}`
                    : format(date.from, "MMM d, yyyy")
                  : "Pick a date range"}
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Card className="p-0">
                  <CardContent className="p-0">
                    <div className="flex max-sm:flex-col">
                      <div className="relative py-4 max-sm:order-1 max-sm:border-t sm:w-32">
                        <div className="h-full sm:border-e">
                          <div className="flex flex-col px-2">
                            <Button
                              className="w-full justify-start"
                              onClick={() => {
                                setDate({
                                  from: today,
                                  to: today,
                                })
                                setMonth(today)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Today
                            </Button>
                            <Button
                              className="w-full justify-start"
                              onClick={() => {
                                setDate(last7Days)
                                setMonth(last7Days.to)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Last 7 days
                            </Button>
                            <Button
                              className="w-full justify-start"
                              onClick={() => {
                                setDate(last30Days)
                                setMonth(last30Days.to)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Last 30 days
                            </Button>
                            <Button
                              className="w-full justify-start"
                              onClick={() => {
                                setDate(lastMonth)
                                setMonth(lastMonth.to)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Last month
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Calendar
                        disabled={[{ after: today }]}
                        mode="range"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(newDate) => {
                          if (newDate) {
                            setDate(newDate)
                          }
                        }}
                        selected={date}
                      />
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </FieldSet>
        </FieldGroup>

        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            onClick={() => {
              onApply({
                deleted,
                show,
                role,
                date_joined_after: date?.from
                  ? startOfDay(date.from).toISOString()
                  : undefined,
                date_joined_before: date?.from
                  ? endOfDay(date.to ?? date.from).toISOString()
                  : undefined,
              })
              setOpen(false)
            }}
          >
            Apply filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
