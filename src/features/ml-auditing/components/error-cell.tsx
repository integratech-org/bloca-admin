import { cn } from "@/lib/utils"

interface Props {
  value: number
  threshold?: number
}

export function ErrorCell({ value, threshold = 0.1 }: Props) {
  const exceedsThreshold = value > threshold

  return (
    <span
      className={cn(
        "tabular-nums",
        exceedsThreshold
          ? "text-amber-600 dark:text-amber-400"
          : "text-muted-foreground"
      )}
    >
      {value.toFixed(3)}
    </span>
  )
}
