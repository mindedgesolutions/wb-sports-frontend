import { WbFooter, WbHeaderBottom, WbHeaderTop, WbMenu } from '@/components';
import { Outlet } from 'react-router-dom';

const WbLayout = () => {
  return (
    <>
      <WbHeaderTop />
      <WbHeaderBottom />
      <div className="bg-sky-600 h-10">
        <div className="max-w-screen-xl mx-auto flex flex-row justify-center items-center">
          <WbMenu />
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
