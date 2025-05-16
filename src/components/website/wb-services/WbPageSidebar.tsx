import { Separator } from '@/components/ui/separator';
import { titles } from '@/constants';
import serviceWebsiteMenus from '@/constants/wbMenu';
import { WebsiteMenuProps, WebsiteSubMenuProps } from '@/types/menu';
import { Building, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const WbPageSidebar = ({ parentMenu }: { parentMenu: string }) => {
  const menus = serviceWebsiteMenus() as WebsiteMenuProps[];
  const { pathname } = useLocation();
  const titleSubMenus = menus.filter((menu) => menu.name === parentMenu)[0]
    .subMenus as WebsiteSubMenuProps[];

  return (
    <div className="col-span-1 md:col-span-3 w-full md:w-80 p-3 bg-sky/5">
      <h1 className="text-sky-foreground capitalize tracking-wider text-lg font-medium">
        {parentMenu}
      </h1>
      <Separator className="my-4 bg-sky/20" />
      <ul>
        {titleSubMenus &&
          titleSubMenus.map((subMenu) => (
            <li key={subMenu.name} className="my-2">
              <Link
                to={`${titles.websiteBaseUrl}${subMenu.link}`}
                className={`text-sm tracking-wider text-sky-foreground hover:text-sky-foreground/80 duration-200 ${
                  pathname === subMenu.link ? 'font-semibold' : ''
                }`}
              >
                {subMenu.icon && (
                  <subMenu.icon className="inline-block size-4 mr-3" />
                )}
                {subMenu.name}
              </Link>
            </li>
          ))}
        {pathname === '/wbyouthservices/hon-mic' && (
          <li>
            <Link
              to={`#`}
              className={`text-sm tracking-wider text-sky-foreground hover:text-sky-foreground/80 duration-200`}
            >
              Budget Speech
            </Link>
          </li>
        )}
        {pathname === '/wbyouthservices/computer-training' && (
          <li>
            <Link
              to={`#`}
              className={`text-sm tracking-wider text-sky-foreground hover:text-sky-foreground/80 duration-200`}
            >
              <Building className="inline-block size-4 mr-3" />
              District-wise Computer Training Centres
            </Link>
          </li>
        )}
        {pathname === '/wbyouthservices/news-events' && (
          <li>
            <Link
              to={`/wbyouthservices/news-events/forms`}
              className={`text-sm tracking-wider text-sky-foreground hover:text-sky-foreground/80 duration-200`}
            >
              <Info className="inline-block size-4 mr-3" />
              Forms
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default WbPageSidebar;
