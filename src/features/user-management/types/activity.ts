export type CVInspectionStatus = "Pending" | "Successful" | "Unsuccessful"

export type ActivityStatus = "In Progress" | "Completed" | "Emergency Stop"

export interface BatchActivity {
  id: string
  userId: string
  time: string
  batchId: string
  ldpe: number
  sand: number
  predictiveStrength: number | null // null = N/A or Pending
  isPending: boolean // true = show "Pending" instead of value
  cvInspection: CVInspectionStatus
  status: ActivityStatus
}
