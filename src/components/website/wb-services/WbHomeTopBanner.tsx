import { images, titles } from '@/constants';
import { useWebsiteContext } from '@/pages/website/wb-services/WbLayout';

const WbHomeTopBanner = () => {
  const { image_path } = useWebsiteContext();

  return (
    <div className="flex-1 relative">
      <img
        src={image_path ? titles.baseUrl + image_path : images.defaultBanner}
        alt={titles.services}
        className="h-[250px] md:h-[400px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white">
        <p className="font-roboto text-white text-xl md:text-4xl tracking-widest font-medium mb-4 text-center">
          {titles.services}
        </p>
        <p className="text-xs md:text-lg text-white/70 font-light tracking-widest mt-1">
          The official portal of the Government of West Bengal
        </p>
      </div>
    </div>
  );
};
export default WbHomeTopBanner;
