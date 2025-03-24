import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationProps } from '@/types/contents';
import { constructPrevOrNext, constructUrl } from '@/utils/function';
import { useLocation } from 'react-router-dom';

const WbcPaginationContainer = ({
  totalPages,
  currentPage,
  addClass,
}: PaginationProps) => {
  const { search, pathname } = useLocation();
  Array.from({ length: totalPages }, (_, index) => index + 1);
  if (totalPages < 2) return null;

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
  }) => {
    const url = constructUrl({ pageNumber, search, pathname });
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (key: any) => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const renderPageButtons = () => {
    let pages = [];
    // First page : page=1
    pages.push(constructButton({ pageNumber: 1, isActive: currentPage === 1 }));

    // Ellipsis
    if (currentPage > 2) {
      pages.push(constructEllipsis('dots-1'));
    }

    // Active page : page=currentPage
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(constructButton({ pageNumber: currentPage, isActive: true }));
    }

    // Ellipsis
    if (currentPage < totalPages - 1) {
      pages.push(constructEllipsis('dots-2'));
    }

    // Last page : page=totalPages
    pages.push(
      constructButton({
        pageNumber: totalPages,
        isActive: currentPage === totalPages,
      })
    );
    return pages;
  };

  const { prevUrl, nextUrl } = constructPrevOrNext({
    curretPage: currentPage,
    pageCount: totalPages,
    pathname,
    search,
  });

  return (
    <div className={`${addClass || 'w-full'} mt-8`}>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious to={prevUrl} />
            </PaginationItem>
          )}

          {renderPageButtons()}

          {totalPages > currentPage && (
            <PaginationItem>
              <PaginationNext to={nextUrl} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default WbcPaginationContainer;
