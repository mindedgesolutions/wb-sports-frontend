import serviceWebsiteMenus from '@/constants/wbMenu';
import WbDesktopMenu from './WbDesktopMenu';
import { WebsiteMenuProps } from '@/types/menu';

const WbMenu = () => {
  const menus = serviceWebsiteMenus() as WebsiteMenuProps[];
  return (
    <header className="hidden z-10 h-10 md:flex flex-row justify-center items-center">
      <nav className="px-3.5 flex items-center justify-between w-full mx-auto">
        {/* Desktop menu starts */}
        <ul className="flex flex-row justify-between items-center gap-1">
          {menus.map((menu) => (
            <WbDesktopMenu menu={menu} key={menu.name} />
          ))}
          {/* Desktop menu ends */}
        </ul>
      </nav>
    </header>
  );
};
export default WbMenu;
