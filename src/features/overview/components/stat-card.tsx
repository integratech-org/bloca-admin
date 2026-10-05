import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  description: string
  trend: string
}

export function StatCard({
  label,
  value,
  unit,
  description,
  trend,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-normal tracking-wide text-muted-foreground uppercase">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="font-mono text-4xl font-semibold tracking-tight">
          {value}
          {unit && <span className="ml-1.5">{unit}</span>}
        </p>

        <CardDescription>{description}</CardDescription>

        <Badge className="mt-3 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          {trend}
        </Badge>
      </CardContent>
    </Card>
  )
}
