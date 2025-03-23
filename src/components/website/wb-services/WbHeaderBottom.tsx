import { images } from '@/constants';

const WbHeaderBottom = () => {
  return (
    <div className="bg-sky-800 p-2">
      <div className="max-w-screen-xl mx-auto flex flex-row justify-between items-center">
        <div className="h-10 w-10 rounded-full bg-white/20 flex justify-center items-center">
          <img
            src={images.nationalEmblem}
            alt="Govt. of India"
            className="h-8"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-1.5">
          <span className="font-roboto uppercase text-white font-extralight tracking-widest text-2xl flex gap-4">
            <span>e</span>
            <span>g</span>
            <span>i</span>
            <span>y</span>
            <span>e</span>
            <span className="ml-8">b</span>
            <span>a</span>
            <span>n</span>
            <span>g</span>
            <span>l</span>
            <span>a</span>
          </span>
        </div>
        <div className="h-10 w-10 rounded-full bg-white flex justify-center items-center">
          <img src={images.biswaBangla} alt="Biswa Bangla" className="h-8" />
        </div>
      </div>
    </div>
  );
};
export default WbHeaderBottom;
