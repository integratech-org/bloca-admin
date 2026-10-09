import { StatCard, type StatCardProps } from "./stat-card"

const stats: StatCardProps[] = [
  {
    label: "Batches Audited",
    value: 8,
  },
  {
    label: "Pass Rate",
    value: "100%",
    tone: "success",
  },
  {
    label: "Active Model",
    value: "v2.3.1",
  },
  {
    label: "Threshold",
    value: "≥ 3.45 MPa",
    tone: "primary",
  },
]

interface Props {
  items?: StatCardProps[]
}

export function StatsGrid({ items = stats }: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  )
}
