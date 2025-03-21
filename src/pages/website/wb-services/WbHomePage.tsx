import { WbHomeTopSlider } from '@/components';

const WbHomePage = () => {
  document.title = `Welcome! ${import.meta.env.VITE_SERVICE_APP_NAME}`;

  return (
    <div>
      <WbHomeTopSlider />
      WbHomePage
    </div>
  );
};
export default WbHomePage;
