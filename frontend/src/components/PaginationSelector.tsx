import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  current: number;
  size: number;
  total: number;
  onPageChange: (page: number) => void;
};

const PaginationSelector = ({ current, size = 10, total, onPageChange }: Props) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(total / size); i++) {
    pageNumber.push(i);
  }

  return (
      <nav aria-label="Pagination Navigation">
        <Pagination>
          <PaginationContent>
            {current > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                      href="#"
                      onClick={() => onPageChange(current - 1)}
                      aria-label="Previous page"
                  />
                </PaginationItem>
            )}
            <PaginationItem>
              {pageNumber.map((currentPage) => (
                  <PaginationLink
                      href="#"
                      onClick={() => onPageChange(currentPage)}
                      isActive={currentPage === current}
                      key={currentPage}
                      aria-label={`Page ${currentPage}`}
                      {...(currentPage === current ? { "aria-current": "page" } : {})}
                  >
                    {currentPage}
                  </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis aria-hidden="true"/>
            </PaginationItem>
            {current < pageNumber.length && (
                <PaginationItem>
                  <PaginationNext
                      href="#"
                      onClick={() => onPageChange(current + 1)}
                      aria-label="Next page"
                  />
                </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </nav>
  );
};

export default PaginationSelector;
