import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"

const toggleGroupItemClassName =
  "data-pressed:bg-primary data-pressed:text-primary-foreground"

export function DefectReviewPanel() {
  const [status, setStatus] = useState("all")

  return (
    <div>
      <ToggleGroup
        value={[status]}
        onValueChange={([next]) => {
          if (next) setStatus(next)
        }}
      >
        <ToggleGroupItem value="all" className={toggleGroupItemClassName}>
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="confirmed" className={toggleGroupItemClassName}>
          Confirmed
        </ToggleGroupItem>
        <ToggleGroupItem value="pending" className={toggleGroupItemClassName}>
          Pending
        </ToggleGroupItem>
        <ToggleGroupItem value="rejected" className={toggleGroupItemClassName}>
          Rejected
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
