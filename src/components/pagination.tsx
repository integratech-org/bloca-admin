import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

interface Props {
  totalPages: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function DataTablePagination({
  totalPages,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const go = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    onPageChange(page)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange?.(Number(value))}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {/* pagination */}
      {totalPages > 1 && (
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            {/* first page */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  size="icon"
                  aria-label="First page"
                  onClick={go(1)}
                >
                  <ChevronsLeft />
                </PaginationLink>
              </PaginationItem>
            )}

            {/* previous page */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  size="icon"
                  aria-label="Previous page"
                  onClick={go(currentPage - 1)}
                >
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={go(currentPage - 1)}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={go(currentPage)} isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {totalPages > currentPage && (
              <PaginationItem>
                <PaginationLink onClick={go(currentPage + 1)}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {totalPages > currentPage + 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {/* next page */}
            {totalPages > currentPage && (
              <PaginationItem>
                <PaginationLink
                  size="icon"
                  aria-label="Next page"
                  onClick={go(currentPage + 1)}
                >
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>
            )}

            {/* last page */}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  size="icon"
                  onClick={go(totalPages)}
                  aria-label="Last page"
                >
                  <ChevronsRight />
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
