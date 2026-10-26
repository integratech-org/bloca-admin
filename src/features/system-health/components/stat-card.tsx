import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const cardVariants = cva("", {
  variants: {
    status: {
      ok: "",
      critical: "border border-red-300 dark:border-red-900",
    },
  },
})

const textVariants = cva("", {
  variants: {
    status: {
      ok: "text-green-700 dark:text-green-300",
      critical: "text-red-700 dark:text-red-300",
    },
  },
})

const barVariants = cva("h-full rounded-full transition-all", {
  variants: {
    status: {
      ok: "bg-green-700 dark:bg-green-300",
      critical: "bg-red-700 dark:bg-red-300",
    },
  },
})

const STATUS_MESSAGES = {
  ok: { note: "Operating within nominal range", badge: null },
  critical: {
    note: "Capacity below safe threshold",
    badge: "Replacement Required",
  },
}

export interface StatCardProps {
  label: string
  value: number
  installedAt: Date
  nextServiceAt: Date
}

export function StatCard({
  label,
  value,
  installedAt,
  nextServiceAt,
}: StatCardProps) {
  const status = value < 20 ? "critical" : "ok"
  const { note, badge } = STATUS_MESSAGES[status]

  return (
    <Card className={cn(cardVariants({ status }))}>
      <CardHeader>
        {badge && (
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            {badge}
          </Badge>
        )}

        <CardTitle className="text-base font-semibold">{label}</CardTitle>
        <CardAction
          className={cn(
            textVariants({ status }),
            "font-mono text-4xl font-semibold tracking-tight"
          )}
        >
          {value}%
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-muted-foreground">Remaining capacity</p>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={barVariants({ status })}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>

        <dl className="flex flex-col gap-1.5 font-mono text-sm">
          <div className="flex justify-between">
            <dt className="font-sans text-muted-foreground">Installed</dt>
            <dd>{format(installedAt, "yyyy-MM-dd")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-sans text-muted-foreground">Next service</dt>
            <dd>{format(nextServiceAt, "yyyy-MM-dd")}</dd>
          </div>
        </dl>

        <p className={cn("mt-auto text-sm", textVariants({ status }))}>
          {note}
        </p>
      </CardContent>
    </Card>
  )
}
