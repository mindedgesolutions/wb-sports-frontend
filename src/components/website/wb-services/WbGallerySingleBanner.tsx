import { images } from '@/constants';

const WbGallerySingleBanner = ({ title }: { title: string }) => {
  return (
    <div className="flex-1 relative">
      <img
        src={images.defaultBanner}
        alt={title}
        className="h-[200px] md:h-auto md:max-h-[200px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white">
        <p className="font-roboto text-white text-2xl md:text-4xl tracking-widest font-medium mb-4 text-center">
          {title}
        </p>
        <p className="text-base md:text-lg text-white/70 font-light tracking-widest mt-1 text-center">
          Photo Gallery
        </p>
      </div>
    </div>
  );
};
export default WbGallerySingleBanner;
