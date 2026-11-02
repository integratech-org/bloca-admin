import { cn } from "@/lib/utils"

interface Props {
  value: number
  threshold?: number
}

export function ErrorCell({ value, threshold = 0.1 }: Props) {
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
