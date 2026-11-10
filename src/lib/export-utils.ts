/**
 * Converts table data to CSV format and triggers download
 */
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columnHeaders: { key: string; label: string }[]
) {
  if (data.length === 0) {
    console.warn("No data to export")
    return
  }

  // Create CSV header row
  const headers = columnHeaders.map((col) => col.label).join(",")

  // Create CSV data rows
  const rows = data.map((row) => {
    return columnHeaders
      .map((col) => {
        const value = row[col.key]
        // Handle different value types
        if (value === null || value === undefined) return ""
        if (typeof value === "string") {
          // Escape quotes and wrap in quotes if contains comma
          const escaped = value.replace(/"/g, '""')
          return escaped.includes(",") ? `"${escaped}"` : escaped
        }
        return String(value)
      })
      .join(",")
  })

  // Combine headers and rows
  const csv = [headers, ...rows].join("\n")

  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Generates a filename with current date
 */
export function generateExportFilename(prefix: string): string {
  const date = new Date().toISOString().split("T")[0] // YYYY-MM-DD
  return `${prefix}-${date}.csv`
}
