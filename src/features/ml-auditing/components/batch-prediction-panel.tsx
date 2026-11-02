import { Badge } from "@/components/ui/badge"
import { Card, CardFooter } from "@/components/ui/card"

import { mockBatchPredictionLogs } from "../data/mock-batch-logs"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export function BatchPredictionPanel() {
  return (
    <Card className="gap-0 overflow-hidden py-0 lg:min-h-0 lg:flex-1">
      <div className="flex flex-col lg:min-h-0 lg:flex-1">
        <DataTable columns={columns} data={mockBatchPredictionLogs} />
      </div>
      <CardFooter className="shrink-0">
        <Badge className="bg-primary/10 text-primary">
          Threshold: ≥ 3.45 MPa
        </Badge>
      </CardFooter>
    </Card>
  )
}
