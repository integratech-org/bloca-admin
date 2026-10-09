import { Card, CardFooter } from "@/components/ui/card"
import { columns, type Payment } from "./columns"
import { DataTable } from "./data-table"
import { Badge } from "@/components/ui/badge"

export const payments: Payment[] = [
  {
    id: "PAY-001",
    amount: 2500,
    status: "success",
    email: "john.doe@example.com",
  },
  {
    id: "PAY-002",
    amount: 1250,
    status: "pending",
    email: "jane.smith@example.com",
  },
  {
    id: "PAY-003",
    amount: 4800,
    status: "processing",
    email: "michael.johnson@example.com",
  },
  {
    id: "PAY-004",
    amount: 750,
    status: "failed",
    email: "emily.davis@example.com",
  },
  {
    id: "PAY-005",
    amount: 3200,
    status: "success",
    email: "daniel.wilson@example.com",
  },
  {
    id: "PAY-006",
    amount: 1800,
    status: "success",
    email: "sarah.miller@example.com",
  },
  {
    id: "PAY-007",
    amount: 5600,
    status: "processing",
    email: "robert.moore@example.com",
  },
  {
    id: "PAY-008",
    amount: 950,
    status: "pending",
    email: "olivia.taylor@example.com",
  },
  {
    id: "PAY-009",
    amount: 2750,
    status: "failed",
    email: "william.anderson@example.com",
  },
  {
    id: "PAY-010",
    amount: 4100,
    status: "success",
    email: "sophia.thomas@example.com",
  },
  {
    id: "PAY-011",
    amount: 1500,
    status: "pending",
    email: "james.jackson@example.com",
  },
  {
    id: "PAY-012",
    amount: 6250,
    status: "success",
    email: "ava.white@example.com",
  },
  {
    id: "PAY-013",
    amount: 2200,
    status: "processing",
    email: "benjamin.harris@example.com",
  },
  {
    id: "PAY-014",
    amount: 890,
    status: "failed",
    email: "mia.martin@example.com",
  },
  {
    id: "PAY-015",
    amount: 3500,
    status: "success",
    email: "lucas.thompson@example.com",
  },
  {
    id: "PAY-016",
    amount: 1750,
    status: "pending",
    email: "isabella.garcia@example.com",
  },
  {
    id: "PAY-017",
    amount: 5200,
    status: "success",
    email: "henry.martinez@example.com",
  },
  {
    id: "PAY-018",
    amount: 1300,
    status: "processing",
    email: "charlotte.robinson@example.com",
  },
  {
    id: "PAY-019",
    amount: 2900,
    status: "failed",
    email: "alexander.clark@example.com",
  },
  {
    id: "PAY-020",
    amount: 4500,
    status: "success",
    email: "amelia.rodriguez@example.com",
  },
  {
    id: "PAY-021",
    amount: 1100,
    status: "pending",
    email: "ethan.lewis@example.com",
  },
  {
    id: "PAY-022",
    amount: 3800,
    status: "success",
    email: "harper.lee@example.com",
  },
  {
    id: "PAY-023",
    amount: 2400,
    status: "processing",
    email: "matthew.walker@example.com",
  },
  {
    id: "PAY-024",
    amount: 670,
    status: "failed",
    email: "evelyn.hall@example.com",
  },
  {
    id: "PAY-025",
    amount: 5900,
    status: "success",
    email: "sebastian.allen@example.com",
  },
]

export function BatchPredictionPanel() {
  return (
    <Card className="gap-0 overflow-hidden py-0 lg:min-h-[24rem] lg:flex-1">
      <div className="flex flex-col lg:min-h-0 lg:flex-1">
        <DataTable columns={columns} data={payments} />
      </div>
      <CardFooter className="shrink-0">
        <Badge className="bg-primary/10 text-primary">
          Threshold: ≥ 3.45 MPa
        </Badge>
      </CardFooter>
    </Card>
  )
}
