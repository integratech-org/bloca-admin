import type { Machine } from "@/types/api"
import { create } from "zustand"

type UpdateMachineStore = {
  open: boolean
  machine: Machine | null
  show: (machine: Machine) => void
  close: () => void
  reset: () => void
}

export const useUpdateMachineStore = create<UpdateMachineStore>()((set) => ({
  open: false,
  machine: null,
  show: (machine) => set({ open: true, machine }),
  close: () => set({ open: false }),
  reset: () => set({ open: false, machine: null }),
}))
