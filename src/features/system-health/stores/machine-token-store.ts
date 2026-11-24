import type { MachineCreateResult } from "@/types/api"
import { create } from "zustand"

export type MachineTokenMode = "created" | "rotated" | "issued"

type MachineTokenStore = {
  open: boolean
  mode: MachineTokenMode
  machine: MachineCreateResult | null
  show: (machine: MachineCreateResult, mode: MachineTokenMode) => void
  close: () => void
  reset: () => void
}

export const useMachineTokenStore = create<MachineTokenStore>()((set) => ({
  open: false,
  mode: "created",
  machine: null,
  show: (machine, mode) => set({ open: true, machine, mode }),
  close: () => set({ open: false }),
  reset: () => set({ open: false, machine: null, mode: "created" }),
}))
