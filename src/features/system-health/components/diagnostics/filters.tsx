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
import { Separator } from "@/components/ui/separator"
import { ListFilter } from "lucide-react"

const STATUS_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
]

const DEVICE_OPTIONS = [
  { value: "ESP32-001", label: "ESP32-001" },
  { value: "ESP32-002", label: "ESP32-002" },
  { value: "RPi-Edge-01", label: "RPi-Edge-01" },
]

export function DiagnosticsFilters() {
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
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldGroup>
              {STATUS_OPTIONS.map((status) => (
                <Field key={status.value} orientation="horizontal">
                  <Checkbox id={status.value} />
                  <FieldLabel htmlFor={status.value}>{status.label}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Device</FieldLegend>
            <FieldGroup>
              {DEVICE_OPTIONS.map((device) => (
                <Field key={device.value} orientation="horizontal">
                  <Checkbox id={device.value} />
                  <FieldLabel htmlFor={device.value}>{device.label}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </FieldGroup>

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
