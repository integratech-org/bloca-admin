import { StatCard, type StatCardProps } from "./stat-card"

const stats: StatCardProps[] = [
  {
    label: "Waste Diverted",
    value: "3,320",
    unit: "kg",
    description: "LDPE packaging from waste stream",
    trend: "+14.2% vs last period ",
  },
  {
    label: "Bloca Bricks Produced",
    value: 481,
    description: "Non-load bearing masonry units",
    trend: "+8.7% vs last period ",
  },
  {
    label: "Active Deployments",
    value: 17,
    description: "Community project locations",
    trend: "+3 vs last period ",
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
