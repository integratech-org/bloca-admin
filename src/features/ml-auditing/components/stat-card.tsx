import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cva, type VariantProps } from "class-variance-authority"

const valueVariants = cva("font-mono text-4xl font-semibold tracking-tight", {
  variants: {
    tone: {
      default: "text-foreground",
      success: "text-green-700 dark:text-green-300",
      primary: "text-primary",
    },
  },
  defaultVariants: { tone: "default" },
})

type ValueProps = VariantProps<typeof valueVariants>

export interface StatCardProps extends ValueProps {
  label: string
  value: string | number
}

export function StatCard({ label, value, tone }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-normal tracking-wide text-muted-foreground uppercase">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={valueVariants({ tone })}>{value}</p>
      </CardContent>
    </Card>
  )
}
