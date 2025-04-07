import { titles } from '@/constants';
import { menus } from '@/constants/wbMenu';

export const serialNo = (page: number, limit: number = 10): number => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * limit + 1;
  return srno;
};

export const getPageTitle = (url: string): string => {
  let menuTitle = '';

  menus.forEach((menu) => {
    if (menu.link === url) {
      menuTitle = menu.name;
    } else if (menu.subMenus) {
      menu.subMenus.forEach((subMenu) => {
        if (subMenu.link === url) {
          menuTitle = subMenu.name;
        }
      });
    }
  });

  return menuTitle;
};

// Pagination starts ------
export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: {
  pageNumber: number;
  search: string;
  pathname: string;
}): string => {
  const searchParams = new URLSearchParams(search);
  searchParams.set('page', pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};

export const constructPrevOrNext = ({
  curretPage,
  pageCount,
  search,
  pathname,
}: {
  curretPage: number;
  pageCount: number;
  search: string;
  pathname: string;
}) => {
  let prevPage = curretPage - 1;
  if (prevPage < 1) prevPage = 1;
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathname });

  let nextPage = curretPage + 1;
  if (nextPage > pageCount) nextPage = pageCount;
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathname });

  return { prevUrl, nextUrl };
};
// Pagination ends ------

export const currencyFormat = () => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0, // Ensures two decimal places
  });
  return formatter;
};

export const handleDownload = ({
  filePath,
  fileName,
}: {
  filePath: string;
  fileName: string;
}) => {
  if (filePath) {
    const fileUrl = titles.baseUrl + filePath;
    const url = window.URL.createObjectURL(new Blob([fileUrl]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } else {
    console.error('File path is missing!');
  }
};
