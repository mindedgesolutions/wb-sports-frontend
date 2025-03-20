import { WbFooter, WbHeaderBottom, WbHeaderTop, WbMenu } from '@/components';
import { Outlet } from 'react-router-dom';

const WbLayout = () => {
  return (
    <>
      <WbHeaderTop />
      <WbHeaderBottom />
      <WbMenu />
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      <WbFooter />
    </>
  );
};
export default WbLayout;
