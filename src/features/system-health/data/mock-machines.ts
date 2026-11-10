import type { Machine } from "../types"

const mockMachinesData: Machine[] = [
  {
    machineId: "BLC-001",
    name: "BLOCA machine01",
    site: "Barangay 176-D",
    tokenStatus: "Active",
    lastSynced: new Date(Date.now() - 7 * 60 * 1000).toISOString(), // 7 mins ago
    hardwareVersion: "Physical Unit v2.1",
  },
  {
    machineId: "BLC-002",
    name: "BLOCA machine02",
    site: "Barangay 177-A",
    tokenStatus: "Active",
    lastSynced: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    hardwareVersion: "Physical Unit v2.0",
  },
  {
    machineId: "BLC-003",
    name: "BLOCA machine03",
    site: "Barangay 178-C",
    tokenStatus: "Revoked",
    lastSynced: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    hardwareVersion: "Physical Unit v2.1",
  },
  {
    machineId: "BLC-004",
    name: "BLOCA machine04",
    site: "Barangay 179-B",
    tokenStatus: "Not Issued",
    lastSynced: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    hardwareVersion: "Physical Unit v1.9",
  },
  {
    machineId: "BLC-005",
    name: "BLOCA machine05",
    site: "Barangay 180-E",
    tokenStatus: "Active",
    lastSynced: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    hardwareVersion: "Physical Unit v2.1",
  },
]

// Async functions for API-like interface
export async function getAllMachines(): Promise<Machine[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockMachinesData
}

export async function getMachineById(
  machineId: string
): Promise<Machine | undefined> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockMachinesData.find((machine) => machine.machineId === machineId)
}
