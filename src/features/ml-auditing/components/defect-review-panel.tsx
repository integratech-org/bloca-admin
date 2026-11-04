import { DefectGrid } from "./defect-grid"
import { DefectReviewToolbar } from "./defect-review-toolbar"
import { DefectReviewPagination } from "./defect-review-pagination"
import { mockData } from "./defect-grid"

export function DefectReviewPanel() {
  return (
    <div className="flex flex-col gap-4 lg:pb-8">
      <DefectReviewToolbar total={mockData.length} />
      <DefectGrid />
      <DefectReviewPagination />
    </div>
  )
}
