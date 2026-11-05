import { Badge } from "@/components/ui/badge"

import type { BatchStatus } from "../types"

const statusColors = {
  PASS: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  FAIL: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
} as const

interface Props {
  result: BatchStatus
}

export function ResultBadge({ result }: Props) {
  return <Badge className={statusColors[result]}>{result}</Badge>
}
