interface ConfidenceCellProps {
  value: number
}

export function ConfidenceCell({ value }: ConfidenceCellProps) {
  const percentage = (value * 100).toFixed(1)

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <span className="text-xs tabular-nums">{percentage}%</span>
    </div>
  )
}
