import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebouncedCallback } from "use-debounce"

interface Props {
  title?: string
  total?: number
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  isLoading?: boolean
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function DataTableToolbar({
  title,
  total,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  isLoading,
  filters,
  actions,
}: Props) {
  const handleSearch = useDebouncedCallback((term: string) => {
    onSearchChange?.(term)
  }, 300)

  return (
    <div className="flex items-center justify-between">
      <div className="flex text-lg font-medium">
        <span className="mr-2">{title}</span>
        {isLoading ? (
          <Skeleton className="h-6 w-8" />
        ) : (
          <span className="text-muted-foreground">{total}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <InputGroup>
          <InputGroupInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        {filters}
        {actions}
      </div>
    </div>
  )
}
