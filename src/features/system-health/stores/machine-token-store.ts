import type { MachineCreateResult } from "@/types/api"
import { create } from "zustand"

type MachineTokenStore = {
  open: boolean
  machine: MachineCreateResult | null
  show: (machine: MachineCreateResult) => void
  close: () => void
  reset: () => void
}

export const useMachineTokenStore = create<MachineTokenStore>()((set) => ({
  open: false,
  machine: null,
  show: (machine) => set({ open: true, machine }),
  close: () => set({ open: false }),
  reset: () => set({ open: false, machine: null }),
}))
