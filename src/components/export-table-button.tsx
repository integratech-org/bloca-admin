import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { exportToCSV, generateExportFilename } from "@/lib/export-utils"

interface ExportTableButtonProps<T extends Record<string, unknown>> {
  data: T[]
  filename: string
  columnHeaders: { key: string; label: string }[]
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ExportTableButton<T extends Record<string, unknown>>({
  data,
  filename,
  columnHeaders,
  variant = "outline",
  size = "default",
}: ExportTableButtonProps<T>) {
  const handleExport = () => {
    const fullFilename = generateExportFilename(filename)
    exportToCSV(data, fullFilename, columnHeaders)
  }

  return (
    <Button variant={variant} size={size} onClick={handleExport}>
      <Download />
      Export
    </Button>
  )
}
