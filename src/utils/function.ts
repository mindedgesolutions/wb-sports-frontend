import { titles } from '@/constants';
import serviceWebsiteMenus from '@/constants/wbMenu';

export const serialNo = (page: number, limit: number = 10): number => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * limit + 1;
  return srno;
};

export function generateCaptcha(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getPageTitle = (url: string): string => {
  const menus = serviceWebsiteMenus();
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

export function smoothScrollTo(x: number, y: number, duration: number) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const startTime = performance.now();

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  function scroll() {
    const currentTime = performance.now();
    const time = Math.min(1, (currentTime - startTime) / duration);
    const easedTime = easeInOutQuad(time);

    window.scrollTo(
      startX + (x - startX) * easedTime,
      startY + (y - startY) * easedTime
    );

    if (time < 1) requestAnimationFrame(scroll);
  }

  scroll();
}
