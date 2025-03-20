import { WbFooter, WbHeaderBottom, WbHeaderTop, WbMenu } from '@/components';
import { Menus } from '@/constants/testMenu';
import { Outlet } from 'react-router-dom';

const WbLayout = () => {
  return (
    <>
      <WbHeaderTop />
      <WbHeaderBottom />
      {Menus.map((menu) => (
        <WbMenu menu={menu} />
      ))}
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      <WbFooter />
    </>
  );
};
export default WbLayout;
