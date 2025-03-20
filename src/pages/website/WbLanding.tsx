import { images } from '@/constants';
import { Link } from 'react-router-dom';

const WbLanding = () => {
  document.title = `${import.meta.env.VITE_APP_NAME} | Home`;

  return (
    <div className="bg-black">
      {/* Header starts */}
      <div className="bg-gray-800 p-4"></div>
      {/* Header ends */}
      <div className="max-w-screen-xl h-screen mx-auto flex justify-center items-center px-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold uppercase mt-4 font-oswald">
            Welcome to Department of youth services and sports
          </h1>
          <div className="mt-8 flex flex-col justify-center items-center">
            <h3 className="font-roboto text-xl text-sky-400 uppercase">
              Vision
            </h3>
            <p className="font-roboto text-lg text-white text-justify [text-align-last:center] mt-1">
              To create scope and opportunities for the overall benefit of the
              youth in order to lead them to the right path enabling them to
              serve the nation and to promote and inculcate sports culture among
              the youth of the state through competitive spirit, camaraderie and
              sportsmanship.
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center items-center">
            <h3 className="font-roboto text-xl text-sky-400 uppercase">
              Mission
            </h3>
            <p className="font-roboto text-lg text-white text-justify [text-align-last:center] mt-1">
              To build strong moral character and make them employable through
              various cultural and physical activities which help them to build
              scientific temper and attitude to contribute positively for
              eradicating blind faith and superstitions prevailing in our
              society and to provide the facilities interms of sports
              infrastructures and sports academies and scouting of talents :
              their early identification , nurturing within the ambit of
              international sports standard and incentivizing sports persons for
              promoting sports as a stand-alone profession.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <Link to={`/${import.meta.env.VITE_SERVICES}/home`}>
              <div className="p-2 bg-white rounded-md flex flex-col justify-center items-center">
                <img
                  src={images.youth}
                  alt="youth"
                  className="max-h-60 rounded-md"
                />
                <h1 className="text-lg uppercase font-roboto mt-2 font-semibold tracking-wide text-gray-800">
                  Youth services
                </h1>
              </div>
            </Link>

            <Link to={`/${import.meta.env.VITE_SPORTS}/home`}>
              <div className="p-2 bg-white rounded-md flex flex-col justify-center items-center">
                <img
                  src={images.sports}
                  alt="sportsyouth"
                  className="max-h-60 rounded-md"
                />
                <h1 className="text-lg uppercase font-roboto mt-2 font-semibold tracking-wide text-gray-800">
                  Sports
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer starts */}
      <div className="mx-auto flex justify-between items-center mt-8 p-4 px-10">
        <span className="text-white font-roboto text-base tracking-wide">
          {new Date().getFullYear()} &copy; West Bengal Department of Sports
        </span>
        <span className="flex flex-row justify-end items-center">
          <h1 className="text-white mr-4 font-roboto tracking-wide mt-1.5">
            Design & Developed by
          </h1>
          <img src={images.nicLogo} alt="wbLogo" className="max-h-8" />
        </span>
      </div>
      {/* Footer ends */}
    </div>
  );
};
export default WbLanding;
