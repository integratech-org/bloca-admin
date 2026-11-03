import { cn } from "@/lib/utils"

import type { DiagnosticStatus } from "../types"

const readingColors: Record<DiagnosticStatus, string> = {
  normal: "",
  warning: "text-orange-600 dark:text-orange-400",
  error: "text-red-600 dark:text-red-400",
}

interface ReadingCellProps {
  value: string
  status: DiagnosticStatus
}

export function ReadingCell({ value, status }: ReadingCellProps) {
  return (
    <span
      className={cn("font-mono text-sm font-medium", readingColors[status])}
    >
      {value}
    </span>
  )
}
