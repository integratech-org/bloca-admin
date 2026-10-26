import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const toggleItemClassName =
  "data-pressed:bg-primary data-pressed:text-primary-foreground"

interface DiagnosticsStatusFilterProps {
  value: string
  onChange: (value: string) => void
}

export function DiagnosticsStatusFilter({
  value,
  onChange,
}: DiagnosticsStatusFilterProps) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={([next]) => {
        if (next) onChange(next)
      }}
      className="flex"
    >
      <ToggleGroupItem value="all" className={toggleItemClassName}>
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="normal" className={toggleItemClassName}>
        Normal
      </ToggleGroupItem>
      <ToggleGroupItem value="warning" className={toggleItemClassName}>
        Warning
      </ToggleGroupItem>
      <ToggleGroupItem value="error" className={toggleItemClassName}>
        Error
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
