import { images, titles } from '@/constants';

const WbHeaderBottom = () => {
  return (
    <div className="bg-sky-800 p-2">
      {/* For mobile view */}
      <div className="flex flex-row justify-between items-center md:hidden">
        <div className="h-10 w-10 rounded-full bg-white/20 flex justify-center items-center">
          <img
            src={images.nationalEmblem}
            alt="Govt. of India"
            className="h-8"
          />
        </div>
        <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center">
          <img src={images.biswaBangla} alt="Biswa Bangla" className="h-8" />
        </div>
      </div>

      {/* For desktop view */}
      <div className="md:max-w-screen-xl md:mx-auto flex flex-row justify-center md:justify-between items-center">
        <div className="h-20 w-20 rounded-full bg-white/20 hidden md:flex justify-center items-center">
          <img
            src={images.nationalEmblem}
            alt="Govt. of India"
            className="h-8 md:h-16"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-0 md:gap-1.5">
          <span className="font-roboto uppercase text-white font-extralight tracking-widest text-base flex gap-1.5 md:gap-4">
            <span>e</span>
            <span>g</span>
            <span>i</span>
            <span>y</span>
            <span>e</span>
            <span className="ml-3 md:ml-8">b</span>
            <span>a</span>
            <span>n</span>
            <span>g</span>
            <span>l</span>
            <span>a</span>
          </span>
          <div className="flex flex-col justify-center items-center text-white px-2 md:px-0">
            <p className="font-oswald text-white text-base md:text-xl font-light tracking-widest mb-1 text-center">
              {titles.services}
            </p>
            <p className="text-xs text-white/70 font-light tracking-widest mt-1">
              The official portal of the Government of West Bengal
            </p>
          </div>
        </div>
        <div className="h-20 w-20 rounded-full bg-white hidden md:flex justify-center items-center">
          <img src={images.biswaBangla} alt="Biswa Bangla" className="h-16" />
        </div>
      </div>
    </div>
  );
};
export default WbHeaderBottom;
