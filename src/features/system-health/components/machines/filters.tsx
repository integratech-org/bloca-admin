import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, ListFilter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SHOW, TOKEN_STATUS } from "../../constants"
import { Calendar } from "@/components/ui/calendar"
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Card, CardContent } from "@/components/ui/card"
import type { MachineFilter, Show, TokenStatus } from "@/types/api"

interface Props {
  values: MachineFilter
  onApply: (values: MachineFilter) => void
}

export function MachinesFilters({ values, onApply }: Props) {
  const today = new Date()
  const yesterday = {
    from: subDays(today, 1),
    to: subDays(today, 1),
  }
  const last7Days = {
    from: subDays(today, 6),
    to: today,
  }
  const last30Days = {
    from: subDays(today, 29),
    to: today,
  }
  const monthToDate = {
    from: startOfMonth(today),
    to: today,
  }
  const lastMonth = {
    from: startOfMonth(subMonths(today, 1)),
    to: endOfMonth(subMonths(today, 1)),
  }
  const yearToDate = {
    from: startOfYear(today),
    to: today,
  }
  const lastYear = {
    from: startOfYear(subYears(today, 1)),
    to: endOfYear(subYears(today, 1)),
  }
  const [month, setMonth] = useState(today)

  const [open, setOpen] = useState(false)
  const [show, setShow] = useState<Show>(values?.show ?? "active")
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>(
    values?.token_status ?? "active"
  )
  const [date, setDate] = useState<DateRange | undefined>(
    values?.created_after
      ? {
          from: new Date(values?.created_after),
          to: values?.created_before
            ? new Date(values?.created_before)
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
              setShow("active")
              setTokenStatus("active")
              setDate(undefined)
              onApply({
                show: "active",
                token_status: "active",
                created_after: undefined,
                created_before: undefined,
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
              value={[show]}
              onValueChange={(v) => {
                if (v[0]) setShow(v[0] as Show)
              }}
              className="flex flex-wrap justify-start"
            >
              {SHOW.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Token status</FieldLegend>
            <ToggleGroup
              variant="outline"
              value={[tokenStatus]}
              onValueChange={(v) => {
                if (v[0]) setTokenStatus(v[0] as TokenStatus)
              }}
              className="flex flex-wrap justify-start"
            >
              {TOKEN_STATUS.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Created</FieldLegend>
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
                                setDate(yesterday)
                                setMonth(yesterday.to)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Yesterday
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
                                setDate(monthToDate)
                                setMonth(monthToDate.to)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Month to date
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
                            <Button
                              className="w-full justify-start"
                              onClick={() => {
                                setDate(yearToDate)
                                setMonth(yearToDate.to)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Year to date
                            </Button>
                            <Button
                              className="w-full justify-start"
                              onClick={() => {
                                setDate(lastYear)
                                setMonth(lastYear.to)
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              Last year
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
                show,
                token_status: tokenStatus,
                created_after: date?.from
                  ? startOfDay(date.from).toISOString()
                  : undefined,
                created_before: date?.from
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
