import { WbHomeTopBanner } from '@/components';

const WbHomePage = () => {
  document.title = `Welcome! ${import.meta.env.VITE_SERVICE_APP_NAME}`;

  return (
    <div>
      <WbHomeTopBanner />
      WbHomePage
    </div>
  );
};
export default WbHomePage;
