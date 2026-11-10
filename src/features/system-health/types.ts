export type DiagnosticStatus = "normal" | "warning" | "error"

export type DeviceId = "ESP32-A" | "ESP32-B" | "RPI-01"

export interface DiagnosticLog {
  id: string
  timestamp: string
  device: DeviceId
  sensor: string
  reading: string
  normalRange: string | null
  power: string | null
  status: DiagnosticStatus
  notes: string | null
  [key: string]: unknown
}
