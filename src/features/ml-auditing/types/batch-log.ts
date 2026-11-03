export interface BatchPredictionLog {
  id: string
  date: string
  ldpeKg: number
  fillerKg: number
  tempCelsius: number
  psi: number
  predictedMpa: number
  actualMpa: number
  error: number
  confidence: number
  modelVersion: string
  result: "PASS" | "FAIL"
}
