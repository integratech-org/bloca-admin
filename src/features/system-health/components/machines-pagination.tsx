import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

interface Props {
  total: number
}

export function MachinesPagination({ total }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Showing {total} of {total} machines
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink size="icon" href="#" aria-label="First page">
              <ChevronsLeft />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="icon" href="#" aria-label="Previous page">
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="icon" href="#" aria-label="Next page">
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="icon" href="#" aria-label="Last page">
              <ChevronsRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
