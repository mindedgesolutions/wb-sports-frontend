import { Separator } from '@/components/ui/separator';
import { titles } from '@/constants';
import { menus } from '@/constants/wbMenu';
import { WebsiteSubMenuProps } from '@/types/menu';
import { Link, useLocation } from 'react-router-dom';

const WbPageSidebar = ({ parentMenu }: { parentMenu: string }) => {
  const { pathname } = useLocation();
  const titleSubMenus = menus.filter((menu) => menu.name === parentMenu)[0]
    .subMenus as WebsiteSubMenuProps[];

  return (
    <div className="col-span-3 w-80 p-3 bg-sky/5">
      <h1 className="text-sky-foreground capitalize tracking-wider text-lg font-medium">
        {parentMenu}
      </h1>
      <Separator className="my-4 bg-sky/20" />
      <ul>
        {titleSubMenus.map((subMenu) => (
          <li key={subMenu.name} className="my-2">
            <Link
              to={`${titles.websiteBaseUrl}${subMenu.link}`}
              className={`text-sm tracking-wider text-sky-foreground hover:text-sky-foreground/80 duration-200 ${
                pathname === subMenu.link ? 'font-semibold' : ''
              }`}
            >
              {subMenu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WbPageSidebar;
