import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComp = ({
  pagesCount,
  currentPage,
  setCurrentPage,
}: {
  pagesCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const { floor, min, max } = Math;
  const range = (lo: number, hi: number) =>
    Array.from({ length: hi - lo }, (_, i) => i + lo);

  const pagination =
    (count: number, ellipsis = true) =>
    (page: number, total: number) => {
      const start = max(
        1,
        min(page - floor((count - 3) / 2), total - count + 2)
      );
      const end = min(total, max(page + floor((count - 2) / 2), count - 1));
      return [
        ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
        ...range(start, end + 1),
        ...(end < total - 1 ? [ellipsis, total] : end < total ? [total] : []),
      ];
    };

  return (
    <div className="w-full flex overflow-hidden">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setCurrentPage(Math.max(+currentPage - 1, 1));
                document?.getElementById("topModal")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              aria-disabled={+currentPage <= 1}
              tabIndex={+currentPage <= 1 ? -1 : undefined}
              className={`!p-2 ${
                +currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
              }`}
            />
          </PaginationItem>
          {pagination(4)(+currentPage, pagesCount)?.map((e, i) =>
            e === true ? (
              <PaginationItem key={`keyforpaginationellip${i}`}>
                <PaginationEllipsis className="w-8 sm:w-10 h-8 sm:h-10" />
              </PaginationItem>
            ) : (
              <PaginationItem className="" key={`keyforpagination${i}`}>
                <PaginationLink
                  className={`w-8 sm:w-10 h-8 sm:h-10 ${
                    +currentPage === e ? "bg-[#e9ecef] hover:bg-[#e9ecef]" : ""
                  }`}
                  onClick={() => {
                    setCurrentPage(e as number);
                    document?.getElementById("topModal")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {e}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setCurrentPage(+currentPage + 1);
                document?.getElementById("topModal")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              aria-disabled={+currentPage >= +pagesCount}
              tabIndex={+currentPage >= +pagesCount ? -1 : undefined}
              className={`!p-2 ${
                +currentPage >= +pagesCount
                  ? "pointer-events-none opacity-50"
                  : undefined
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComp;
