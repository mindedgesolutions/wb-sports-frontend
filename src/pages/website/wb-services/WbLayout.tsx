import { WbFooter, WbHeaderBottom, WbHeaderTop } from '@/components';
import { Outlet } from 'react-router-dom';

const WbLayout = () => {
  return (
    <>
      <WbHeaderTop />
      <WbHeaderBottom />
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
      <WbFooter />
    </>
  );
};
export default WbLayout;
