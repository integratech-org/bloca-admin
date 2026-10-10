import { DefectCard } from "./defect-card"

// eslint-disable-next-line react-refresh/only-export-components
export const mockData = Array.from({ length: 25 }, (_, i) => ({
  confidence: Math.floor(Math.random() * 101),
  batchId: `B-${i + 1}`,
  imageUrl: `https://placehold.co/800x450/000000/FFF?text=B-${i + 1}`,
}))

export function DefectGrid() {
  const defects = mockData

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {defects.map((defect) => (
        <DefectCard
          key={defect.batchId}
          batchId={defect.batchId}
          confidence={defect.confidence}
          imageUrl={defect.imageUrl}
        />
      ))}
    </div>
  )
}
