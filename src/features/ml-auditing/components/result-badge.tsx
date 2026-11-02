import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ResultBadgeProps {
  result: "PASS" | "FAIL"
}

export function ResultBadge({ result }: ResultBadgeProps) {
  return (
    <Badge
      className={cn(
        "font-medium",
        result === "PASS"
          ? "bg-green-500/10 text-green-700 dark:text-green-400"
          : "bg-red-500/10 text-red-700 dark:text-red-400"
      )}
    >
      {result}
    </Badge>
  )
}
