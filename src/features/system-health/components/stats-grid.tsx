import { StatCard, type StatCardProps } from "./stat-card"

const stats: StatCardProps[] = [
  {
    label: "HEPA Filter",
    value: 34,
    installedAt: new Date("2023-01-15"),
    nextServiceAt: new Date("2024-01-15"),
  },
  {
    label: "Activated Carbon Filter",
    value: 61,
    installedAt: new Date("2023-01-15"),
    nextServiceAt: new Date("2024-01-15"),
  },
  {
    label: "Pre-filter Mesh",
    value: 78,
    installedAt: new Date("2023-01-15"),
    nextServiceAt: new Date("2024-01-15"),
  },
]

interface Props {
  items?: StatCardProps[]
}

export function StatsGrid({ items = stats }: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  )
}
