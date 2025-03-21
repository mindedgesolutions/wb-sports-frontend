import { WbFooter, WbHeaderBottom, WbHeaderTop, WbMenu } from '@/components';
import { Outlet } from 'react-router-dom';
import { menus } from '@/constants/wbMenu';

const WbLayout = () => {
  return (
    <>
      <WbHeaderTop />
      <WbHeaderBottom />
      <div className="bg-sky-600 h-10">
        {/* <div className="max-w-screen-xl mx-auto flex flex-row justify-center items-center">
          {menus.map((menu: WebsiteMenuProps) => {
            return <WbMenu key={nanoid()} menu={menu} />;
          })}
        </div> */}
        <div className="max-w-screen-xl mx-auto flex flex-row justify-center items-center">
          <ul className="gap-x-1 lg:flex lg:items-center hidden">
            {menus.map((menu) => {
              return <WbMenu menu={menu} key={menu.name} />;
            })}
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      <WbFooter />
    </>
  );
};
export default WbLayout;
