import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

const chartData = [
  { week: "W1", bricks: 43 },
  { week: "W2", bricks: 60 },
  { week: "W3", bricks: 54 },
  { week: "W4", bricks: 77 },
  { week: "W5", bricks: 82 },
  { week: "W6", bricks: 69 },
  { week: "W7", bricks: 91 },
]

const chartConfig = {
  bricks: {
    label: "Bricks",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function BrickProductionChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between space-x-2">
          <p className="font-mono text-sm tracking-wide text-muted-foreground uppercase">
            Production Volume
          </p>
          <Badge className="bg-primary/10 text-primary">
            ≥ 3.45 MPa validated
          </Badge>
        </div>
        <CardTitle className="text-xl font-semibold">
          Weekly BLOCA Brick Production — bricks/week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full sm:h-80"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid strokeOpacity={0.4} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <linearGradient id="fillBricks" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-bricks)"
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor="var(--color-bricks)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <Area
              dataKey="bricks"
              type="monotone"
              fill="url(#fillBricks)"
              fillOpacity={0.4}
              stroke="var(--color-bricks)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--color-bricks)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
