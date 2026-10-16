import { DefectGrid } from "./defect-grid"
import { DefectStatusFilter } from "./defect-status-filter"

export function DefectReviewPanel() {
  return (
    <div className="flex flex-col gap-4 lg:pb-8">
      <DefectStatusFilter />
      <DefectGrid />
    </div>
  )
}
