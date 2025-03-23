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
