import { cn } from "@/lib/utils"

interface ErrorCellProps {
  value: number
  threshold?: number
}

export function ErrorCell({ value, threshold = 0.1 }: ErrorCellProps) {
  const isHighError = value > threshold

  return (
    <span
      className={cn(
        "tabular-nums",
        isHighError
          ? "text-amber-600 dark:text-amber-400"
          : "text-muted-foreground"
      )}
    >
      {value.toFixed(3)}
    </span>
  )
}
