import { Badge } from "@/components/ui/badge"

import type { BatchStatus } from "../types"

const statusColors = {
  PASS: "bg-green-500/10 text-green-700 dark:text-green-400",
  FAIL: "bg-red-500/10 text-red-700 dark:text-red-400",
} as const

interface Props {
  result: BatchStatus
}

export function ResultBadge({ result }: Props) {
  return <Badge className={statusColors[result]}>{result}</Badge>
}
