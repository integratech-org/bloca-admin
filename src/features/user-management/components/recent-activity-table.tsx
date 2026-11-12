import { Card } from "@/components/ui/card"
import type { BatchActivity } from "../types/activity"
import { activityColumns } from "./activity-columns"
import { ActivityDataTable } from "./activity-data-table"

interface RecentActivityTableProps {
  activities: BatchActivity[]
}

export function RecentActivityTable({ activities }: RecentActivityTableProps) {
  // Sort by time descending (most recent first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  )

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-heading text-base leading-snug font-medium">
          Recent Activity
        </h3>
      </div>
      <div className="flex flex-col">
        <ActivityDataTable columns={activityColumns} data={sortedActivities} />
      </div>
    </Card>
  )
}
