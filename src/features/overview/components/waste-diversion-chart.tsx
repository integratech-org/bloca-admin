import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", kg: 186 },
  { month: "February", kg: 305 },
  { month: "March", kg: 237 },
  { month: "April", kg: 73 },
  { month: "May", kg: 209 },
  { month: "June", kg: 214 },
]

const chartConfig = {
  kg: {
    label: "Diverted kg",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function WasteDiversionChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="font-mono text-sm tracking-wide text-muted-foreground uppercase">
          Monthly Output
        </p>
        <CardTitle className="text-xl font-semibold">
          LDPE Waste Diversion — kg/month
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              ticks={[0, 200, 400, 600, 800]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="fillKg" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-kg)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-kg)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="kg"
              type="monotone"
              fill="url(#fillKg)"
              fillOpacity={0.4}
              stroke="var(--color-kg)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--color-kg)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
