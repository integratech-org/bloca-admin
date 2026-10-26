export type DeploymentStatus = "completed" | "in-progress" | "planned"

export interface DeploymentSite {
  id: string
  siteNumber: string
  title: string
  location: string
  coordinates: [number, number] // [latitude, longitude]
  status: DeploymentStatus
  badges: string[]
  date?: string
  blocksUsed?: number
  contact?: string
  description?: string
}
